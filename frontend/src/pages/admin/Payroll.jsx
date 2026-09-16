import {useEffect, useState} from "react";
import axios from "axios";
import {
  Wallet,
  Users,
  IndianRupee,
  Pencil,
  X,
  Check,
  Download,
} from "lucide-react";
import jsPDF from "jspdf";

function Payroll() {
  const [payroll, setPayroll] = useState([]);

  const currentDate = new Date();

  const [month, setMonth] = useState(currentDate.getMonth() + 1);

  const [year, setYear] = useState(currentDate.getFullYear());

  const [selectedMonth, setSelectedMonth] = useState(
    currentDate.getMonth() + 1,
  );

  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Edit salary states
  const [editingId, setEditingId] = useState(null);
  const [salaryInput, setSalaryInput] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchPayroll(selectedMonth, selectedYear);
  }, [selectedMonth, selectedYear]);

  const fetchPayroll = async (
    selectedMonthValue = selectedMonth,
    selectedYearValue = selectedYear,
  ) => {
    try {
      setLoading(true);
      setError("");

      const token = sessionStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/payroll`,
        {
          params: {
            month: selectedMonthValue,
            year: selectedYearValue,
            _t: Date.now(),
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = response.data;

      setPayroll(data.payroll || []);
      setMonth(data.month);
      setYear(data.year);
      setTotalEmployees(data.totalEmployees || 0);
    } catch (error) {
      console.error("Payroll error:", error);

      setError(error.response?.data?.message || "Failed to load payroll");
    } finally {
      setLoading(false);
    }
  };

  // Start editing
  const handleEditSalary = (item) => {
    setEditingId(item.employee.id);
    setSalaryInput(item.monthlySalary || "");
    setError("");
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingId(null);
    setSalaryInput("");
  };

  // Save salary
  const handleSaveSalary = async (employeeId) => {
    if (salaryInput === "" || salaryInput === null || Number(salaryInput) < 0) {
      setError("Please enter a valid salary.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      // const token = localStorage.getItem("token");
      const token = sessionStorage.getItem("token");

      await axios.put(
        `${import.meta.env.VITE_API_URL}/employees/${employeeId}/salary`,
        {
          salary: Number(salaryInput),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // Refresh payroll data after salary update
      await fetchPayroll();

      setEditingId(null);
      setSalaryInput("");
    } catch (error) {
      console.error("Update salary error:", error);

      setError(error.response?.data?.message || "Failed to update salary");
    } finally {
      setSaving(false);
    }
  };

  const monthName = month
    ? new Date(year, month - 1).toLocaleString("default", {
        month: "long",
      })
    : "";

  const totalSalary = payroll.reduce(
    (total, item) => total + (item.calculatedSalary || 0),
    0,
  );

  const generateSalarySlip = (item) => {
    const doc = new jsPDF();

    const employee = item.employee;

    const salary = item.monthlySalary || 0;
    const workedSalary = item.workedSalary || 0;
    const paidLeaveDays = item.paidLeaveDays || 0;
    const unpaidLeaveDays = item.unpaidLeaveDays || 0;
    const paidLeaveSalary = item.paidLeaveSalary || 0;
    const unpaidLeaveDeduction = item.unpaidLeaveDeduction || 0;
    const finalSalary = item.calculatedSalary || 0;

    // Header
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("SALARY SLIP", 105, 25, {
      align: "center",
    });

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`${monthName} ${year}`, 105, 33, {
      align: "center",
    });

    // Line
    doc.line(20, 40, 190, 40);

    // Employee Details
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Employee Details", 20, 52);

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");

    doc.text(`Employee Name: ${employee.name || "-"}`, 20, 62);
    doc.text(`Employee ID: ${employee.employeeId || "-"}`, 20, 70);
    doc.text(`Department: ${employee.department || "-"}`, 20, 78);
    doc.text(`Designation: ${employee.designation || "-"}`, 20, 86);

    // Salary Details
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Salary Details", 20, 102);

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");

    doc.text(`Monthly Salary: Rs. ${salary.toLocaleString("en-IN")}`, 20, 112);

    doc.text(
      `Per Day Salary: Rs. ${(salary / (item.attendance?.totalDaysInMonth || 30)).toFixed(2)}`,
      20,
      120,
    );

    doc.text(
      `Hourly Rate: Rs. ${(item.hourlyRate || 0).toLocaleString("en-IN")}`,
      20,
      128,
    );

    // Attendance
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Attendance", 20, 144);

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");

    doc.text(`Present Days: ${item.attendance?.presentDays || 0}`, 20, 154);

    doc.text(`Half Days: ${item.attendance?.halfDays || 0}`, 20, 162);

    doc.text(`Absent Days: ${item.attendance?.absentDays || 0}`, 20, 170);

    doc.text(`Paid Leave: ${paidLeaveDays} day(s)`, 20, 178);

    doc.text(`Unpaid Leave: ${unpaidLeaveDays} day(s)`, 20, 186);

    doc.text(
      `Total Working Hours: ${item.totalWorkingHours || 0} hours`,
      20,
      194,
    );

    // Salary Calculation
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Salary Calculation", 20, 210);

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");

    doc.text(
      `Worked Salary: Rs. ${workedSalary.toLocaleString("en-IN")}`,
      20,
      220,
    );

    doc.text(
      `Paid Leave Salary: Rs. ${paidLeaveSalary.toLocaleString("en-IN")}`,
      20,
      228,
    );

    doc.text(
      `Unpaid Leave Deduction: Rs. ${unpaidLeaveDeduction.toLocaleString("en-IN")}`,
      20,
      236,
    );

    // Final Salary Box
    doc.line(20, 245, 190, 245);

    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");

    doc.text(`NET SALARY: Rs. ${finalSalary.toLocaleString("en-IN")}`, 20, 258);

    doc.line(20, 265, 190, 265);

    // Footer
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");

    doc.text("This is a system-generated salary slip.", 105, 280, {
      align: "center",
    });

    // Download
    const safeName = (employee.name || "employee")
      .replace(/\s+/g, "_")
      .replace(/[^a-zA-Z0-9_-]/g, "");

    doc.save(`Salary_Slip_${safeName}_${monthName}_${year}.pdf`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Salary & Payroll
        </h1>

        <p className="text-gray-500 mt-1">
          View and manage employee salary information
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
        {/* Total Employees */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Employees</p>

              <h2 className="text-2xl font-bold text-gray-800 mt-1">
                {totalEmployees}
              </h2>
            </div>

            <div className="p-3 bg-blue-50 rounded-lg">
              <Users className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        {/* Total Payable Salary */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Payable Salary</p>

              <h2 className="text-2xl font-bold text-gray-800 mt-1">
                ₹{totalSalary.toLocaleString("en-IN")}
              </h2>
            </div>

            <div className="p-3 bg-green-50 rounded-lg">
              <IndianRupee className="text-green-600" size={24} />
            </div>
          </div>
        </div>

        {/* Payroll Month */}
        {/* Payroll Month Selector */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-500">Payroll Month</p>

              <p className="text-sm text-gray-400 mt-1">
                Select month and year
              </p>
            </div>

            <div className="p-3 bg-purple-50 rounded-lg">
              <Wallet className="text-purple-600" size={24} />
            </div>
          </div>

          <div className="flex gap-3">
            {/* Month */}
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(Number(e.target.value))}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 outline-none focus:ring-2 focus:ring-purple-200"
            >
              <option value={1}>January</option>
              <option value={2}>February</option>
              <option value={3}>March</option>
              <option value={4}>April</option>
              <option value={5}>May</option>
              <option value={6}>June</option>
              <option value={7}>July</option>
              <option value={8}>August</option>
              <option value={9}>September</option>
              <option value={10}>October</option>
              <option value={11}>November</option>
              <option value={12}>December</option>
            </select>

            {/* Year */}
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 outline-none focus:ring-2 focus:ring-purple-200"
            >
              {Array.from(
                {length: 21},
                (_, index) => new Date().getFullYear() - 10 + index,
              ).map((yearOption) => (
                <option key={yearOption} value={yearOption}>
                  {yearOption}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Payroll Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">
            Employee Payroll
          </h2>
        </div>

        {loading ? (
          <div className="p-10 text-center text-gray-500">
            Loading payroll...
          </div>
        ) : payroll.length === 0 ? (
          <div className="p-10 text-center text-gray-500">
            No payroll records found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1900px] table-fixed">
              <thead className="bg-gray-50">
                <tr>
                  <th className="w-[180px] px-5 py-4 text-left text-sm font-semibold text-gray-600">
                    Employee
                  </th>

                  <th className="w-[150px] px-5 py-4 text-left text-sm font-semibold text-gray-600">
                    Department
                  </th>

                  <th className="w-[150px] px-5 py-4 text-left text-sm font-semibold text-gray-600">
                    Designation
                  </th>

                  <th className="w-[150px] px-5 py-4 text-right text-sm font-semibold text-gray-600">
                    Monthly Salary
                  </th>

                  <th className="w-[100px] px-5 py-4 text-center text-sm font-semibold text-gray-600">
                    Present
                  </th>

                  <th className="w-[110px] px-5 py-4 text-center text-sm font-semibold text-gray-600">
                    Half Days
                  </th>

                  <th className="w-[100px] px-5 py-4 text-center text-sm font-semibold text-gray-600">
                    Absent
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Paid Leave
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Unpaid Leave
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Deduction
                  </th>
                  <th className="w-[130px] px-5 py-4 text-center text-sm font-semibold text-gray-600">
                    Payable Days
                  </th>

                  <th className="w-[130px] px-5 py-4 text-center text-sm font-semibold text-gray-600">
                    Total Hours
                  </th>

                  <th className="w-[130px] px-5 py-4 text-right text-sm font-semibold text-gray-600">
                    Hourly Rate
                  </th>

                  <th className="w-[150px] px-5 py-4 text-right text-sm font-semibold text-gray-600">
                    Final Salary
                  </th>

                  <th className="w-[120px] px-5 py-4 text-center text-sm font-semibold text-gray-600">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {payroll.map((item) => {
                  const isEditing = editingId === item.employee.id;

                  return (
                    <tr
                      key={item.employee.id}
                      className="hover:bg-gray-50 transition"
                    >
                      {/* Employee */}
                      <td className="px-5 py-4">
                        <div>
                          <p className="font-semibold text-gray-800">
                            {item.employee.name}
                          </p>

                          <p className="text-sm text-gray-500">
                            {item.employee.employeeId}
                          </p>
                        </div>
                      </td>

                      {/* Department */}
                      <td className="px-5 py-4 text-gray-600">
                        {item.employee.department || "-"}
                      </td>

                      {/* Designation */}
                      <td className="px-5 py-4 text-gray-600">
                        {item.employee.designation || "-"}
                      </td>

                      {/* Monthly Salary */}
                      <td className="px-5 py-4 text-right">
                        {isEditing ? (
                          <input
                            type="number"
                            min="0"
                            value={salaryInput}
                            onChange={(e) => setSalaryInput(e.target.value)}
                            className="w-32 px-3 py-2 border border-blue-400 rounded-lg text-right outline-none focus:ring-2 focus:ring-blue-200"
                            autoFocus
                          />
                        ) : (
                          <span className="font-medium text-gray-800">
                            ₹{item.monthlySalary?.toLocaleString("en-IN")}
                          </span>
                        )}
                      </td>

                      {/* Present */}
                      <td className="px-5 py-4 text-center text-green-600 font-medium">
                        {item.attendance.presentDays}
                      </td>

                      {/* Half Days */}
                      <td className="px-5 py-4 text-center text-yellow-600 font-medium">
                        {item.attendance.halfDays}
                      </td>

                      {/* Absent */}
                      <td className="px-5 py-4 text-center text-red-600 font-medium">
                        {item.attendance.absentDays}
                      </td>

                      <td className="px-6 py-4 text-sm text-green-600 font-semibold">
                        {item.paidLeaveDays || 0}
                      </td>

                      <td className="px-6 py-4 text-sm text-red-600 font-semibold">
                        {item.unpaidLeaveDays || 0}
                      </td>

                      <td className="px-6 py-4 text-sm text-red-600 font-semibold">
                        ₹
                        {(item.unpaidLeaveDeduction || 0).toLocaleString(
                          "en-IN",
                        )}
                      </td>
                      {/* Payable Days */}
                      <td className="px-5 py-4 text-center font-semibold text-gray-700">
                        {item.payableDays}
                      </td>

                      {/* Total Working Hours */}
                      <td className="px-5 py-4 text-center font-medium text-gray-700">
                        {item.totalWorkingHours ?? 0}h
                      </td>

                      {/* Hourly Rate */}
                      <td className="px-5 py-4 text-right font-medium text-gray-700">
                        ₹{item.hourlyRate?.toLocaleString("en-IN")}
                      </td>

                      {/* Final Salary */}
                      <td className="px-5 py-4 text-right font-bold text-blue-600">
                        ₹{item.calculatedSalary?.toLocaleString("en-IN")}
                      </td>

                      {/* Action */}
                      <td className="px-5 py-4">
                        {isEditing ? (
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleSaveSalary(item.employee.id)}
                              disabled={saving}
                              className="flex items-center gap-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition"
                            >
                              <Check size={16} />

                              {saving ? "Saving..." : "Save"}
                            </button>

                            <button
                              onClick={handleCancelEdit}
                              disabled={saving}
                              className="flex items-center gap-1 px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 transition"
                            >
                              <X size={16} />
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleEditSalary(item)}
                              className="flex items-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                            >
                              <Pencil size={16} />
                              Edit
                            </button>

                            <button
                              onClick={() => generateSalarySlip(item)}
                              className="flex items-center gap-1 px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                            >
                              <Download size={16} />
                              Slip
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Payroll;
