// import { CalendarDays } from "lucide-react";

// function MyAttendance() {
//   return (
//     <div className="p-6 min-h-screen bg-blue-100">

//       {/* Page Header */}
//       <div className="mb-6 ">
//         <h1 className="text-2xl font-bold text-gray-800">
//           My Attendance
//         </h1>

//         <p className="text-gray-500 mt-1">
//           View your attendance history and attendance percentage.
//         </p>
//       </div>

//       {/* Attendance Summary */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">

//         {/* Present Days */}
//         <div className="bg-white border border-gray-200 rounded-xl p-6">
//           <p className="text-sm text-gray-500">
//             Present Days
//           </p>

//           <p className="text-2xl font-bold text-green-600 mt-2">
//             —
//           </p>
//         </div>

//         {/* Absent Days */}
//         <div className="bg-white border border-gray-200 rounded-xl p-6">
//           <p className="text-sm text-gray-500">
//             Absent Days
//           </p>

//           <p className="text-2xl font-bold text-red-600 mt-2">
//             —
//           </p>
//         </div>

//         {/* Attendance Percentage */}
//         <div className="bg-white border border-gray-200 rounded-xl p-6">
//           <p className="text-sm text-gray-500">
//             Attendance Percentage
//           </p>

//           <p className="text-2xl font-bold text-blue-600 mt-2">
//             —
//           </p>
//         </div>

//       </div>

//       {/* Filters */}
//       <div className="bg-white border border-gray-200 rounded-xl p-5 mb-6">

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

//           {/* From Date */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               From Date
//             </label>

//             <div className="relative">

//               <CalendarDays
//                 size={18}
//                 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//               />

//               <input
//                 type="date"
//                 className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//               />

//             </div>
//           </div>

//           {/* To Date */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               To Date
//             </label>

//             <div className="relative">

//               <CalendarDays
//                 size={18}
//                 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//               />

//               <input
//                 type="date"
//                 className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//               />

//             </div>
//           </div>

//         </div>

//       </div>

//       {/* Attendance History */}
//       <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">

//         <div className="p-5 border-b border-gray-200">
//           <h2 className="text-lg font-semibold text-gray-800">
//             Attendance History
//           </h2>
//         </div>

//         <div className="overflow-x-auto">

//           <table className="w-full">

//             <thead className="bg-gray-50 border-b border-gray-200">

//               <tr>

//                 <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
//                   Date
//                 </th>

//                 <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
//                   Check In
//                 </th>

//                 <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
//                   Check Out
//                 </th>

//                 <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
//                   Working Hours
//                 </th>

//                 <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
//                   Status
//                 </th>

//               </tr>

//             </thead>

//             <tbody>

//               <tr>

//                 <td
//                   colSpan="5"
//                   className="px-6 py-16 text-center"
//                 >

//                   <p className="text-lg font-medium text-gray-400">
//                     No attendance records found
//                   </p>

//                   <p className="text-sm text-gray-400 mt-1">
//                     Your attendance records will appear here.
//                   </p>

//                 </td>

//               </tr>

//             </tbody>

//           </table>

//         </div>

//       </div>

//     </div>
//   );
// }

// export default MyAttendance;

import { useEffect, useState } from "react";
import { CalendarDays } from "lucide-react";

