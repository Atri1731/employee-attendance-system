// import {useState} from "react";
// import {useNavigate} from "react-router-dom";

// function AddEmployee() {
//   const navigate = useNavigate();

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
//     const {name, value} = e.target;

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
//     <div className="p-6 bg-blue-100 min-h-screen">
//       {/* Header */}
//       <div className="mb-6 text-center">
//         <h1 className="text-2xl font-bold text-gray-800 ">Add Employee</h1>

//         <p className="text-gray-500 mt-1">
//           Add a new employee to the organization.
//         </p>
//       </div>

//       {/* Form */}
//       <div className="bg-white border border-gray-200 rounded-xl p-6 max-w-4xl mx-auto">
//         <form onSubmit={handleSubmit}>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//             {/* Employee ID */}
//             <FormInput
//               label="Employee ID"
//               name="employeeId"
//               value={formData.employeeId}
//               onChange={handleChange}
//               placeholder="Enter employee ID"
//               required
//             />

//             {/* Name */}
//             <FormInput
//               label="Full Name"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               placeholder="Enter full name"
//               required
//             />

//             {/* Email */}
//             <FormInput
//               label="Email"
//               name="email"
//               type="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="Enter email address"
//               required
//             />

//             {/* Phone */}
//             <FormInput
//               label="Phone"
//               name="phone"
//               value={formData.phone}
//               onChange={handleChange}
//               placeholder="Enter phone number"
//               required
//             />

//             {/* Department */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Department
//               </label>

//               <select
//                 name="department"
//                 value={formData.department}
//                 onChange={handleChange}
//                 required
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
//             <FormInput
//               label="Designation"
//               name="designation"
//               value={formData.designation}
//               onChange={handleChange}
//               placeholder="Enter designation"
//               required
//             />

//             {/* Joining Date */}
//             <FormInput
//               label="Joining Date"
//               name="joiningDate"
//               type="date"
//               value={formData.joiningDate}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           {/* Buttons */}
//           <div className="flex gap-3 mt-8">
//             <button
//               type="submit"
//               className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
//             >
//               Add Employee
//             </button>

//             <button
//               type="button"
//               onClick={() => navigate("/admin/employees")}
//               className="border border-gray-300 hover:bg-gray-50 px-6 py-3 rounded-lg font-semibold transition"
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// function FormInput({
//   label,
//   name,
//   type = "text",
//   value,
//   onChange,
//   placeholder,
//   required,
// }) {
//   return (
//     <div>
//       <label className="block text-sm font-medium text-gray-700 mb-2">
//         {label}
//       </label>

//       <input
//         type={type}
//         name={name}
//         value={value}
//         onChange={onChange}
//         placeholder={placeholder}
//         required={required}
//         className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//       />
//     </div>
//   );
// }

// export default AddEmployee;

import { useEffect, useState } from "react";

function AddEmployee() {
  const [formData, setFormData] = useState({
    employeeId: "",
    name: "",
    email: "",
    password: "",
    phone: "",
    department: "",
    designation: "",
    joiningDate: "",
  });

  const [loading, setLoading] = useState(false);

const [departments, setDepartments] = useState([]);
const [departmentLoading, setDepartmentLoading] = useState(true);

useEffect(() => {
  fetchDepartments();
}, []);

const fetchDepartments = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      "http://localhost:5000/api/departments",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Failed to fetch departments"
      );
    }

    // Only show active departments
    const activeDepartments = (data.departments || []).filter(
      (department) => department.status === "active"
    );

    setDepartments(activeDepartments);
  } catch (error) {
    console.error(
      "Fetch departments error:",
      error
    );
  } finally {
    setDepartmentLoading(false);
  }
};

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/employees",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to add employee"
        );
      }

      alert("Employee added successfully!");

      // Clear form
      setFormData({
        employeeId: "",
        name: "",
        email: "",
        password: "",
        phone: "",
        department: "",
        designation: "",
        joiningDate: "",
      });
    } catch (error) {
      console.error("Add employee error:", error);

      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-blue-100">

      {/* Page Header */}
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-gray-800">
          Add Employee
        </h1>

        <p className="text-gray-500 mt-1">
          Add a new employee to the organization.
        </p>
      </div>

      {/* Form */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 max-w-4xl mx-auto">

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
                onChange={handleChange}
                placeholder="Enter employee ID"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
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
                placeholder="Enter full name"
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
                placeholder="Enter email"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create password"
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
                placeholder="Enter phone number"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Department */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Department
              </label>

  <select
  name="department"
  value={formData.department}
  onChange={handleChange}
  required
  disabled={departmentLoading}
  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
>
  <option value="">
    {departmentLoading
      ? "Loading departments..."
      : "Select department"}
  </option>

  {departments.map((department) => (
    <option
      key={department._id}
      value={department.name}
    >
      {department.name}
    </option>
  ))}
</select>
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
                onChange={handleChange}
                placeholder="Enter designation"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
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
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-8">

            <button
              type="submit"
              disabled={loading}
              className={`bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition ${
                loading
                  ? "opacity-60 cursor-not-allowed"
                  : ""
              }`}
            >
              {loading ? "Adding..." : "Add Employee"}
            </button>

            <button
              type="button"
              onClick={() =>
                setFormData({
                  employeeId: "",
                  name: "",
                  email: "",
                  password: "",
                  phone: "",
                  department: "",
                  designation: "",
                  joiningDate: "",
                })
              }
              className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-semibold transition"
            >
              Clear
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default AddEmployee;