// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// function Signup() {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (formData.password !== formData.confirmPassword) {
//       alert("Passwords do not match");
//       return;
//     }

//     try {
//       setLoading(true);

//       const response = await fetch(
//         `${import.meta.env.VITE_API_URL}/auth/register`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             name: formData.name,
//             email: formData.email,
//             phone: formData.phone,
//             password: formData.password,
//           }),
//         }
//       );

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(
//           data.message || "Failed to create account"
//         );
//       }

//       alert("Admin account created successfully!");

//       navigate("/login");
//     } catch (error) {
//       console.error("Signup error:", error);
//       alert(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-blue-100 flex items-center justify-center p-6">
//       <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8">

//         {/* Header */}
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-800">
//             Create Admin Account
//           </h1>

//           <p className="text-gray-500 mt-2">
//             Register as an administrator
//           </p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-5">

//           {/* Name */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Full Name
//             </label>

//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               placeholder="Enter your full name"
//               required
//               className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           {/* Email */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Email
//             </label>

//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="Enter your email"
//               required
//               className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           {/* Phone */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Phone
//             </label>

//             <input
//               type="tel"
//               name="phone"
//               value={formData.phone}
//               onChange={handleChange}
//               placeholder="Enter phone number"
//               className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           {/* Password */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Password
//             </label>

//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               placeholder="Create a password"
//               required
//               className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           {/* Confirm Password */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Confirm Password
//             </label>

//             <input
//               type="password"
//               name="confirmPassword"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               placeholder="Confirm your password"
//               required
//               className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           {/* Button */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-400"
//           >
//             {loading
//               ? "Creating Account..."
//               : "Create Admin Account"}

               
//           </button>

//         </form>

//         {/* Login Link */}
//         <p className="text-center text-sm text-gray-500 mt-6">
//           Already have an account?{" "}
//           <Link
//             to="/"
//             className="text-blue-600 font-semibold hover:underline"
//           >
//             Login
            
//           </Link>
//         </p>

//       </div>
//     </div>
//   );
// }

// export default Signup;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  // Show / hide password
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = formData.name.trim();
    const email = formData.email.trim();
    const phone = formData.phone.trim();
    const password = formData.password;
    const confirmPassword = formData.confirmPassword;

    // =========================
    // NAME VALIDATION
    // =========================

    if (!name) {
      alert("Please enter your full name.");
      return;
    }

    if (name.length < 3) {
      alert("Full name must contain at least 3 characters.");
      return;
    }

    if (!/^[A-Za-z\s]+$/.test(name)) {
      alert("Full name can contain only letters and spaces.");
      return;
    }

    // =========================
    // EMAIL VALIDATION
    // =========================

    if (!email) {
      alert("Please enter your email address.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // =========================
    // PHONE VALIDATION
    // =========================

    if (phone && !/^[6-9]\d{9}$/.test(phone)) {
      alert("Please enter a valid 10-digit Indian mobile number.");
      return;
    }

    // =========================
    // PASSWORD VALIDATION
    // =========================

    if (!password) {
      alert("Please enter a password.");
      return;
    }

    if (password.length < 8) {
      alert("Password must be at least 8 characters long.");
      return;
    }

    if (!/[A-Z]/.test(password)) {
      alert("Password must contain at least one uppercase letter.");
      return;
    }

    if (!/[a-z]/.test(password)) {
      alert("Password must contain at least one lowercase letter.");
      return;
    }

    if (!/[0-9]/.test(password)) {
      alert("Password must contain at least one number.");
      return;
    }

    if (!/[!@#$%^&*(),.?":{}|<>_\-\\[\]/;'`~+=]/.test(password)) {
      alert("Password must contain at least one special character.");
      return;
    }

    // =========================
    // CONFIRM PASSWORD
    // =========================

    if (!confirmPassword) {
      alert("Please confirm your password.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    // =========================
    // CREATE ACCOUNT
    // =========================

    try {
      setLoading(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            phone,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to create account"
        );
      }

      alert("Admin account created successfully!");

      navigate("/login");
    } catch (error) {
      console.error("Signup error:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-100 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Create Admin Account
          </h1>

          <p className="text-gray-500 mt-2">
            Register as an administrator
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone
            </label>

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter 10-digit phone number"
              maxLength={10}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-12 outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600"
                aria-label={
                  showPassword
                    ? "Hide password"
                    : "Show password"
                }
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>

            <p className="text-xs text-gray-500 mt-2">
              Minimum 8 characters with uppercase, lowercase,
              number and special character.
            </p>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>

            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-12 outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600"
                aria-label={
                  showConfirmPassword
                    ? "Hide confirm password"
                    : "Show confirm password"
                }
              >
                {showConfirmPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-400"
          >
            {loading
              ? "Creating Account..."
              : "Create Admin Account"}
          </button>

        </form>

        {/* Login Link */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}

          <Link
            to="/"
            className="text-blue-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Signup;