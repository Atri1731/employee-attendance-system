import Login from "./pages/Login";

import AdminLayout from "./layouts/AdminLayout";
import EmployeeLayout from "./layouts/EmployeeLayout";

import {BrowserRouter, Route, Routes} from "react-router-dom";

import Signup from "./pages/Signup";

import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import Employees from "./pages/admin/Employees";
import AddEmployee from "./pages/admin/AddEmployee";
import Attendance from "./pages/admin/Attendance";
import LeaveManagement from "./pages/admin/LeaveManagement";
import Reports from "./pages/admin/Reports";
import Departments from "./pages/admin/Departments";
import Holidays from "./pages/admin/Holidays";
import Payroll from "./pages/admin/Payroll";

// Employee Pages
import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
import MyAttendance from "./pages/employee/MyAttendance";
import ApplyLeave from "./pages/employee/ApplyLeave";
import MyLeaves from "./pages/employee/MyLeaves";
import Profile from "./pages/employee/Profile";
import EmployeeHolidays from "./pages/employee/Holidays";
import MySalary from "./pages/employee/MySalary";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        {/* ================= ADMIN ================= */}

        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />

          <Route path="employees" element={<Employees />} />

          <Route path="employee/add" element={<AddEmployee />} />

          <Route path="attendance" element={<Attendance />} />

          <Route path="management/leaves" element={<LeaveManagement />} />

          <Route path="reports" element={<Reports />} />

          <Route path="departments" element={<Departments />} />
<Route path="salary" element={<Payroll />} />
          <Route path="holidays" element={<Holidays />} />
        </Route>

        {/* ================= EMPLOYEE ================= */}

        <Route path="/employee" element={<EmployeeLayout />}>
          <Route path="dashboard" element={<EmployeeDashboard />} />

          <Route path="myattendance" element={<MyAttendance />} />

          <Route path="leave/apply" element={<ApplyLeave />} />

          <Route path="myleaves" element={<MyLeaves />} />
          <Route path="/employee/holidays" element={<EmployeeHolidays />} />
          <Route path="salary" element={<MySalary />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
