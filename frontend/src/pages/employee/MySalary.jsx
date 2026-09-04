import {useEffect, useState} from "react";
import {Wallet, CalendarDays, CheckCircle} from "lucide-react";

function MySalary() {
  const [payroll, setPayroll] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyPayroll();
  }, []);

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
