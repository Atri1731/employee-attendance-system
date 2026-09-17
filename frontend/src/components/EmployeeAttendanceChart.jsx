// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";

// function EmployeeAttendanceChart({
//   employee,
//   attendance,
//   leaves,
//   onClose,
// }) {
//   if (!employee) return null;

//   const employeeId = employee._id || employee.id;

//   // =====================================
//   // GET THIS EMPLOYEE'S ATTENDANCE
//   // =====================================

//   const employeeAttendance = (attendance || []).filter((record) => {
//     const recordEmployeeId =
//       record.employee?._id ||
//       record.employee?.id ||
//       record.employeeId;

//     return String(recordEmployeeId) === String(employeeId);
//   });

//   // =====================================
//   // GET THIS EMPLOYEE'S APPROVED LEAVES
//   // =====================================

//   const employeeLeaves = (leaves || []).filter((leave) => {
//     const leaveEmployeeId =
//       leave.employee?._id ||
//       leave.employee?.id ||
//       leave.employeeId;

//     return (
//       String(leaveEmployeeId) === String(employeeId) &&
//       leave.status === "approved"
//     );
//   });

//   // =====================================
//   // MONTHLY ATTENDANCE DATA
//   // =====================================

//   const monthlyData = {};

//   employeeAttendance.forEach((record) => {
//     const date = new Date(record.date);

//     if (isNaN(date.getTime())) return;

//     const monthKey = `${date.getFullYear()}-${String(
//       date.getMonth() + 1
//     ).padStart(2, "0")}`;

//     const monthName = date.toLocaleString("en-IN", {
//       month: "short",
//       year: "numeric",
//     });

//     if (!monthlyData[monthKey]) {
//       monthlyData[monthKey] = {
//         month: monthName,
//         present: 0,
//         absent: 0,
//         leave: 0,
//       };
//     }

//     if (record.status === "present") {
//       monthlyData[monthKey].present++;
//     }

//     if (record.status === "absent") {
//       monthlyData[monthKey].absent++;
//     }
//   });

//   // =====================================
//   // COUNT LEAVE DAYS
//   // =====================================

//   employeeLeaves.forEach((leave) => {
//     const fromDate = new Date(leave.fromDate);
//     const toDate = new Date(leave.toDate);

//     if (
//       isNaN(fromDate.getTime()) ||
//       isNaN(toDate.getTime())
//     ) {
//       return;
//     }

//     const currentDate = new Date(fromDate);

//     while (currentDate <= toDate) {
//       const monthKey = `${currentDate.getFullYear()}-${String(
//         currentDate.getMonth() + 1
//       ).padStart(2, "0")}`;

//       const monthName = currentDate.toLocaleString("en-IN", {
//         month: "short",
//         year: "numeric",
//       });

//       if (!monthlyData[monthKey]) {
//         monthlyData[monthKey] = {
//           month: monthName,
//           present: 0,
//           absent: 0,
//           leave: 0,
//         };
//       }

//       monthlyData[monthKey].leave++;

//       currentDate.setDate(currentDate.getDate() + 1);
//     }
//   });

//   // =====================================
//   // CHART DATA
//   // =====================================

//   const chartData = Object.keys(monthlyData)
//     .sort()
//     .map((key) => monthlyData[key]);

//   // =====================================
//   // STATISTICS
//   // =====================================

//   const present = employeeAttendance.filter(
//     (record) => record.status === "present"
//   ).length;

//   const absent = employeeAttendance.filter(
//     (record) => record.status === "absent"
//   ).length;

//   const leave = employeeLeaves.reduce(
//     (total, currentLeave) => {
//       const fromDate = new Date(currentLeave.fromDate);
//       const toDate = new Date(currentLeave.toDate);

//       if (
//         isNaN(fromDate.getTime()) ||
//         isNaN(toDate.getTime())
//       ) {
//         return total;
//       }

//       const difference =
//         Math.floor(
//           (toDate - fromDate) /
//             (1000 * 60 * 60 * 24)
//         ) + 1;

