// import {useState} from "react";
// import {
//   Mail,
//   Lock,
//   Eye,
//   EyeOff,
//   UserCog,
//   UserRound,
//   Clock3,
// } from "lucide-react";
// import {useNavigate} from "react-router-dom";
// import {loginUser} from "../services/auth.service";
// import {Link} from "react-router-dom";

// function Login() {
//   const navigate = useNavigate();

//   const [role, setRole] = useState("admin");

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const [showPassword, setShowPassword] = useState(false);

//   function handleChange(e) {
//     const {name, value} = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   }

//   async function handleSubmit(e) {
//     e.preventDefault();

//     try {
//       const data = await loginUser({
//         email: formData.email,
//         password: formData.password,
//         role: role,
//       });

//       console.log("Login response:", data);

//       // Save authentication data
//       localStorage.setItem("token", data.token);
//       localStorage.setItem("user", JSON.stringify(data.user));

//       // Redirect according to role
//       if (data.user.role === "admin") {
//         navigate("/admin/dashboard");
//       } else {
//         navigate("/employee/dashboard");
//       }
//     } catch (error) {
//       console.error("Login error:", error);

//       alert(
//         error.response?.data?.message ||
//           "Login failed. Please check your email and password.",
//       );
//     }
//   }

//   return (
//     // <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center p-3 sm:p-4">
//       {/* Main Login Container */}
//       {/* <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200"> */}
//       <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
//         <div className="grid grid-cols-1 md:grid-cols-2 min-h-[600px]">
//           {/* ================= LEFT SIDE ================= */}

//           {/* <div className="bg-blue-50 flex flex-col items-center justify-center p-10 text-center"> */}
//           <div className="bg-blue-50 flex flex-col items-center justify-center px-5 py-7 sm:p-10 text-center">
//             {/* Logo */}
//             {/* <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center shadow-md mb-6"> */}
//             <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-600 rounded-2xl flex items-center justify-center shadow-md mb-4 sm:mb-6">
//               {/* <Clock3 size={42} className="text-white" /> */}
//               <Clock3
//                 size={34}
//                 className="text-white sm:w-[42px] sm:h-[42px]"
//               />
//             </div>

//             {/* <h1 className="text-3xl font-bold text-gray-800">ATTENDANCE</h1> */}
//             <h1 className="text-2xl sm:text-3xl font-bold text-gray-800"></h1>

//             {/* <h2 className="text-lg font-semibold text-gray-700 tracking-wide"> */}
//             <h2 className="text-base sm:text-lg font-semibold text-gray-700 tracking-wide">
//               MANAGEMENT SYSTEM
//             </h2>

//             <p className="text-blue-600 font-medium mt-3">
//               {role === "admin" ? "Admin Portal" : "Employee Portal"}
//             </p>

//             {/* Illustration */}
//             {/* <div className="mt-10 w-full flex justify-center">
//     <img
//       src="/attendance-illustration.png"
//       alt="Attendance management illustration"
//       className="w-72 h-56 object-contain"
//     />
//   </div> */}

//             <div className="mt-6 sm:mt-10 w-full flex justify-center">
//               <img
//                 src="/attendance-illustration.png"
//                 alt="Attendance management illustration"
//                 className="w-52 h-40 sm:w-72 sm:h-56 object-contain"
//               />
//             </div>
//           </div>

//           {/* ================= RIGHT SIDE ================= */}

//           {/* <div className="flex items-center justify-center p-8 md:p-12"> */}
//           <div className="flex items-center justify-center px-5 py-8 sm:p-8 md:p-12">
//             <div className="w-full max-w-md">
//               {/* Heading */}
//               <div className="mb-7">
//                 {/* <h2 className="text-2xl font-bold text-gray-800"> */}
//                 <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
//                   Welcome Back! 👋
//                 </h2>

//                 {/* <p className="text-gray-500 mt-1"> */}
//                 <p className="text-sm sm:text-base text-gray-500 mt-1">
//                   Sign in to your {role === "admin" ? "admin" : "employee"}{" "}
//                   account
//                 </p>
//               </div>

//               {/* Role Selector */}
//               <div className="mb-6">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Login As
//                 </label>

//                 <div className="grid grid-cols-2 gap-3">
//                   {/* Admin */}
//                   <button
//                     type="button"
//                     onClick={() => setRole("admin")}
//                     // className={`flex items-center justify-center gap-2 py-3 rounded-lg border font-medium transition ${
//                    className={`flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 sm:py-3 rounded-lg border text-sm sm:text-base font-medium transition ${
//                       role === "admin"
//                         ? "bg-blue-600 text-white border-blue-600"
//                         : "bg-white text-gray-600 border-gray-300 hover:border-blue-400"
//                     }`}
//                   >
//                     <UserCog size={19} />
//                     Admin
//                   </button>

//                   {/* Employee */}
//                   <button
//                     type="button"
//                     onClick={() => setRole("employee")}
//                     className={`flex items-center justify-center gap-2 py-3 rounded-lg border font-medium transition ${
//                       role === "employee"
//                         ? "bg-blue-600 text-white border-blue-600"
//                         : "bg-white text-gray-600 border-gray-300 hover:border-blue-400"
//                     }`}
//                   >
//                     <UserRound size={19} />
//                     Employee
//                   </button>
//                 </div>
//               </div>

//               {/* Login Form */}
//               <form onSubmit={handleSubmit}>
//                 {/* Email */}
//                 <div className="mb-5">
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Email Address
//                   </label>

//                   <div className="relative">
//                     <Mail
//                       size={19}
//                       className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//                     />

