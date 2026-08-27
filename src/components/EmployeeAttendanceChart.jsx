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
}) {
  if (!employee) return null;

  const employeeId = employee._id || employee.id;

  // =====================================
  // GET THIS EMPLOYEE'S ATTENDANCE
  // =====================================

  const employeeAttendance = (attendance || []).filter((record) => {
    const recordEmployeeId =
      record.employee?._id ||
      record.employee?.id ||
      record.employeeId;

    return String(recordEmployeeId) === String(employeeId);
  });

  // =====================================
  // GET THIS EMPLOYEE'S APPROVED LEAVES
  // =====================================

  const employeeLeaves = (leaves || []).filter((leave) => {
    const leaveEmployeeId =
      leave.employee?._id ||
      leave.employee?.id ||
      leave.employeeId;

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
      date.getMonth() + 1
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
        leave: 0,
      };
    }

    if (record.status === "present") {
      monthlyData[monthKey].present++;
    }

    if (record.status === "absent") {
      monthlyData[monthKey].absent++;
    }
  });

  // =====================================
  // COUNT LEAVE DAYS
  // =====================================

  employeeLeaves.forEach((leave) => {
    const fromDate = new Date(leave.fromDate);
    const toDate = new Date(leave.toDate);

    if (
      isNaN(fromDate.getTime()) ||
      isNaN(toDate.getTime())
    ) {
      return;
    }

    const currentDate = new Date(fromDate);

    while (currentDate <= toDate) {
      const monthKey = `${currentDate.getFullYear()}-${String(
        currentDate.getMonth() + 1
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
    (record) => record.status === "present"
  ).length;

  const absent = employeeAttendance.filter(
    (record) => record.status === "absent"
  ).length;

  const leave = employeeLeaves.reduce(
    (total, currentLeave) => {
      const fromDate = new Date(currentLeave.fromDate);
      const toDate = new Date(currentLeave.toDate);

      if (
        isNaN(fromDate.getTime()) ||
        isNaN(toDate.getTime())
      ) {
        return total;
      }

      const difference =
        Math.floor(
          (toDate - fromDate) /
            (1000 * 60 * 60 * 24)
        ) + 1;

      return total + difference;
    },
    0
  );

  const totalWorkingDays = present + absent;

  const percentage =
    totalWorkingDays > 0
      ? Math.round(
          (present / totalWorkingDays) * 100
        )
      : 0;

  // =====================================
  // UI
  // =====================================

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">

      {/* Background */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">

          <div>
            <h2 className="text-xl font-bold text-gray-800">
              {employee.name}
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              {employee.employeeId || "Employee"}

              {employee.department
                ? ` • ${employee.department}`
                : ""}
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 text-xl"
          >
            ×
          </button>

        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6">

          {/* Present */}
          <div className="bg-green-50 rounded-xl p-4">
            <p className="text-sm text-gray-500">
              Present
            </p>

            <p className="text-2xl font-bold text-green-600 mt-1">
              {present}
            </p>
          </div>

          {/* Absent */}
          <div className="bg-red-50 rounded-xl p-4">
            <p className="text-sm text-gray-500">
              Absent
            </p>

            <p className="text-2xl font-bold text-red-600 mt-1">
              {absent}
            </p>
          </div>

          {/* Leave */}
          <div className="bg-orange-50 rounded-xl p-4">
            <p className="text-sm text-gray-500">
              Leave
            </p>

            <p className="text-2xl font-bold text-orange-600 mt-1">
              {leave}
            </p>
          </div>

          {/* Attendance */}
          <div className="bg-blue-50 rounded-xl p-4">
            <p className="text-sm text-gray-500">
              Attendance
            </p>

            <p className="text-2xl font-bold text-blue-600 mt-1">
              {percentage}%
            </p>
          </div>

        </div>

        {/* Chart */}
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

                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >

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
                      dataKey="leave"
                      name="Leave"
                      fill="#f97316"
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
