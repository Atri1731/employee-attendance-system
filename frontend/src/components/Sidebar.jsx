import {
  LayoutDashboard,
  Users,
  ClipboardCheck,
  CalendarDays,
  FileText,
  Building2,
  Calendar,
  User,
  LogOut,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";

function Sidebar({ role }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  const adminMenu = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Employees",
      path: "/admin/employees",
      icon: Users,
    },
    {
      name: "Attendance",
      path: "/admin/attendance",
      icon: ClipboardCheck,
    },
    {
      name: "Leave Management",
      path: "/admin/management/leaves",
      icon: CalendarDays,
    },
    {
      name: "Reports",
      path: "/admin/reports",
      icon: FileText,
    },
    {
      name: "Departments",
      path: "/admin/departments",
      icon: Building2,
    },
    {
      name: "Holidays",
      path: "/admin/holidays",
      icon: Calendar,
    },
  ];

  const employeeMenu = [
    {
      name: "Dashboard",
      path: "/employee/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "My Attendance",
      path: "/employee/myattendance",
      icon: ClipboardCheck,
    },
    {
      name: "Apply Leave",
      path: "/employee/leave/apply",
      icon: CalendarDays,
    },
    {
      name: "My Leaves",
      path: "/employee/myleaves",
      icon: FileText,
    },
    {
      name: "Holidays",
      path: "/employee/holidays",
      icon: Calendar,
    },
    {
      name: "Profile",
      path: "/employee/profile",
      icon: User,
    },
  ];

  const menu = role === "admin" ? adminMenu : employeeMenu;

  return (
    <aside className="w-64 h-screen fixed left-0 top-0 !bg-gray-100 border-r border-gray-300 flex flex-col shrink-0 z-50">

      {/* Logo */}
      <div className="px-6 py-5 border-b border-gray-300 !bg-gray-100">
        <h1 className="text-xl font-bold text-blue-600">
          Employee Attendance
        </h1>

        <p className="text-sm text-gray-500 mt-1 capitalize">
          {role} Panel
        </p>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 !bg-gray-100">
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition ${
                  isActive
                    ? "bg-blue-50 text-blue-600 font-semibold"
                    : "text-gray-600 hover:bg-gray-200 hover:text-blue-600"
                }`
              }
            >
              <Icon size={20} />

              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-300 !bg-gray-100">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600 transition"
        >
          <LogOut size={20} />

          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;