import {useEffect, useState} from "react";
import axios from "axios";
import {
  Wallet,
  Users,
  IndianRupee,
  Pencil,
  X,
  Check,
} from "lucide-react";

function Payroll() {
  const [payroll, setPayroll] = useState([]);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Edit salary states
  const [editingId, setEditingId] = useState(null);
  const [salaryInput, setSalaryInput] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchPayroll();
  }, []);

  const fetchPayroll = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/payroll`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data;

      setPayroll(data.payroll || []);
      setMonth(data.month);
      setYear(data.year);
      setTotalEmployees(data.totalEmployees || 0);
    } catch (error) {
      console.error("Payroll error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to load payroll"
      );
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
    if (
      salaryInput === "" ||
      salaryInput === null ||
      Number(salaryInput) < 0
    ) {
      setError("Please enter a valid salary.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const token = localStorage.getItem("token");

      await axios.put(
        `${import.meta.env.VITE_API_URL}/employees/${employeeId}/salary`,
        {
          salary: Number(salaryInput),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Refresh payroll data after salary update
      await fetchPayroll();

      setEditingId(null);
      setSalaryInput("");
    } catch (error) {
      console.error("Update salary error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to update salary"
      );
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
    (total, item) =>
      total + (item.calculatedSalary || 0),
    0
  );

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
              <p className="text-sm text-gray-500">
                Total Employees
              </p>

              <h2 className="text-2xl font-bold text-gray-800 mt-1">
                {totalEmployees}
              </h2>
            </div>

            <div className="p-3 bg-blue-50 rounded-lg">
              <Users
                className="text-blue-600"
                size={24}
              />
            </div>
          </div>
        </div>

        {/* Total Payable Salary */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Total Payable Salary
              </p>

              <h2 className="text-2xl font-bold text-gray-800 mt-1">
                ₹{totalSalary.toLocaleString("en-IN")}
              </h2>
            </div>

            <div className="p-3 bg-green-50 rounded-lg">
              <IndianRupee
                className="text-green-600"
                size={24}
              />
            </div>
          </div>
        </div>

        {/* Payroll Month */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Payroll Month
              </p>

              <h2 className="text-2xl font-bold text-gray-800 mt-1">
                {monthName} {year}
              </h2>
            </div>

            <div className="p-3 bg-purple-50 rounded-lg">
              <Wallet
                className="text-purple-600"
                size={24}
              />
            </div>
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

            <table className="w-full min-w-[1100px]">

              <thead className="bg-gray-50">
                <tr>

                  <th className="px-5 py-4 text-left text-sm font-semibold text-gray-600">
                    Employee
                  </th>

                  <th className="px-5 py-4 text-left text-sm font-semibold text-gray-600">
                    Department
                  </th>

                  <th className="px-5 py-4 text-left text-sm font-semibold text-gray-600">
                    Designation
                  </th>

                  <th className="px-5 py-4 text-right text-sm font-semibold text-gray-600">
                    Monthly Salary
                  </th>

                  <th className="px-5 py-4 text-center text-sm font-semibold text-gray-600">
                    Present
                  </th>

                  <th className="px-5 py-4 text-center text-sm font-semibold text-gray-600">
                    Half Days
                  </th>

                  <th className="px-5 py-4 text-center text-sm font-semibold text-gray-600">
                    Absent
                  </th>

                  <th className="px-5 py-4 text-center text-sm font-semibold text-gray-600">
                    Payable Days
                  </th>

                  <th className="px-5 py-4 text-right text-sm font-semibold text-gray-600">
                    Final Salary
                  </th>

                  <th className="px-5 py-4 text-center text-sm font-semibold text-gray-600">
                    Action
                  </th>

                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">

                {payroll.map((item) => {

                  const isEditing =
                    editingId === item.employee.id;

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
                            onChange={(e) =>
                              setSalaryInput(
                                e.target.value
                              )
                            }
                            className="w-32 px-3 py-2 border border-blue-400 rounded-lg text-right outline-none focus:ring-2 focus:ring-blue-200"
                            autoFocus
                          />
                        ) : (
                          <span className="font-medium text-gray-800">
                            ₹
                            {item.monthlySalary?.toLocaleString(
                              "en-IN"
                            )}
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

                      {/* Payable Days */}
                      <td className="px-5 py-4 text-center font-semibold text-gray-700">
                        {item.payableDays}
                      </td>

                      {/* Final Salary */}
                      <td className="px-5 py-4 text-right font-bold text-blue-600">
                        ₹
                        {item.calculatedSalary?.toLocaleString(
                          "en-IN"
                        )}
                      </td>

                      {/* Action */}
                      <td className="px-5 py-4">

                        {isEditing ? (
                          <div className="flex items-center justify-center gap-2">

                            <button
                              onClick={() =>
                                handleSaveSalary(
                                  item.employee.id
                                )
                              }
                              disabled={saving}
                              className="flex items-center gap-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition"
                            >
                              <Check size={16} />

                              {saving
                                ? "Saving..."
                                : "Save"}
                            </button>

                            <button
                              onClick={
                                handleCancelEdit
                              }
                              disabled={saving}
                              className="flex items-center gap-1 px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 transition"
                            >
                              <X size={16} />

                              Cancel
                            </button>

                          </div>
                        ) : (
                          <button
                            onClick={() =>
                              handleEditSalary(item)
                            }
                            className="flex items-center gap-1 mx-auto px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                          >
                            <Pencil size={16} />

                            Edit
                          </button>
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