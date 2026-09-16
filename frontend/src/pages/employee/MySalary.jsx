import {useEffect, useState} from "react";
import {
  Wallet,
  CalendarDays,
  CheckCircle,
  Download,
} from "lucide-react";
import jsPDF from "jspdf";
function MySalary() {
  const [payroll, setPayroll] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyPayroll();
  }, []);

  const generateSalarySlip = () => {
  if (!payroll) return;

  const doc = new jsPDF();

  const employee = payroll.employee || {};
  const salary = payroll.salary || {};

  const month = payroll.month;
  const year = payroll.year;

  const monthName = month
    ? new Date(year, month - 1).toLocaleString("default", {
        month: "long",
      })
    : "";

  const monthlySalary = salary.monthlySalary || 0;
  const workedSalary = salary.workedSalary || 0;
  const paidLeaveDays = salary.paidLeaveDays || 0;
  const unpaidLeaveDays = salary.unpaidLeaveDays || 0;
  const paidLeaveSalary = salary.paidLeaveSalary || 0;
  const unpaidLeaveDeduction = salary.unpaidLeaveDeduction || 0;
  const finalSalary = salary.calculatedSalary || 0;

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

  doc.text(
    `Monthly Salary: Rs. ${monthlySalary.toLocaleString("en-IN")}`,
    20,
    112
  );

  doc.text(
    `Per Day Salary: Rs. ${(salary.perDaySalary || 0).toFixed(2)}`,
    20,
    120
  );

  doc.text(
    `Hourly Rate: Rs. ${(salary.hourlyRate || 0).toFixed(2)}`,
    20,
    128
  );

  // Attendance
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");

  doc.text("Attendance", 20, 144);

  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");

  doc.text(
    `Present Days: ${payroll.attendance?.presentDays || 0}`,
    20,
    154
  );

  doc.text(
    `Half Days: ${payroll.attendance?.halfDays || 0}`,
    20,
    162
  );

  doc.text(
    `Absent Days: ${payroll.attendance?.absentDays || 0}`,
    20,
    170
  );

  doc.text(
    `Paid Leave: ${paidLeaveDays} day(s)`,
    20,
    178
  );

  doc.text(
    `Unpaid Leave: ${unpaidLeaveDays} day(s)`,
    20,
    186
  );

  doc.text(
    `Total Working Hours: ${salary.totalWorkingHours || 0} hours`,
    20,
    194
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
    220
  );

  doc.text(
    `Paid Leave Salary: Rs. ${paidLeaveSalary.toLocaleString("en-IN")}`,
    20,
    228
  );

  doc.text(
    `Unpaid Leave Deduction: Rs. ${unpaidLeaveDeduction.toLocaleString(
      "en-IN"
    )}`,
    20,
    236
  );

  // Net Salary
  doc.line(20, 245, 190, 245);

  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");

  doc.text(
    `NET SALARY: Rs. ${finalSalary.toLocaleString("en-IN")}`,
    20,
    258
  );

  doc.line(20, 265, 190, 265);

  // Footer
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");

  doc.text(
    "This is a system-generated salary slip.",
    105,
    280,
    {
      align: "center",
    }
  );

  const safeName = (employee.name || "employee")
    .replace(/\s+/g, "_")
    .replace(/[^a-zA-Z0-9_-]/g, "");

  doc.save(
    `Salary_Slip_${safeName}_${monthName}_${year}.pdf`
  );
};


//   const fetchMyPayroll = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       const url = `${import.meta.env.VITE_API_URL}/payroll/me`;

//       console.log("PAYROLL URL:", url);
//       console.log("HAS TOKEN:", !!token);

//       const response = await fetch(url, {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });

//       console.log("STATUS:", response.status);
//       console.log("CONTENT TYPE:", response.headers.get("content-type"));

//       const text = await response.text();

//       console.log("RAW RESPONSE:", text);

//       if (!response.ok) {
//         throw new Error(text || "Failed to fetch salary");
//       }

//       const data = JSON.parse(text);

//       console.log("PAYROLL DATA:", data);

//       setPayroll(data.payroll);
//     } catch (error) {
//       console.error("Fetch payroll error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