//                     <input
//                       type="email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleChange}
//                       placeholder={
//                         role === "admin"
//                           ? "Enter admin email"
//                           : "Enter employee email"
//                       }
//                       autoComplete="username"
//                       required
//                       className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
//                     />
//                   </div>
//                 </div>

//                 {/* Password */}
//                 <div className="mb-5">
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Password
//                   </label>

//                   <div className="relative">
//                     <Lock
//                       size={19}
//                       className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//                     />

//                     <input
//                       type={showPassword ? "text" : "password"}
//                       name="password"
//                       value={formData.password}
//                       onChange={handleChange}
//                       placeholder="Enter password"
//                       autoComplete="current-password"
//                       required
//                       className="w-full border border-gray-300 rounded-lg pl-10 pr-12 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
//                     />

//                     <button
//                       type="button"
//                       onClick={() => setShowPassword(!showPassword)}
//                       className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                     >
//                       {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
//                     </button>
//                   </div>
//                 </div>

//                 {/* Remember + Forgot */}
//                 <div className="flex items-center justify-between mb-6">
//                   <label className="flex items-center gap-2 text-sm text-gray-600">
//                     <input
//                       type="checkbox"
//                       className="w-4 h-4 accent-blue-600"
//                     />
//                     Remember me
//                   </label>
//                   <button
//                     type="button"
//                     onClick={() => navigate("/forgot-password")}
//                     className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
//                   >
//                     Forgot Password?
//                   </button>
//                 </div>

//                 {/* Sign In */}
//                 <button
//                   type="submit"
//                   className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
//                 >
//                   Sign In
//                 </button>
//                 <p className="text-center text-sm text-gray-500 mt-6">
//                   Don't have an admin account?{" "}
//                   <Link
//                     to="/signup"
//                     className="text-blue-600 font-semibold hover:underline"
//                   >
//                     Create Admin Account
//                   </Link>
//                 </p>
//               </form>

//               {/* Footer */}
//               <p className="text-center text-xs text-gray-400 mt-8">
//                 © 2026 Employee Attendance Management System
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;


import { useState } from "react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  UserCog,
  UserRound,
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/auth.service";

function Login() {
  const navigate = useNavigate();

  const [role, setRole] = useState("admin");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const data = await loginUser({
        email: formData.email,
        password: formData.password,
        role: role,
      });

      console.log("Login response:", data);

      // Save authentication data
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirect according to role
      if (data.user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/employee/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);

      alert(
        error.response?.data?.message ||
          "Login failed. Please check your email and password."
      );
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-3 sm:p-4">

      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
<div className="flex flex-col md:flex-row">

          {/* Left Image */}
  <div className="w-full md:w-1/2 bg-blue-50 flex items-center justify-center overflow-hidden">
    <img
      src="/attendance-login.png"
      alt="Attendance Management System"
      className="w-full h-auto object-contain"
    />
  </div>



          {/* Right Login Section */}
          <div className="w-full md:w-1/2 flex items-center justify-center px-5 py-8 sm:p-8 md:p-12">

            <div className="w-full max-w-md">

              {/* Heading */}
              <div className="mb-7">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                  Welcome Back! 👋
                </h2>

                <p className="text-sm sm:text-base text-gray-500 mt-1">
                  Sign in to your{" "}
                  {role === "admin" ? "admin" : "employee"} account
                </p>
              </div>

              {/* Role Selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Login As
                </label>

                <div className="grid grid-cols-2 gap-3">

                  {/* Admin */}
                  <button
                    type="button"
                    onClick={() => setRole("admin")}
                    className={`flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 sm:py-3 rounded-lg border text-sm sm:text-base font-medium transition ${
                      role === "admin"
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-gray-600 border-gray-300 hover:border-blue-400"
                    }`}
                  >
                    <UserCog size={19} />
                    Admin
                  </button>

                  {/* Employee */}
                  <button
                    type="button"
                    onClick={() => setRole("employee")}
                    className={`flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 sm:py-3 rounded-lg border text-sm sm:text-base font-medium transition ${
                      role === "employee"
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-gray-600 border-gray-300 hover:border-blue-400"
                    }`}
                  >
                    <UserRound size={19} />
                    Employee
                  </button>

                </div>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit}>

                {/* Email */}
                <div className="mb-5">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>

                  <div className="relative">
                    <Mail
                      size={19}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={
                        role === "admin"
                          ? "Enter admin email"
                          : "Enter employee email"
                      }
                      autoComplete="username"
                      required
                      className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="mb-5">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>

                  <div className="relative">
                    <Lock
                      size={19}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter password"
                      autoComplete="current-password"
                      required
                      className="w-full border border-gray-300 rounded-lg pl-10 pr-12 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeOff size={19} />
                      ) : (
                        <Eye size={19} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember + Forgot Password */}
                <div className="flex items-center justify-between mb-6">

                  <label className="flex items-center gap-2 text-sm text-gray-600">
                    <input
                      type="checkbox"
                      className="w-4 h-4 accent-blue-600"
                    />
                    Remember me
                  </label>

                  <button
                    type="button"
                    onClick={() => navigate("/forgot-password")}
                    className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
                  >
                    Forgot Password?
                  </button>

                </div>

                {/* Sign In */}
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
                >
                  Sign In
                </button>

                {/* Signup */}
                <p className="text-center text-sm text-gray-500 mt-6">
                  Don't have an admin account?{" "}
                  <Link
                    to="/signup"
                    className="text-blue-600 font-semibold hover:underline"
                  >
                    Create Admin Account
                  </Link>
                </p>

              </form>

              {/* Footer */}
              <p className="text-center text-xs text-gray-400 mt-8">
                © 2026 Employee Attendance Management System
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;