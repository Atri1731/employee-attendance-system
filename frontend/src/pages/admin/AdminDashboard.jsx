import { useEffect, useState } from "react";
import {
  Users,
  UserCheck,
  UserX,
  CalendarDays,
  ClipboardList,
  Clock3,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

function AdminDashboard() {
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [leaves, setLeaves] = useState([]);

  const [loading, setLoading] = useState(true);

  // =========================
  // GET TODAY'S DATE
  // =========================

  function getTodayDate() {
    const today = new Date();

    const year = today.getFullYear();

    const month = String(
      today.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
      today.getDate()
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  // =========================
  // GET LOCAL DATE FROM RECORD
  // =========================

  function getRecordDate(date) {
    const dateObject = new Date(date);

    const year = dateObject.getFullYear();

    const month = String(
      dateObject.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
      dateObject.getDate()
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  // =========================
  // FORMAT DATE
  // =========================

  function formatDate(date) {
    if (!date) {
      return "-";
    }

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }
    );
  }

  // =========================
  // WORKING HOURS
  // =========================

  function calculateWorkingHours(
    checkIn,
    checkOut
  ) {
    if (!checkIn || !checkOut) {
      return "-";
    }

    const [inHour, inMinute] =
      checkIn.split(":").map(Number);

    const [outHour, outMinute] =
      checkOut.split(":").map(Number);

    const startMinutes =
      inHour * 60 + inMinute;

    const endMinutes =
      outHour * 60 + outMinute;

    const difference =
      endMinutes - startMinutes;

    if (difference <= 0) {
      return "-";
    }

    const hours = Math.floor(
      difference / 60
    );

    const minutes = difference % 60;

    return `${hours}h ${minutes}m`;
  }

  // =========================
  // FETCH DASHBOARD DATA
  // =========================

  useEffect(() => {
    fetchDashboardData();
  }, []);

  async function fetchDashboardData() {
    try {
      setLoading(true);

      const token =
        localStorage.getItem("token");

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      // Fetch all data
      const [
        employeesResponse,
        attendanceResponse,
        leavesResponse,
      ] = await Promise.all([
        fetch(
          "http://localhost:5000/api/employees",
          {
            headers,
          }
        ),

        fetch(
          "http://localhost:5000/api/attendance",
          {
            headers,
          }
        ),

        fetch(
          "http://localhost:5000/api/leaves",
          {
            headers,
          }
        ),
      ]);

      const employeesData =
        await employeesResponse.json();

      const attendanceData =
        await attendanceResponse.json();

      const leavesData =
        await leavesResponse.json();

      if (!employeesResponse.ok) {
        throw new Error(
          employeesData.message ||
            "Failed to fetch employees"
        );
      }

      if (!attendanceResponse.ok) {
        throw new Error(
          attendanceData.message ||
            "Failed to fetch attendance"
        );
      }

      if (!leavesResponse.ok) {
        throw new Error(
          leavesData.message ||
            "Failed to fetch leaves"
        );
      }

      setEmployees(
        employeesData.employees || []
      );

      setAttendance(
        attendanceData.attendance || []
      );

      setLeaves(
        leavesData.leaves || []
      );
    } catch (error) {
      console.error(
        "Dashboard error:",
        error
      );
    } finally {
      setLoading(false);
    }
  }

  // =========================
  // TODAY'S ATTENDANCE
  // =========================

  const today = getTodayDate();

  const todayAttendance =
    attendance.filter(
      (record) =>
        getRecordDate(record.date) === today
    );

  // =========================
  // PRESENT TODAY
  // =========================

  const presentToday =
    todayAttendance.filter(
      (record) =>
        record.status === "present"
    ).length;

  // =========================
  // ABSENT TODAY
  // =========================

  const absentToday =
    todayAttendance.filter(
      (record) =>
        record.status === "absent"
    ).length;

  // =========================
  // ON LEAVE TODAY
  // =========================

  const onLeaveToday =
    leaves.filter((leave) => {
      if (
        leave.status !== "approved"
      ) {
        return false;
      }

      const fromDate =
        getRecordDate(
          leave.fromDate
        );

      const toDate =
        getRecordDate(
          leave.toDate
        );

      return (
        today >= fromDate &&
        today <= toDate
      );
    }).length;

  // =========================
  // STATISTICS
  // =========================

  const stats = [
    {
      title: "Total Employees",
      value: loading
        ? "..."
        : employees.length,
      icon: Users,
      bg: "bg-blue-50",
      iconColor: "text-blue-600",
    },

    {
      title: "Present Today",
      value: loading
        ? "..."
        : presentToday,
      icon: UserCheck,
      bg: "bg-green-50",
      iconColor: "text-green-600",
    },

    {
      title: "Absent Today",
      value: loading
        ? "..."
        : absentToday,
      icon: UserX,
      bg: "bg-red-50",
      iconColor: "text-red-600",
    },

    {
      title: "On Leave",
      value: loading
        ? "..."
        : onLeaveToday,
      icon: CalendarDays,
      bg: "bg-orange-50",
      iconColor: "text-orange-600",
    },
  ];

  return (
    <div className="min-h-screen bg-blue-100 p-6">

      {/* Header */}

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">
          Admin Dashboard
        </h1>

        <p className="text-gray-500 mt-1">
          Manage employees, attendance and leave
          requests.
        </p>
      </div>

      {/* Statistics Cards */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm text-gray-500">
                    {stat.title}
                  </p>

                  <h2 className="text-3xl font-bold text-gray-800 mt-2">
                    {stat.value}
                  </h2>
                </div>

                <div
                  className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center`}
                >
                  <Icon
                    size={24}
                    className={
                      stat.iconColor
                    }
                  />
                </div>

              </div>
            </div>
          );
        })}

      </div>

      {/* Main Content */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Attendance Overview */}

        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl shadow-sm">

          <div className="flex items-center justify-between p-5 border-b border-gray-100">

            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                <ClipboardList
                  size={21}
                  className="text-blue-600"
                />
              </div>

              <div>
                <h2 className="font-semibold text-gray-800">
                  Today's Attendance
                </h2>

                <p className="text-sm text-gray-500">
                  Employee attendance overview
                </p>
              </div>

            </div>

            <Link
              to="/admin/attendance"
              className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              View All
              <ArrowRight size={16} />
            </Link>

          </div>

          {/* Attendance Records */}

          {loading ? (

            <div className="p-10 text-center">
              <p className="text-gray-500">
                Loading attendance...
              </p>
            </div>

          ) : todayAttendance.length === 0 ? (

            <div className="p-10 text-center">

              <div className="w-14 h-14 mx-auto rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <Clock3
                  size={26}
                  className="text-gray-400"
                />
              </div>

              <h3 className="text-gray-700 font-medium">
                No attendance records
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                Attendance records will appear
                here once employees check in.
              </p>

            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead className="bg-gray-50">

                  <tr>

                    <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500">
                      Employee
                    </th>

                    <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500">
                      Check In
                    </th>

                    <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500">
                      Check Out
                    </th>

                    <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500">
                      Hours
                    </th>

                    <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500">
                      Status
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {todayAttendance
                    .slice(0, 5)
                    .map((record) => (

                      <tr
                        key={record._id}
                        className="border-t border-gray-100"
                      >

                        <td className="px-5 py-4">

                          <div>
                            <p className="text-sm font-medium text-gray-800">
                              {
                                record
                                  .employee
                                  ?.name
                              }
                            </p>

                            <p className="text-xs text-gray-500">
                              {
                                record
                                  .employee
                                  ?.employeeId
                              }
                            </p>
                          </div>

                        </td>

                        <td className="px-5 py-4 text-sm text-gray-600">
                          {record.checkIn ||
                            "-"}
                        </td>

                        <td className="px-5 py-4 text-sm text-gray-600">
                          {record.checkOut ||
                            "-"}
                        </td>

                        <td className="px-5 py-4 text-sm text-gray-600">
                          {calculateWorkingHours(
                            record.checkIn,
                            record.checkOut
                          )}
                        </td>

                        <td className="px-5 py-4">

                          <span
                            className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${
                              record.status ===
                              "present"
                                ? "bg-green-100 text-green-700"
                                : record.status ===
                                  "absent"
                                ? "bg-red-100 text-red-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {
                              record.status
                            }
                          </span>

                        </td>

                      </tr>

                    ))}

                </tbody>

              </table>

            </div>

          )}

        </div>

        {/* Quick Actions */}

        <div className="bg-white border border-gray-200 rounded-xl shadow-sm">

          <div className="p-5 border-b border-gray-100">

            <h2 className="font-semibold text-gray-800">
              Quick Actions
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Frequently used actions
            </p>

          </div>

          <div className="p-5 space-y-3">

            <Link
              to="/admin/employee/add"
              className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition"
            >

              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">

                <Users
                  size={20}
                  className="text-blue-600"
                />

              </div>

              <div>

                <p className="font-medium text-gray-700">
                  Add Employee
                </p>

                <p className="text-xs text-gray-500">
                  Create a new employee
                </p>

              </div>

            </Link>

            <Link
              to="/admin/attendance"
              className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50 transition"
            >

              <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">

                <ClipboardList
                  size={20}
                  className="text-green-600"
                />

              </div>

              <div>

                <p className="font-medium text-gray-700">
                  View Attendance
                </p>

                <p className="text-xs text-gray-500">
                  Check employee attendance
                </p>

              </div>

            </Link>

            <Link
              to="/admin/management/leaves"
              className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-orange-300 hover:bg-orange-50 transition"
            >

              <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center">

                <CalendarDays
                  size={20}
                  className="text-orange-600"
                />

              </div>

              <div>

                <p className="font-medium text-gray-700">
                  Leave Requests
                </p>

                <p className="text-xs text-gray-500">
                  Review pending leaves
                </p>

              </div>

            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;