const fetchMyPayroll = async () => {
  try {
    // const token = localStorage.getItem("token");
    const token = sessionStorage.getItem("token");

    // const url = "http://localhost:5000/api/payroll/me";
const url = `${import.meta.env.VITE_API_URL}/payroll/me`;

    console.log("========== PAYROLL DEBUG ==========");
    console.log("URL:", url);
    console.log("TOKEN EXISTS:", !!token);
    console.log("TOKEN:", token);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("STATUS:", response.status);
    console.log("FINAL URL:", response.url);

    const text = await response.text();

    console.log("RESPONSE:", text);

    if (!response.ok) {
      throw new Error(text || "Failed to fetch salary");
    }

    const data = JSON.parse(text);

    console.log("PAYROLL DATA:", data);

    setPayroll(data.payroll);
  } catch (error) {
    console.error("Fetch payroll error:", error);
  } finally {
    setLoading(false);
  }
};

  if (loading) {
    return (
      <div className="min-h-screen bg-blue-100 p-6 flex items-center justify-center">
        <p className="text-gray-600">Loading salary...</p>
      </div>
    );
  }

  if (!payroll) {
    return (
      <div className="min-h-screen bg-blue-100 p-6">
        <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 text-center">
          <Wallet className="mx-auto text-gray-400" size={40} />

          <h2 className="text-xl font-semibold text-gray-700 mt-4">
            Salary information not available
          </h2>
        </div>
      </div>
    );
  }

  const monthlySalary = payroll.salary?.monthlySalary || 0;
  const netSalary = payroll.salary?.calculatedSalary || 0;

  const presentDays = payroll.attendance?.presentDays || 0;
  const halfDays = payroll.attendance?.halfDays || 0;
  const absentDays = payroll.attendance?.absentDays || 0;
  const leaveDays = payroll.attendance?.leaveDays || 0;

  const workingDays = payroll.attendance?.totalDaysInMonth || 0;

  return (
    <div className="min-h-screen bg-blue-100 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">My Salary</h1>

          <p className="text-gray-500 mt-1">
            View your salary and attendance-based payroll.
          </p>
        </div>

        {/* Employee Info */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800">
            {payroll.employee?.name}
          </h2>

          <p className="text-gray-500 mt-1">
            Employee ID: {payroll.employee?.employeeId}
          </p>

          <p className="text-gray-500">{payroll.employee?.designation}</p>
        </div>

 {/* Salary Card */}
<div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

    {/* Net Salary */}
    <div className="flex items-center gap-4">
      <div className="w-14 h-14 rounded-xl bg-green-50 flex items-center justify-center">
        <Wallet size={28} className="text-green-600" />
      </div>

      <div>
        <p className="text-sm text-gray-500">Net Salary</p>

        <h2 className="text-3xl font-bold text-gray-800 mt-1">
          ₹{netSalary.toLocaleString("en-IN")}
        </h2>
      </div>
    </div>

    {/* Download Button */}
    <button
      onClick={generateSalarySlip}
      className="flex items-center justify-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium shadow-sm"
    >
      <Download size={18} />
      Download Salary Slip
    </button>

  </div>
</div>

        {/* Payroll Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Monthly Salary */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
            <div className="flex items-center gap-3">
              <Wallet size={22} className="text-blue-600" />

              <p className="text-sm text-gray-500">Monthly Salary</p>
            </div>

            <p className="text-2xl font-bold text-gray-800 mt-3">
              ₹{monthlySalary.toLocaleString("en-IN")}
            </p>
          </div>

          {/* Present Days */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
            <div className="flex items-center gap-3">
              <CheckCircle size={22} className="text-green-600" />

              <p className="text-sm text-gray-500">Present Days</p>
            </div>

            <p className="text-2xl font-bold text-gray-800 mt-3">
              {presentDays}
            </p>
          </div>

          {/* Total Days */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
            <div className="flex items-center gap-3">
              <CalendarDays size={22} className="text-purple-600" />

              <p className="text-sm text-gray-500">Total Days</p>
            </div>

            <p className="text-2xl font-bold text-gray-800 mt-3">
              {workingDays}
            </p>
          </div>
        </div>

        {/* Attendance Summary */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mt-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-5">
            Attendance Summary
          </h2>

          <div className="space-y-4">
            <div className="flex justify-between border-b pb-3">
              <span className="text-gray-500">Present Days</span>

              <span className="font-semibold text-green-600">
                {presentDays}
              </span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span className="text-gray-500">Half Days</span>

              <span className="font-semibold">{halfDays}</span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span className="text-gray-500">Absent Days</span>

              <span className="font-semibold text-red-600">{absentDays}</span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span className="text-gray-500">Leave Days</span>

              <span className="font-semibold">{leaveDays}</span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span className="text-gray-500">Payable Days</span>

              <span className="font-semibold">
                {payroll.salary?.payableDays || 0}
              </span>
            </div>
          </div>
        </div>

        {/* Salary Calculation */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mt-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-5">
            Salary Calculation
          </h2>

          <div className="space-y-4">
            <div className="flex justify-between border-b pb-3">
              <span className="text-gray-500">Monthly Salary</span>

              <span className="font-semibold">
                ₹{monthlySalary.toLocaleString("en-IN")}
              </span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span className="text-gray-500">Per Day Salary</span>

              <span className="font-semibold">
                ₹{(payroll.salary?.perDaySalary || 0).toLocaleString("en-IN")}
              </span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span className="text-gray-500">Payable Days</span>

              <span className="font-semibold">
                {payroll.salary?.payableDays || 0}
              </span>
            </div>

            <div className="flex justify-between pt-2">
              <span className="font-semibold text-gray-700">Final Salary</span>

              <span className="text-xl font-bold text-green-600">
                ₹{netSalary.toLocaleString("en-IN")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MySalary;