//       return total + difference;
//     },
//     0
//   );

//   const totalWorkingDays = present + absent;

//   const percentage =
//     totalWorkingDays > 0
//       ? Math.round(
//           (present / totalWorkingDays) * 100
//         )
//       : 0;

//   // =====================================
//   // UI
//   // =====================================

//   return (
//     <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">

//       {/* Background */}
//       <div
//         className="absolute inset-0 bg-black/40"
//         onClick={onClose}
//       />

//       {/* Modal */}
//       <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">

//         {/* Header */}
//         <div className="flex items-center justify-between p-6 border-b border-gray-200">

//           <div>
//             <h2 className="text-xl font-bold text-gray-800">
//               {employee.name}
//             </h2>

//             <p className="text-sm text-gray-500 mt-1">
//               {employee.employeeId || "Employee"}

//               {employee.department
//                 ? ` • ${employee.department}`
//                 : ""}
//             </p>
//           </div>

//           <button
//             onClick={onClose}
//             className="w-9 h-9 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 text-xl"
//           >
//             ×
//           </button>

//         </div>

//         {/* Statistics */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6">

//           {/* Present */}
//           <div className="bg-green-50 rounded-xl p-4">
//             <p className="text-sm text-gray-500">
//               Present
//             </p>

//             <p className="text-2xl font-bold text-green-600 mt-1">
//               {present}
//             </p>
//           </div>

//           {/* Absent */}
//           <div className="bg-red-50 rounded-xl p-4">
//             <p className="text-sm text-gray-500">
//               Absent
//             </p>

//             <p className="text-2xl font-bold text-red-600 mt-1">
//               {absent}
//             </p>
//           </div>

//           {/* Leave */}
//           <div className="bg-orange-50 rounded-xl p-4">
//             <p className="text-sm text-gray-500">
//               Leave
//             </p>

//             <p className="text-2xl font-bold text-orange-600 mt-1">
//               {leave}
//             </p>
//           </div>

//           {/* Attendance */}
//           <div className="bg-blue-50 rounded-xl p-4">
//             <p className="text-sm text-gray-500">
//               Attendance
//             </p>

//             <p className="text-2xl font-bold text-blue-600 mt-1">
//               {percentage}%
//             </p>
//           </div>

//         </div>

//         {/* Chart */}
//         <div className="px-6 pb-6">

//           <div className="bg-white border border-gray-200 rounded-xl p-5">

//             <h3 className="text-lg font-semibold text-gray-800 mb-5">
//               Monthly Attendance
//             </h3>

//             {chartData.length === 0 ? (

//               <div className="h-72 flex items-center justify-center text-gray-500">
//                 No attendance data available for this employee.
//               </div>

//             ) : (

//               <div className="w-full h-72">

//                 <ResponsiveContainer
//                   width="100%"
//                   height="100%"
//                 >

//                   <BarChart data={chartData}>

//                     <CartesianGrid strokeDasharray="3 3" />

//                     <XAxis dataKey="month" />

//                     <YAxis allowDecimals={false} />

//                     <Tooltip />

//                     <Legend />

//                     <Bar
//                       dataKey="present"
//                       name="Present"
//                       fill="#22c55e"
//                       radius={[4, 4, 0, 0]}
//                     />

//                     <Bar
//                       dataKey="absent"
//                       name="Absent"
//                       fill="#ef4444"
//                       radius={[4, 4, 0, 0]}
//                     />

//                     <Bar
//                       dataKey="leave"
//                       name="Leave"
//                       fill="#f97316"
//                       radius={[4, 4, 0, 0]}
//                     />

//                   </BarChart>

//                 </ResponsiveContainer>

//               </div>

//             )}

//           </div>

//         </div>

//       </div>

//     </div>
//   );
// }

// export default EmployeeAttendanceChart;