function MyAttendance() {
  const [attendance, setAttendance] = useState([]);
  const [filteredAttendance, setFilteredAttendance] = useState([]);

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [loading, setLoading] = useState(true);

  // Fetch employee attendance
  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      // const token = localStorage.getItem("token");
      const token = sessionStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/attendance/my`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch attendance"
        );
      }

      setAttendance(data.attendance || []);
      setFilteredAttendance(data.attendance || []);
    } catch (error) {
      console.error("Fetch attendance error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filter attendance by date
  useEffect(() => {
    let filtered = [...attendance];

    if (fromDate) {
      filtered = filtered.filter((item) => {
        const date = new Date(item.date).toLocaleDateString("en-CA");

        return date >= fromDate;
      });
    }

    if (toDate) {
      filtered = filtered.filter((item) => {
        const date = new Date(item.date).toLocaleDateString("en-CA");

        return date <= toDate;
      });
    }

    setFilteredAttendance(filtered);
  }, [fromDate, toDate, attendance]);

  // Calculate statistics
  const presentDays = filteredAttendance.filter(
    (item) => item.status === "present"
  ).length;

  const absentDays = filteredAttendance.filter(
    (item) => item.status === "absent"
  ).length;

  const totalDays = presentDays + absentDays;

  const attendancePercentage =
    totalDays > 0
      ? Math.round((presentDays / totalDays) * 100)
      : 0;

  // Calculate working hours
  const calculateWorkingHours = (checkIn, checkOut) => {
    if (!checkIn || !checkOut) {
      return "—";
    }

    const [inHour, inMinute] = checkIn.split(":").map(Number);
    const [outHour, outMinute] = checkOut.split(":").map(Number);

    const checkInMinutes = inHour * 60 + inMinute;
    const checkOutMinutes = outHour * 60 + outMinute;

    const difference = checkOutMinutes - checkInMinutes;

    if (difference < 0) {
      return "—";
    }

    const hours = Math.floor(difference / 60);
    const minutes = difference % 60;

    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="p-6 min-h-screen bg-blue-100">

      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          My Attendance
        </h1>

        <p className="text-gray-500 mt-1">
          View your attendance history and attendance percentage.
        </p>
      </div>

      {/* Attendance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">

        {/* Present Days */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <p className="text-sm text-gray-500">
            Present Days
          </p>

          <p className="text-2xl font-bold text-green-600 mt-2">
            {presentDays}
          </p>
        </div>

        {/* Absent Days */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <p className="text-sm text-gray-500">
            Absent Days
          </p>

          <p className="text-2xl font-bold text-red-600 mt-2">
            {absentDays}
          </p>
        </div>

        {/* Attendance Percentage */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <p className="text-sm text-gray-500">
            Attendance Percentage
          </p>

          <p className="text-2xl font-bold text-blue-600 mt-2">
            {totalDays > 0 ? `${attendancePercentage}%` : "—"}
          </p>
        </div>

      </div>

      {/* Filters */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 mb-6">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* From Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              From Date
            </label>

            <div className="relative">

              <CalendarDays
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>
          </div>

          {/* To Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              To Date
            </label>

            <div className="relative">

              <CalendarDays
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>
          </div>

        </div>

      </div>

      {/* Attendance History */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">

        <div className="p-5 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">
            Attendance History
          </h2>
        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gray-50 border-b border-gray-200">

              <tr>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Date
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Check In
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Check Out
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Working Hours
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              {loading ? (

                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-16 text-center text-gray-500"
                  >
                    Loading attendance...
                  </td>
                </tr>

              ) : filteredAttendance.length === 0 ? (

                <tr>

                  <td
                    colSpan="5"
                    className="px-6 py-16 text-center"
                  >

                    <p className="text-lg font-medium text-gray-400">
                      No attendance records found
                    </p>

                    <p className="text-sm text-gray-400 mt-1">
                      Your attendance records will appear here.
                    </p>

                  </td>

                </tr>

              ) : (

                filteredAttendance.map((item) => (

                  <tr
                    key={item._id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >

                    {/* Date */}
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {new Date(item.date).toLocaleDateString(
                        "en-IN",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        }
                      )}
                    </td>

                    {/* Check In */}
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {item.checkIn || "—"}
                    </td>

                    {/* Check Out */}
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {item.checkOut || "—"}
                    </td>

                    {/* Working Hours */}
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {calculateWorkingHours(
                        item.checkIn,
                        item.checkOut
                      )}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">

                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                          item.status === "present"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {item.status}
                      </span>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default MyAttendance;