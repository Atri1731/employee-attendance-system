// import { useState } from "react";

// function Profile() {
//   const [formData, setFormData] = useState({
//     employeeId: "",
//     name: "",
//     email: "",
//     phone: "",
//     department: "",
//     designation: "",
//     joiningDate: "",
//   });

//   function handleChange(e) {
//     const { name, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   }

//   function handleSubmit(e) {
//     e.preventDefault();

//     // Backend connection will be added later.
//     console.log(formData);
//   }

//   return (
//     <div className="p-6 min-h-screen bg-blue-100">

//       {/* Page Header */}
//       <div className="mb-6 ">
//         <h1 className="text-2xl font-bold text-gray-800 text-center">
//           My Profile
//         </h1>

//         <p className="text-gray-500 mt-1 text-center" >
//           View and manage your personal information.
//         </p>
//       </div>

//       {/* Profile Form */}
//       <div className="bg-white border border-gray-200 rounded-xl p-6 max-w-4xl mx-auto">

//         <form onSubmit={handleSubmit}>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

//             {/* Employee ID */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Employee ID
//               </label>

//               <input
//                 type="text"
//                 name="employeeId"
//                 value={formData.employeeId}
//                 onChange={handleChange}
//                 placeholder="Employee ID"
//                 className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             {/* Full Name */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Full Name
//               </label>

//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 placeholder="Enter your full name"
//                 className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             {/* Email */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Email
//               </label>

//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="Enter your email"
//                 className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             {/* Phone */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Phone
//               </label>

//               <input
//                 type="tel"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 placeholder="Enter your phone number"
//                 className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             {/* Department */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Department
//               </label>

//               <select
//                 name="department"
//                 value={formData.department}
//                 onChange={handleChange}
//                 className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="">Select department</option>
//                 <option value="IT">IT</option>
//                 <option value="HR">HR</option>
//                 <option value="Sales">Sales</option>
//                 <option value="Marketing">Marketing</option>
//                 <option value="Finance">Finance</option>
//               </select>
//             </div>

//             {/* Designation */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Designation
//               </label>

//               <input
//                 type="text"
//                 name="designation"
//                 value={formData.designation}
//                 onChange={handleChange}
//                 placeholder="Enter your designation"
//                 className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             {/* Joining Date */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Joining Date
//               </label>

//               <input
//                 type="date"
//                 name="joiningDate"
//                 value={formData.joiningDate}
//                 onChange={handleChange}
//                 className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//           </div>

//           {/* Buttons */}
//           <div className="flex gap-3 mt-8">

//             <button
//               type="submit"
//               className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
//             >
//               Save Changes
//             </button>

//             <button
//               type="button"
//               onClick={() =>
//                 setFormData({
//                   employeeId: "",
//                   name: "",
//                   email: "",
//                   phone: "",
//                   department: "",
//                   designation: "",
//                   joiningDate: "",
//                 })
//               }
//               className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-semibold transition"
//             >
//               Clear
//             </button>

//           </div>

//         </form>

//       </div>

//     </div>
//   );
// }

// export default Profile;

import { useEffect, useState } from "react";

function Profile() {
  const [formData, setFormData] = useState({
    employeeId: "",
    name: "",
    email: "",
    phone: "",
    department: "",
    designation: "",
    joiningDate: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Fetch profile
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/employees/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch profile"
        );
      }

      const employee = data.employee;

      setFormData({
        employeeId: employee.employeeId || "",
        name: employee.name || "",
        email: employee.email || "",
        phone: employee.phone || "",
        department: employee.department || "",
        designation: employee.designation || "",
        joiningDate: employee.joiningDate
          ? new Date(employee.joiningDate)
              .toISOString()
              .split("T")[0]
          : "",
      });
    } catch (error) {
      console.error("Fetch profile error:", error);

      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle input
  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // Save profile
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/employees/me",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update profile"
        );
      }

      setFormData((prev) => ({
        ...prev,
        name: data.employee.name,
        email: data.employee.email,
        phone: data.employee.phone || "",
      }));

      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Update profile error:", error);

      alert(error.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-blue-100">

      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 text-center">
          My Profile
        </h1>

        <p className="text-gray-500 mt-1 text-center">
          View and manage your personal information.
        </p>
      </div>

      {/* Profile Form */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 max-w-4xl mx-auto">

        {loading ? (
          <div className="py-16 text-center text-gray-500">
            Loading profile...
          </div>
        ) : (
          <form onSubmit={handleSubmit}>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* Employee ID */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Employee ID
                </label>

                <input
                  type="text"
                  name="employeeId"
                  value={formData.employeeId}
                  readOnly
                  className="w-full border border-gray-300 bg-gray-100 rounded-lg px-4 py-3 outline-none text-gray-600 cursor-not-allowed"
                />
              </div>

              {/* Full Name */}
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
                  placeholder="Enter your phone number"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Department */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Department
                </label>

                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  readOnly
                  className="w-full border border-gray-300 bg-gray-100 rounded-lg px-4 py-3 outline-none text-gray-600 cursor-not-allowed"
                />
              </div>

              {/* Designation */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Designation
                </label>

                <input
                  type="text"
                  name="designation"
                  value={formData.designation}
                  readOnly
                  className="w-full border border-gray-300 bg-gray-100 rounded-lg px-4 py-3 outline-none text-gray-600 cursor-not-allowed"
                />
              </div>

              {/* Joining Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Joining Date
                </label>

                <input
                  type="date"
                  name="joiningDate"
                  value={formData.joiningDate}
                  readOnly
                  className="w-full border border-gray-300 bg-gray-100 rounded-lg px-4 py-3 outline-none text-gray-600 cursor-not-allowed"
                />
              </div>

            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-8">

              <button
                type="submit"
                disabled={saving}
                className={`bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition ${
                  saving
                    ? "opacity-60 cursor-not-allowed"
                    : ""
                }`}
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>

              <button
                type="button"
                onClick={fetchProfile}
                disabled={loading || saving}
                className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-semibold transition"
              >
                Reset
              </button>

            </div>

          </form>
        )}

      </div>

    </div>
  );
}

export default Profile;