import {useState} from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function EmployeeAttendanceChart({
  employee,
  attendance,
  leaves,
  onClose,
  isModal = true,
}) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  if (!employee) return null;

  const employeeId = employee._id || employee.id;

  // =====================================
  // GET THIS EMPLOYEE'S ATTENDANCE
  // =====================================

  const employeeAttendance = (attendance || []).filter((record) => {
    const recordEmployeeId =
      record.employee?._id || record.employee?.id || record.employeeId;

    return String(recordEmployeeId) === String(employeeId);
  });

  // =====================================
  // GET THIS EMPLOYEE'S APPROVED LEAVES
  // =====================================

  const employeeLeaves = (leaves || []).filter((leave) => {
    const leaveEmployeeId =
      leave.employee?._id || leave.employee?.id || leave.employeeId;

    return (
      String(leaveEmployeeId) === String(employeeId) &&
      leave.status === "approved"
    );
  });

  // =====================================
  // MONTHLY ATTENDANCE DATA
  // =====================================

  const monthlyData = {};

  employeeAttendance.forEach((record) => {
    const date = new Date(record.date);

    if (isNaN(date.getTime())) return;

    const monthKey = `${date.getFullYear()}-${String(
      date.getMonth() + 1,
    ).padStart(2, "0")}`;

    const monthName = date.toLocaleString("en-IN", {
      month: "short",
      year: "numeric",
    });

    if (!monthlyData[monthKey]) {
      monthlyData[monthKey] = {
        month: monthName,
        present: 0,
        absent: 0,
        halfDay: 0,
        leave: 0,
      };
    }

    if (record.status === "present") {
      monthlyData[monthKey].present++;
    }

    if (record.status === "absent") {
      monthlyData[monthKey].absent++;
    }

    if (record.status === "half-day") {
      monthlyData[monthKey].halfDay++;
    }
  });

  // =====================================
  // COUNT APPROVED LEAVE DAYS
  // =====================================

  employeeLeaves.forEach((leave) => {
    const fromDate = new Date(leave.fromDate);
    const toDate = new Date(leave.toDate);

    if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
      return;
    }

    const currentDate = new Date(fromDate);

    while (currentDate <= toDate) {
      const monthKey = `${currentDate.getFullYear()}-${String(
        currentDate.getMonth() + 1,
      ).padStart(2, "0")}`;

      const monthName = currentDate.toLocaleString("en-IN", {
        month: "short",
        year: "numeric",
      });

      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = {
          month: monthName,
          present: 0,
          absent: 0,
          halfDay: 0,
          leave: 0,
        };
      }

      monthlyData[monthKey].leave++;

      currentDate.setDate(currentDate.getDate() + 1);
    }
  });

  // =====================================
  // CHART DATA
  // =====================================

  const chartData = Object.keys(monthlyData)
    .sort()
    .map((key) => monthlyData[key]);

  // =====================================
  // STATISTICS
  // =====================================

  const present = employeeAttendance.filter(
    (record) => record.status === "present",
  ).length;

  const absent = employeeAttendance.filter(
    (record) => record.status === "absent",
  ).length;

  const halfDay = employeeAttendance.filter(
    (record) => record.status === "half-day",
  ).length;

  const leave = employeeLeaves.reduce((total, currentLeave) => {
    const fromDate = new Date(currentLeave.fromDate);
    const toDate = new Date(currentLeave.toDate);

    if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
      return total;
    }

    const difference =
      Math.floor((toDate - fromDate) / (1000 * 60 * 60 * 24)) + 1;

    return total + difference;
  }, 0);

  const totalWorkingDays = present + absent + halfDay;

  const attendancePercentage =
    totalWorkingDays > 0
      ? Math.round(((present + halfDay * 0.5) / totalWorkingDays) * 100)
      : 0;

  // =====================================
  // CALENDAR FUNCTIONS
  // =====================================

  const calendarYear = currentDate.getFullYear();
  const calendarMonth = currentDate.getMonth();

  const monthName = currentDate.toLocaleString("en-IN", {
    month: "long",
    year: "numeric",
  });

  const firstDay = new Date(calendarYear, calendarMonth, 1).getDay();

  const daysInMonth = new Date(calendarYear, calendarMonth + 1, 0).getDate();

  const previousMonth = () => {
    setCurrentDate(new Date(calendarYear, calendarMonth - 1, 1));
    setSelectedDate(null);
  };

  const nextMonth = () => {
    setCurrentDate(new Date(calendarYear, calendarMonth + 1, 1));
    setSelectedDate(null);
  };

  // =====================================
  // FORMAT DATE
  // =====================================

  const formatDateKey = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  // =====================================
  // GET ATTENDANCE FOR DATE
  // =====================================

  const getAttendanceForDate = (date) => {
    const dateKey = formatDateKey(date);

    return employeeAttendance.find((record) => {
      return formatDateKey(new Date(record.date)) === dateKey;
    });
  };

  // =====================================
  // GET LEAVE FOR DATE
  // =====================================

  const getLeaveForDate = (date) => {
    return employeeLeaves.find((leave) => {
      const fromDate = new Date(leave.fromDate);

      const toDate = new Date(leave.toDate);

      fromDate.setHours(0, 0, 0, 0);
      toDate.setHours(0, 0, 0, 0);

      const checkDate = new Date(date);
      checkDate.setHours(0, 0, 0, 0);

      return checkDate >= fromDate && checkDate <= toDate;
    });
  };

  // =====================================
  // GET STATUS
  // =====================================

  const getDayStatus = (date) => {
    const attendanceRecord = getAttendanceForDate(date);

    if (attendanceRecord) {
      return attendanceRecord.status;
    }

    const leaveRecord = getLeaveForDate(date);

    if (leaveRecord) {
      return "leave";
    }

    return null;
  };

  // =====================================
  // STATUS STYLE
  // =====================================

  const getStatusStyle = (status) => {
    switch (status) {
      case "present":
        return {
          bg: "bg-green-100",
          text: "text-green-700",
          border: "border-green-300",
          symbol: "✓",
        };

      case "absent":
        return {
          bg: "bg-red-100",
          text: "text-red-700",
          border: "border-red-300",
          symbol: "✕",
        };

      case "half-day":
        return {
          bg: "bg-orange-100",
          text: "text-orange-700",
          border: "border-orange-300",
          symbol: "½",
        };

      case "leave":
        return {
          bg: "bg-blue-100",
          text: "text-blue-700",
          border: "border-blue-300",
          symbol: "L",
        };

      default:
        return {
          bg: "bg-gray-50",
          text: "text-gray-400",
          border: "border-gray-200",
          symbol: "",
        };
    }
  };

  // =====================================
  // SELECT DATE
  // =====================================

  const handleDateClick = (day) => {
    const clickedDate = new Date(calendarYear, calendarMonth, day);

    setSelectedDate(clickedDate);
  };

  const selectedAttendance = selectedDate
    ? getAttendanceForDate(selectedDate)
    : null;

  const selectedLeave = selectedDate ? getLeaveForDate(selectedDate) : null;

  const selectedStatus = selectedDate ? getDayStatus(selectedDate) : null;

  // =====================================
  // CALENDAR DAYS
  // =====================================

  const calendarDays = [];

  // Empty spaces before first day
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }

  // Actual days
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  // =====================================
  // UI
  // =====================================

  return (
    <div
      className={
        isModal
          ? "fixed inset-0 z-[100] flex items-center justify-center p-4"
          : "w-full"
      }
    >
      {/* Background - only for Admin modal */}
      {isModal && (
        <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      )}

      {/* Main Container */}
      <div
        className={
          isModal
            ? "relative bg-white rounded-2xl shadow-xl w-full max-w-5xl max-h-[92vh] overflow-y-auto"
            : "bg-white border border-gray-200 rounded-2xl shadow-sm w-full overflow-hidden"
        }
      >
        {/* ================================= */}
        {/* HEADER */}
        {/* ================================= */}

        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              {isModal ? employee.name : "Attendance Calendar"}
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              {isModal
                ? `${employee.employeeId || "Employee"}${
                    employee.department ? ` • ${employee.department}` : ""
                  }`
                : "View your attendance by date"}
            </p>
          </div>

          {isModal && (
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 text-xl"
            >
              ×
            </button>
          )}
        </div>

        {/* ================================= */}
        {/* STATISTICS */}
        {/* ================================= */}

       {isModal && (
  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 p-6">

    {/* Present */}
    <div className="bg-green-50 rounded-xl p-4">
      <p className="text-sm text-gray-500">Present</p>

      <p className="text-2xl font-bold text-green-600 mt-1">
        {present}
      </p>
    </div>

    {/* Absent */}
    <div className="bg-red-50 rounded-xl p-4">
      <p className="text-sm text-gray-500">Absent</p>

      <p className="text-2xl font-bold text-red-600 mt-1">
        {absent}
      </p>
    </div>

    {/* Half Day */}
    <div className="bg-orange-50 rounded-xl p-4">
      <p className="text-sm text-gray-500">Half Day</p>

      <p className="text-2xl font-bold text-orange-600 mt-1">
        {halfDay}
      </p>
    </div>

    {/* Leave */}
    <div className="bg-blue-50 rounded-xl p-4">
      <p className="text-sm text-gray-500">Leave</p>

      <p className="text-2xl font-bold text-blue-600 mt-1">
        {leave}
      </p>
    </div>

    {/* Attendance */}
    <div className="bg-purple-50 rounded-xl p-4">
      <p className="text-sm text-gray-500">Attendance</p>

      <p className="text-2xl font-bold text-purple-600 mt-1">
        {attendancePercentage}%
      </p>
    </div>

  </div>
)}

        {/* ================================= */}
        {/* CALENDAR */}
        {/* ================================= */}

        <div className="px-6 pb-6">
          <div className="border border-gray-200 rounded-xl overflow-hidden">
            {/* Calendar Header */}
            <div className="flex items-center justify-between p-5 bg-gray-50 border-b border-gray-200">
              <button
                onClick={previousMonth}
                className="px-4 py-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-100 text-gray-700 font-medium"
              >
                ← Previous
              </button>

              <div className="text-center">
                <h3 className="text-lg font-bold text-gray-800">{monthName}</h3>

                <p className="text-xs text-gray-500 mt-1">
                  {isModal
                    ? `${employee.name}'s Attendance`
                    : "Monthly attendance overview"}
                </p>
              </div>

              <button
                onClick={nextMonth}
                className="px-4 py-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-100 text-gray-700 font-medium"
              >
                Next →
              </button>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center gap-4 px-5 py-4 border-b border-gray-200">
              <div className="flex items-center gap-2 text-sm">
                <span className="w-7 h-7 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold">
                  ✓
                </span>
                Present
              </div>

              <div className="flex items-center gap-2 text-sm">
                <span className="w-7 h-7 rounded-full bg-red-100 text-red-700 flex items-center justify-center font-bold">
                  ✕
                </span>
                Absent
              </div>

              <div className="flex items-center gap-2 text-sm">
                <span className="w-7 h-7 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center font-bold">
                  ½
                </span>
                Half Day
              </div>

              <div className="flex items-center gap-2 text-sm">
                <span className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                  L
                </span>
                Leave
              </div>
            </div>

            {/* Calendar */}
            <div className="p-4 sm:p-6">
              {/* Week Days */}
              <div className="grid grid-cols-7 mb-2">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                  (day) => (
                    <div
                      key={day}
                      className="text-center text-xs sm:text-sm font-semibold text-gray-500 py-2"
                    >
                      {day}
                    </div>
                  ),
                )}
              </div>

              {/* Dates */}
              <div className="grid grid-cols-7 gap-1 sm:gap-2">
                {calendarDays.map((day, index) => {
                  if (!day) {
                    return (
                      <div
                        key={`empty-${index}`}
                        className="min-h-[60px] sm:min-h-[75px]"
                      />
                    );
                  }

                  const date = new Date(calendarYear, calendarMonth, day);

                  const status = getDayStatus(date);

                  const style = getStatusStyle(status);

                  const isToday =
                    formatDateKey(date) === formatDateKey(new Date());

                  const isSelected =
                    selectedDate &&
                    formatDateKey(date) === formatDateKey(selectedDate);

                  return (
                    <button
                      key={day}
                      onClick={() => handleDateClick(day)}
                      className={`
                          min-h-[60px] sm:min-h-[75px]
                          rounded-lg border
                          flex flex-col
                          items-center
                          justify-center
                          gap-1
                          transition
                          ${style.bg}
                          ${style.border}
                          hover:shadow-md
                          ${isSelected ? "ring-2 ring-blue-500" : ""}
                          ${isToday ? "ring-2 ring-gray-400" : ""}
                        `}
                    >
                      <span className="text-sm sm:text-base font-semibold text-gray-700">
                        {day}
                      </span>

                      {status && (
                        <span
                          className={`text-lg sm:text-xl font-bold ${style.text}`}
                        >
                          {style.symbol}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ================================= */}
            {/* SELECTED DATE DETAILS */}
            {/* ================================= */}

            {selectedDate && (
              <div className="border-t border-gray-200 p-5 bg-gray-50">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      Attendance Details
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      {selectedDate.toLocaleDateString("en-IN", {
                        weekday: "long",
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>

                  {selectedStatus && (
                    <span
                      className={`
                        px-3 py-1.5
                        rounded-full
                        text-sm
                        font-semibold
                        ${getStatusStyle(selectedStatus).bg}
                        ${getStatusStyle(selectedStatus).text}
                      `}
                    >
                      {selectedStatus === "half-day"
                        ? "Half Day"
                        : selectedStatus.charAt(0).toUpperCase() +
                          selectedStatus.slice(1)}
                    </span>
                  )}
                </div>

                {!selectedStatus ? (
                  <div className="bg-white border border-gray-200 rounded-lg p-4 text-sm text-gray-500">
                    No attendance record found for this date.
                  </div>
                ) : selectedAttendance ? (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <p className="text-xs text-gray-500">Status</p>

                      <p className="font-semibold text-gray-800 mt-1">
                        {selectedStatus === "half-day"
                          ? "Half Day"
                          : selectedStatus.charAt(0).toUpperCase() +
                            selectedStatus.slice(1)}
                      </p>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <p className="text-xs text-gray-500">Check In</p>

                      <p className="font-semibold text-gray-800 mt-1">
                        {selectedAttendance.checkIn || "—"}
                      </p>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <p className="text-xs text-gray-500">Check Out</p>

                      <p className="font-semibold text-gray-800 mt-1">
                        {selectedAttendance.checkOut || "—"}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <p className="text-sm text-gray-500">Leave Type</p>

                    <p className="font-semibold text-gray-800 mt-1">
                      {selectedLeave?.leaveType || "Approved Leave"}
                    </p>

                    {selectedLeave?.reason && (
                      <>
                        <p className="text-sm text-gray-500 mt-3">Reason</p>

                        <p className="text-sm text-gray-700 mt-1">
                          {selectedLeave.reason}
                        </p>
                      </>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* ================================= */}
        {/* MONTHLY CHART */}
        {/* ================================= */}

        <div className="px-6 pb-6">
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h3 className="text-lg font-semibold text-gray-800 mb-5">
              Monthly Attendance
            </h3>

            {chartData.length === 0 ? (
              <div className="h-72 flex items-center justify-center text-gray-500">
                No attendance data available for this employee.
              </div>
            ) : (
              <div className="w-full h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="month" />

                    <YAxis allowDecimals={false} />

                    <Tooltip />

                    <Legend />

                    <Bar
                      dataKey="present"
                      name="Present"
                      fill="#22c55e"
                      radius={[4, 4, 0, 0]}
                    />

                    <Bar
                      dataKey="absent"
                      name="Absent"
                      fill="#ef4444"
                      radius={[4, 4, 0, 0]}
                    />

                    <Bar
                      dataKey="halfDay"
                      name="Half Day"
                      fill="#f97316"
                      radius={[4, 4, 0, 0]}
                    />

                    <Bar
                      dataKey="leave"
                      name="Leave"
                      fill="#3b82f6"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeAttendanceChart;
