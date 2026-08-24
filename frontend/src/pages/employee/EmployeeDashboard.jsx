import {useState, useEffect} from "react";
import {
  CalendarCheck,
  CalendarDays,
  Clock3,
  FileText,
  UserRound,
  ArrowRight,
  LogIn,
  LogOut,
} from "lucide-react";
import {Link} from "react-router-dom";

function EmployeeDashboard() {
  const [attendance, setAttendance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [attendanceStats, setAttendanceStats] = useState({
    present: 0,
    absent: 0,
    percentage: 0,
  });
  const [leaveBalance, setLeaveBalance] = useState(12);

  useEffect(() => {
    fetchTodayAttendance();
    fetchLeaveBalance();
  }, []);

  const fetchTodayAttendance = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${import.meta.env.VITE_API_URL}/attendance/my`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      const presentDays = data.attendance.filter(
        (item) => item.status === "present",
      ).length;

      const absentDays = data.attendance.filter(
        (item) => item.status === "absent",
      ).length;

      const totalDays = presentDays + absentDays;

      const percentage =
        totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0;

      
      setAttendanceStats({
        present: presentDays,
        absent: absentDays,
        percentage,
      });

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch attendance");
      }

      const today = new Date().toLocaleDateString("en-CA");

      const todayAttendance = data.attendance.find((item) => {
        const attendanceDate = new Date(item.date).toLocaleDateString("en-CA");

        return attendanceDate === today;
      });

      if (todayAttendance) {
        setAttendance(todayAttendance);
      }
    } catch (error) {
      console.error("Fetch today's attendance error:", error);
    }
  };
  const fetchLeaveBalance = async () => {
        try {
          const token = localStorage.getItem("token");

          const response = await fetch(`${import.meta.env.VITE_API_URL}/leaves/my`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.message || "Failed to fetch leaves");
          }

          const approvedLeaves = (data.leaves || []).filter(
            (leave) => leave.status === "approved",
          );

          let usedDays = 0;

          approvedLeaves.forEach((leave) => {
            const from = new Date(leave.fromDate);
            const to = new Date(leave.toDate);

            const difference =
              Math.floor((to - from) / (1000 * 60 * 60 * 24)) + 1;

            usedDays += difference;
          });

          const totalLeave = 12;

          const remainingLeave = Math.max(totalLeave - usedDays, 0);

          setLeaveBalance(remainingLeave);
        } catch (error) {
          console.error("Fetch leave balance error:", error);
        }
      };

  const stats = [
    {
      title: "Present Days",
      value: attendanceStats.present,
      icon: CalendarCheck,
      bg: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      title: "Absent Days",
      value: attendanceStats.absent,
      icon: CalendarDays,
      bg: "bg-red-50",
      iconColor: "text-red-600",
    },
    {
      title: "Attendance",
      value: attendanceStats.percentage
        ? `${attendanceStats.percentage}%`
        : "—",
      icon: Clock3,
      bg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      title: "Leave Balance",
      value: `${leaveBalance} Days`,
      icon: FileText,
      bg: "bg-orange-50",
      iconColor: "text-orange-600",
    },
  ];

  // Employee Check-In
  const handleCheckIn = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await fetch(
       `${import.meta.env.VITE_API_URL}/attendance/check-in`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Check-in failed");
      }

      setAttendance(data.attendance);

      alert("Check-in successful!");
    } catch (error) {
      console.error("Check-in error:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Employee Check-Out
  const handleCheckOut = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/attendance/check-out`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Check-out failed");
      }

      setAttendance(data.attendance);

      alert("Check-out successful!");
    } catch (error) {
      console.error("Check-out error:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-100 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Employee Dashboard</h1>

        <p className="text-gray-500 mt-1">
          View your attendance, leaves and profile information.
        </p>
      </div>

      {/* Statistics */}
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
                  <p className="text-sm text-gray-500">{stat.title}</p>

                  <h2 className="text-3xl font-bold text-gray-800 mt-2">
                    {stat.value}
                  </h2>
                </div>

                <div
                  className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center`}
                >
                  <Icon size={24} className={stat.iconColor} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Attendance */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl shadow-sm">
          <div className="p-5 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                <Clock3 size={21} className="text-blue-600" />
              </div>

              <div>
                <h2 className="font-semibold text-gray-800">
                  Today's Attendance
                </h2>

                <p className="text-sm text-gray-500">
                  Your attendance information for today
                </p>
              </div>
            </div>
          </div>

          {/* Attendance Content */}
          <div className="p-8">
            {/* Check In / Check Out Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button
                onClick={handleCheckIn}
                disabled={loading || attendance?.checkIn}
                className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition ${
                  attendance?.checkIn
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-green-600 text-white hover:bg-green-700"
                }`}
              >
                <LogIn size={20} />

                {attendance?.checkIn
                  ? "Checked In"
                  : loading
                    ? "Checking In..."
                    : "Check In"}
              </button>

              <button
                onClick={handleCheckOut}
                disabled={
                  loading || !attendance?.checkIn || attendance?.checkOut
                }
                className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition ${
                  !attendance?.checkIn || attendance?.checkOut
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-red-600 text-white hover:bg-red-700"
                }`}
              >
                <LogOut size={20} />

                {attendance?.checkOut
                  ? "Checked Out"
                  : loading
                    ? "Checking Out..."
                    : "Check Out"}
              </button>
            </div>

            {/* Attendance Information */}
            {attendance ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Check In */}
                <div className="bg-green-50 rounded-xl p-5 text-center">
                  <p className="text-sm text-gray-500">Check In</p>

                  <p className="text-2xl font-bold text-green-600 mt-2">
                    {attendance.checkIn || "—"}
                  </p>
                </div>

                {/* Check Out */}
                <div className="bg-red-50 rounded-xl p-5 text-center">
                  <p className="text-sm text-gray-500">Check Out</p>

                  <p className="text-2xl font-bold text-red-600 mt-2">
                    {attendance.checkOut || "—"}
                  </p>
                </div>

                {/* Status */}
                <div className="bg-blue-50 rounded-xl p-5 text-center">
                  <p className="text-sm text-gray-500">Status</p>

                  <p className="text-2xl font-bold text-blue-600 mt-2 capitalize">
                    {attendance.status}
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <div className="w-14 h-14 mx-auto rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <Clock3 size={26} className="text-gray-400" />
                </div>

                <h3 className="text-gray-700 font-medium">
                  No attendance data
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Click Check In to start your attendance.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
          <div className="p-5 border-b border-gray-100">
            <h2 className="font-semibold text-gray-800">Quick Actions</h2>

            <p className="text-sm text-gray-500 mt-1">
              Access your frequently used options
            </p>
          </div>

          <div className="p-5 space-y-3">
            {/* My Attendance */}
            <Link
              to="/employee/myattendance"
              className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                <CalendarCheck size={20} className="text-blue-600" />
              </div>

              <div className="flex-1">
                <p className="font-medium text-gray-700">My Attendance</p>

                <p className="text-xs text-gray-500">View attendance history</p>
              </div>

              <ArrowRight size={17} className="text-gray-400" />
            </Link>

            {/* Apply Leave */}
            <Link
              to="/employee/leave/apply"
              className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-orange-300 hover:bg-orange-50 transition"
            >
              <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center">
                <CalendarDays size={20} className="text-orange-600" />
              </div>

              <div className="flex-1">
                <p className="font-medium text-gray-700">Apply Leave</p>

                <p className="text-xs text-gray-500">
                  Submit a new leave request
                </p>
              </div>

              <ArrowRight size={17} className="text-gray-400" />
            </Link>

            {/* My Leaves */}
            <Link
              to="/employee/myleaves"
              className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50 transition"
            >
              <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                <FileText size={20} className="text-green-600" />
              </div>

              <div className="flex-1">
                <p className="font-medium text-gray-700">My Leaves</p>

                <p className="text-xs text-gray-500">Check your leave status</p>
              </div>

              <ArrowRight size={17} className="text-gray-400" />
            </Link>

            {/* Profile */}
            <Link
              to="/employee/profile"
              className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition"
            >
              <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
                <UserRound size={20} className="text-purple-600" />
              </div>

              <div className="flex-1">
                <p className="font-medium text-gray-700">My Profile</p>

                <p className="text-xs text-gray-500">View your profile</p>
              </div>

              <ArrowRight size={17} className="text-gray-400" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDashboard;
