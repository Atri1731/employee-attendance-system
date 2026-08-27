// import {useEffect, useState} from "react";
// import {Search, Plus, Pencil, Trash2, Users, X} from "lucide-react";
// import {useNavigate} from "react-router-dom";
// import EmployeeAttendanceChart from "../../components/EmployeeAttendanceChart";

// const Employees = () => {
//   const navigate = useNavigate();
//   const [selectedEmployee, setSelectedEmployee] = useState(null);
//   const [employees, setEmployees] = useState([]);
//   const [search, setSearch] = useState("");
//   const [departmentFilter, setDepartmentFilter] = useState("");
// const [statusFilter, setStatusFilter] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const [departments, setDepartments] = useState([]);
//   const [departmentLoading, setDepartmentLoading] = useState(true);
//   const fetchDepartments = async () => {
//     try {
//       setDepartmentLoading(true);

//       const token = localStorage.getItem("token");

//       const response = await fetch(
//   `${import.meta.env.VITE_API_URL}/departments`,
//   {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || "Failed to fetch departments");
//       }

//       const activeDepartments = (data.departments || []).filter(
//         (department) => department.status === "active",
//       );

//       setDepartments(activeDepartments);
//     } catch (error) {
//       console.error("Fetch departments error:", error);
//     } finally {
//       setDepartmentLoading(false);
//     }
//   };

//   // Edit modal
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [editingEmployee, setEditingEmployee] = useState(null);
//   const [editLoading, setEditLoading] = useState(false);

//   // Get employees
//   const fetchEmployees = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       const token = localStorage.getItem("token");

//      const response = await fetch(
//   `${import.meta.env.VITE_API_URL}/employees`,
//   {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || "Failed to fetch employees");
//       }

//       setEmployees(data.employees || []);
//     } catch (error) {
//       console.error("Fetch employees error:", error);
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchEmployees();
//     fetchDepartments();
//   }, []);

//   // Search
//  const filteredEmployees = employees.filter((employee) => {
//   const searchText = search.toLowerCase();

//   const matchesSearch =
//     employee.name?.toLowerCase().includes(searchText) ||
//     employee.employeeId?.toLowerCase().includes(searchText) ||
//     employee.email?.toLowerCase().includes(searchText) ||
//     employee.department?.toLowerCase().includes(searchText) ||
//     employee.designation?.toLowerCase().includes(searchText);

//   const matchesDepartment =
//     !departmentFilter ||
//     employee.department === departmentFilter;

//   const matchesStatus =
//     !statusFilter ||
//     employee.status === statusFilter;

//   return (
//     matchesSearch &&
//     matchesDepartment &&
//     matchesStatus
//   );
// });

//   // =========================
//   // EDIT EMPLOYEE
//   // =========================

//   const handleEditClick = (employee) => {
//     setEditingEmployee({
//       ...employee,
//     });

//     setShowEditModal(true);
//   };

//   const handleEditChange = (e) => {
//     const {name, value} = e.target;

//     setEditingEmployee((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleUpdateEmployee = async (e) => {
//     e.preventDefault();

//     try {
//       setEditLoading(true);

//       const token = localStorage.getItem("token");

//       // console.log("TOKEN:", token);
//       // console.log("EMPLOYEE:", editingEmployee);

//       const url = `${import.meta.env.VITE_API_URL}/employees/${editingEmployee._id}`;

//       // console.log("UPDATE URL:", url);

//       const body = {
//         name: editingEmployee.name,
//         phone: editingEmployee.phone,
//         department: editingEmployee.department,
//         designation: editingEmployee.designation,
//         status: editingEmployee.status,
//       };

//       // console.log("UPDATE BODY:", body);

//       const response = await fetch(url, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(body),
//       });

//       // console.log("STATUS:", response.status);

//       const data = await response.json();

//       // console.log("RESPONSE:", data);

//       if (!response.ok) {
//         throw new Error(data.message || "Update failed");
//       }

//       setEmployees((prevEmployees) =>
//         prevEmployees.map((employee) =>
//           employee._id === editingEmployee._id
//             ? {
//                 ...employee,
//                 ...data.employee,
//                 _id: employee._id,
//               }
//             : employee,
//         ),
//       );

//       setShowEditModal(false);
//       setEditingEmployee(null);

//       alert("Employee updated successfully!");
//     } catch (error) {
//       console.error("UPDATE ERROR:", error);
//       alert(error.message);
//     } finally {
//       setEditLoading(false);
//     }
//   };

//   // =========================
//   // DELETE EMPLOYEE
//   // =========================

//   const handleDelete = async (employeeId) => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this employee?",
//     );

//     if (!confirmDelete) {
//       return;
//     }

//     try {
//       const token = localStorage.getItem("token");

//       const response = await fetch(
//       `${import.meta.env.VITE_API_URL}/employees/${employeeId}`,
//         {
//           method: "DELETE",

          
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || "Failed to delete employee");
//       }

//       // Remove employee from frontend
//       setEmployees((prevEmployees) =>
//         prevEmployees.filter((employee) => employee._id !== employeeId),
//       );

//       alert("Employee deleted successfully!");
//     } catch (error) {
//       console.error("Delete employee error:", error);
//       alert(error.message);
//     }
//   };

//   return (
//     <div className="p-6 bg-blue-100 min-h-screen">
//       {/* Header */}
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-800">Employees</h1>

//           <p className="text-gray-500 mt-1">Manage your employees</p>
//         </div>

//         <button
//           onClick={() => navigate("/admin/employee/add")}
//           className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg transition"
//         >
//           <Plus size={20} />
//           Add Employee
//         </button>
//       </div>

//       {/* Search */}
//     {/* Search & Filters */}
// <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
//   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

//     {/* Search */}
//     <div className="relative">
//       <Search
//         size={20}
//         className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//       />

//       <input
//         type="text"
//         placeholder="Search employees..."
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//         className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
//       />
//     </div>

//     {/* Department Filter */}
//     <select
//       value={departmentFilter}
//       onChange={(e) => setDepartmentFilter(e.target.value)}
//       className="w-full border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
//     >
//       <option value="">All Departments</option>

//       {departments.map((department) => (
//         <option
//           key={department._id}
//           value={department.name}
//         >
//           {department.name}
//         </option>
//       ))}
//     </select>

//     {/* Status Filter */}
//     <select
//       value={statusFilter}
//       onChange={(e) => setStatusFilter(e.target.value)}
//       className="w-full border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
//     >
//       <option value="">All Status</option>
//       <option value="active">Active</option>
//       <option value="inactive">Inactive</option>
//     </select>

//   </div>
// </div>

//       {/* Loading */}
//       {loading && (
//         <div className="bg-white rounded-xl border border-gray-100 p-10 text-center">
//           <p className="text-gray-500">Loading employees...</p>
//         </div>
//       )}

//       {/* Error */}
//       {!loading && error && (
//         <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-4">
//           {error}
//         </div>
//       )}

//       {/* Employee Table */}
//       {!loading && !error && (
//         <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
//           {filteredEmployees.length === 0 ? (
//             <div className="flex flex-col items-center justify-center py-16">
//               <Users size={48} className="text-gray-300 mb-3" />

//               <h3 className="text-lg font-semibold text-gray-700">
//                 No employees found
//               </h3>

//               <p className="text-gray-400 mt-1">
//                 {search
//                   ? "Try a different search."
//                   : "Add your first employee."}
//               </p>
//             </div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="min-w-[900px] w-full">
//                 <thead className="bg-gray-50 border-b">
//                   <tr>
//                     <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
//                       Employee
//                     </th>

//                     <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
//                       Email
//                     </th>

//                     <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
//                       Department
//                     </th>

//                     <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
//                       Designation
//                     </th>

//                     <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
//                       Joining Date
//                     </th>

//                     <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
//                       Status
//                     </th>

//                     <th className="text-center px-6 py-4 text-sm font-semibold text-gray-600">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>

//                 <tbody className="divide-y divide-gray-100">
//                   {filteredEmployees.map((employee) => (
//                    <tr
//   key={employee._id}
//   onClick={() => setSelectedEmployee(employee)}
//   className="hover:bg-blue-50 transition cursor-pointer"
// >
//                       <td className="px-6 py-4">
//                         <div>
//                           <p className="font-semibold text-gray-800">
//                             {employee.name}
//                           </p>

//                           <p className="text-sm text-gray-400">
//                             {employee.employeeId}
//                           </p>
//                         </div>
//                       </td>

//                       <td className="px-6 py-4 text-gray-600">
//                         {employee.email}
//                       </td>

//                       <td className="px-6 py-4 text-gray-600">
//                         {employee.department || "—"}
//                       </td>

//                       <td className="px-6 py-4 text-gray-600">
//                         {employee.designation || "—"}
//                       </td>
//                       <td className="px-6 py-4 text-gray-600">
//   {employee.joiningDate
//     ? new Date(employee.joiningDate).toLocaleDateString("en-GB")
//     : "—"}
// </td>

//                       <td className="px-6 py-4">
//                         <span
//                           className={`px-3 py-1 rounded-full text-xs font-medium ${
//                             employee.status === "active"
//                               ? "bg-green-100 text-green-700"
//                               : "bg-gray-100 text-gray-600"
//                           }`}
//                         >
//                           {employee.status}
//                         </span>
//                       </td>

//                       {/* ACTIONS */}
//                       <td className="px-6 py-4">
//                         <div className="flex items-center justify-center gap-2">
//                           {/* EDIT */}
//                        <button
//   onClick={(e) => {
//     e.stopPropagation();
//     handleEditClick(employee);
//   }}
//   className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
//   title="Edit"
// >
//   <Pencil size={18} />
// </button>
//                           {/* DELETE */}
//                           {/* <button
//                             onClick={() => handleDelete(employee._id)}
//                             className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
//                             title="Delete"
//                           >
//                             <Trash2 size={18} />
//                           </button> */}
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       )}

//       {/* ========================= */}
//       {/* EDIT EMPLOYEE MODAL */}
//       {/* ========================= */}

//       {showEditModal && editingEmployee && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-xl shadow-xl w-full max-w-lg">
//             {/* Modal Header */}
//             <div className="flex items-center justify-between px-6 py-4 border-b">
//               <div>
//                 <h2 className="text-xl font-bold text-gray-800">
//                   Edit Employee
//                 </h2>

//                 <p className="text-sm text-gray-500 mt-1">
//                   Update employee information
//                 </p>
//               </div>

//               <button
//                 type="button"
//                 onClick={() => {
//                   setShowEditModal(false);
//                   setEditingEmployee(null);
//                 }}
//                 className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
//               >
//                 <X size={20} />
//               </button>
//             </div>

//             {/* Modal Form */}
//             <form onSubmit={handleUpdateEmployee} className="p-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {/* Name */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Full Name
//                   </label>

//                   <input
//                     type="text"
//                     name="name"
//                     value={editingEmployee.name || ""}
//                     onChange={handleEditChange}
//                     required
//                     className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>

//                 {/* Phone */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Phone
//                   </label>

//                   <input
//                     type="text"
//                     name="phone"
//                     value={editingEmployee.phone || ""}
//                     onChange={handleEditChange}
//                     className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>

//                 {/* Department */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Department
//                   </label>

//                   <select
//                     name="department"
//                     value={editingEmployee.department || ""}
//                     onChange={handleEditChange}
//                     className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
//                   >
//                     <option value="">
//                       {departmentLoading
//                         ? "Loading departments..."
//                         : "Select department"}
//                     </option>

//                     {departments.map((department) => (
//                       <option key={department._id} value={department.name}>
//                         {department.name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 {/* Designation */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Designation
//                   </label>

//                   <input
//                     type="text"
//                     name="designation"
//                     value={editingEmployee.designation || ""}
//                     onChange={handleEditChange}
//                     className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>

//                 {/* Status */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Status
//                   </label>

//                   <select
//                     name="status"
//                     value={editingEmployee.status || "active"}
//                     onChange={handleEditChange}
//                     className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
//                   >
//                     <option value="active">Active</option>
//                     <option value="inactive">Inactive</option>
//                   </select>
//                 </div>
//               </div>

//               {/* Buttons */}
//               <div className="flex justify-end gap-3 mt-6">
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setShowEditModal(false);
//                     setEditingEmployee(null);
//                   }}
//                   className="px-5 py-2.5 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50"
//                 >
//                   Cancel
//                 </button>

//                 <button
//                   type="submit"
//                   disabled={editLoading}
//                   className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white rounded-lg font-semibold"
//                 >
//                   {editLoading ? "Updating..." : "Update Employee"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
// {selectedEmployee && (
//   <EmployeeAttendanceChart
//     employee={selectedEmployee}
//     attendance={attendance}
//     leaves={leaves}
//     onClose={() => setSelectedEmployee(null)}
//   />
// )}
//     </div>
//   );
// };

// export default Employees;


import { useEffect, useState } from "react";
import {
  Search,
  Plus,
  Pencil,
  Users,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import EmployeeAttendanceChart from "../../components/EmployeeAttendanceChart";

const Employees = () => {
  const navigate = useNavigate();

  // =====================================
  // STATES
  // =====================================

  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [leaves, setLeaves] = useState([]);

  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [departments, setDepartments] = useState([]);
  const [departmentLoading, setDepartmentLoading] = useState(true);

  // =====================================
  // EDIT EMPLOYEE STATES
  // =====================================

  const [showEditModal, setShowEditModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [editLoading, setEditLoading] = useState(false);

  // =====================================
  // FETCH DEPARTMENTS
  // =====================================

  const fetchDepartments = async () => {
    try {
      setDepartmentLoading(true);

      const token = localStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/departments`,
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

      const activeDepartments = (
        data.departments || []
      ).filter(
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

  // =====================================
  // FETCH EMPLOYEES
  // =====================================

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/employees`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch employees"
        );
      }

      setEmployees(data.employees || []);
    } catch (error) {
      console.error(
        "Fetch employees error:",
        error
      );

      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // FETCH ATTENDANCE
  // =====================================

  const fetchAttendance = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/attendance`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch attendance"
        );
      }

      setAttendance(data.attendance || []);
    } catch (error) {
      console.error(
        "Fetch attendance error:",
        error
      );

      setAttendance([]);
    }
  };

  // =====================================
  // FETCH LEAVES
  // =====================================

  const fetchLeaves = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/leaves`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch leaves"
        );
      }

      setLeaves(data.leaves || []);
    } catch (error) {
      console.error(
        "Fetch leaves error:",
        error
      );

      setLeaves([]);
    }
  };

  // =====================================
  // INITIAL LOAD
  // =====================================

  useEffect(() => {
    fetchEmployees();
    fetchDepartments();
    fetchAttendance();
    fetchLeaves();
  }, []);

  // =====================================
  // SEARCH + FILTER
  // =====================================

  const filteredEmployees = employees.filter(
    (employee) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        employee.name
          ?.toLowerCase()
          .includes(searchText) ||
        employee.employeeId
          ?.toLowerCase()
          .includes(searchText) ||
        employee.email
          ?.toLowerCase()
          .includes(searchText) ||
        employee.department
          ?.toLowerCase()
          .includes(searchText) ||
        employee.designation
          ?.toLowerCase()
          .includes(searchText);

      const matchesDepartment =
        !departmentFilter ||
        employee.department === departmentFilter;

      const matchesStatus =
        !statusFilter ||
        employee.status === statusFilter;

      return (
        matchesSearch &&
        matchesDepartment &&
        matchesStatus
      );
    }
  );

  // =====================================
  // EDIT EMPLOYEE
  // =====================================

  const handleEditClick = (employee) => {
    setEditingEmployee({
      ...employee,
    });

    setShowEditModal(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;

    setEditingEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateEmployee = async (e) => {
    e.preventDefault();

    try {
      setEditLoading(true);

      const token = localStorage.getItem("token");

      const url = `${import.meta.env.VITE_API_URL}/employees/${editingEmployee._id}`;

      const body = {
        name: editingEmployee.name,
        phone: editingEmployee.phone,
        department: editingEmployee.department,
        designation: editingEmployee.designation,
        status: editingEmployee.status,
      };

      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Update failed"
        );
      }

      setEmployees((prevEmployees) =>
        prevEmployees.map((employee) =>
          employee._id === editingEmployee._id
            ? {
                ...employee,
                ...data.employee,
                _id: employee._id,
              }
            : employee
        )
      );

      setShowEditModal(false);
      setEditingEmployee(null);

      alert("Employee updated successfully!");
    } catch (error) {
      console.error(
        "UPDATE ERROR:",
        error
      );

      alert(error.message);
    } finally {
      setEditLoading(false);
    }
  };

  // =====================================
  // DELETE EMPLOYEE
  // =====================================

  const handleDelete = async (employeeId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/employees/${employeeId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to delete employee"
        );
      }

      setEmployees((prevEmployees) =>
        prevEmployees.filter(
          (employee) =>
            employee._id !== employeeId
        )
      );

      alert("Employee deleted successfully!");
    } catch (error) {
      console.error(
        "Delete employee error:",
        error
      );

      alert(error.message);
    }
  };

  // =====================================
  // UI
  // =====================================

  return (
    <div className="p-6 bg-blue-100 min-h-screen">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Employees
          </h1>

          <p className="text-gray-500 mt-1">
            Manage your employees
          </p>
        </div>

        <button
          onClick={() =>
            navigate("/admin/employee/add")
          }
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg transition"
        >
          <Plus size={20} />
          Add Employee
        </button>

      </div>

      {/* SEARCH + FILTERS */}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* SEARCH */}

          <div className="relative">

            <Search
              size={20}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search employees..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          {/* DEPARTMENT */}

          <select
            value={departmentFilter}
            onChange={(e) =>
              setDepartmentFilter(
                e.target.value
              )
            }
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
          >

            <option value="">
              All Departments
            </option>

            {departments.map(
              (department) => (
                <option
                  key={department._id}
                  value={department.name}
                >
                  {department.name}
                </option>
              )
            )}

          </select>

          {/* STATUS */}

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(
                e.target.value
              )
            }
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
          >

            <option value="">
              All Status
            </option>

            <option value="active">
              Active
            </option>

            <option value="inactive">
              Inactive
            </option>

          </select>

        </div>

      </div>

      {/* LOADING */}

      {loading && (
        <div className="bg-white rounded-xl border border-gray-100 p-10 text-center">

          <p className="text-gray-500">
            Loading employees...
          </p>

        </div>
      )}

      {/* ERROR */}

      {!loading && error && (
        <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-4">
          {error}
        </div>
      )}

      {/* EMPLOYEE TABLE */}

      {!loading && !error && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">

          {filteredEmployees.length === 0 ? (

            <div className="flex flex-col items-center justify-center py-16">

              <Users
                size={48}
                className="text-gray-300 mb-3"
              />

              <h3 className="text-lg font-semibold text-gray-700">
                No employees found
              </h3>

              <p className="text-gray-400 mt-1">
                {search
                  ? "Try a different search."
                  : "Add your first employee."}
              </p>

            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="min-w-[900px] w-full">

                <thead className="bg-gray-50 border-b">

                  <tr>

                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                      Employee
                    </th>

                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                      Email
                    </th>

                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                      Department
                    </th>

                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                      Designation
                    </th>

                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                      Joining Date
                    </th>

                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                      Status
                    </th>

                    <th className="text-center px-6 py-4 text-sm font-semibold text-gray-600">
                      Actions
                    </th>

                  </tr>

                </thead>

                <tbody className="divide-y divide-gray-100">

                  {filteredEmployees.map(
                    (employee) => (

                      <tr
                        key={employee._id}

                        onClick={() =>
                          setSelectedEmployee(
                            employee
                          )
                        }

                        className="hover:bg-blue-50 transition cursor-pointer"
                      >

                        {/* EMPLOYEE */}

                        <td className="px-6 py-4">

                          <div>

                            <p className="font-semibold text-gray-800">
                              {employee.name}
                            </p>

                            <p className="text-sm text-gray-400">
                              {employee.employeeId}
                            </p>

                          </div>

                        </td>

                        {/* EMAIL */}

                        <td className="px-6 py-4 text-gray-600">
                          {employee.email}
                        </td>

                        {/* DEPARTMENT */}

                        <td className="px-6 py-4 text-gray-600">
                          {employee.department ||
                            "—"}
                        </td>

                        {/* DESIGNATION */}

                        <td className="px-6 py-4 text-gray-600">
                          {employee.designation ||
                            "—"}
                        </td>

                        {/* JOINING DATE */}

                        <td className="px-6 py-4 text-gray-600">

                          {employee.joiningDate
                            ? new Date(
                                employee.joiningDate
                              ).toLocaleDateString(
                                "en-GB"
                              )
                            : "—"}

                        </td>

                        {/* STATUS */}

                        <td className="px-6 py-4">

                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              employee.status ===
                              "active"
                                ? "bg-green-100 text-green-700"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {employee.status}
                          </span>

                        </td>

                        {/* ACTIONS */}

                        <td className="px-6 py-4">

                          <div className="flex items-center justify-center gap-2">

                            {/* EDIT */}

                            <button
                              onClick={(e) => {
                                e.stopPropagation();

                                handleEditClick(
                                  employee
                                );
                              }}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                              title="Edit"
                            >
                              <Pencil size={18} />
                            </button>

                          </div>

                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          )}

        </div>
      )}

      {/* ===================================== */}
      {/* EDIT EMPLOYEE MODAL */}
      {/* ===================================== */}

      {showEditModal &&
        editingEmployee && (

          <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">

            <div className="bg-white rounded-xl shadow-xl w-full max-w-lg">

              {/* HEADER */}

              <div className="flex items-center justify-between px-6 py-4 border-b">

                <div>

                  <h2 className="text-xl font-bold text-gray-800">
                    Edit Employee
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    Update employee information
                  </p>

                </div>

                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    setEditingEmployee(null);
                  }}
                  className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
                >
                  <X size={20} />
                </button>

              </div>

              {/* FORM */}

              <form
                onSubmit={
                  handleUpdateEmployee
                }
                className="p-6"
              >

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  {/* NAME */}

                  <div>

                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>

                    <input
                      type="text"
                      name="name"
                      value={
                        editingEmployee.name ||
                        ""
                      }
                      onChange={
                        handleEditChange
                      }
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
                    />

                  </div>

                  {/* PHONE */}

                  <div>

                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone
                    </label>

                    <input
                      type="text"
                      name="phone"
                      value={
                        editingEmployee.phone ||
                        ""
                      }
                      onChange={
                        handleEditChange
                      }
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
                    />

                  </div>

                  {/* DEPARTMENT */}

                  <div>

                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Department
                    </label>

                    <select
                      name="department"
                      value={
                        editingEmployee.department ||
                        ""
                      }
                      onChange={
                        handleEditChange
                      }
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
                    >

                      <option value="">
                        {departmentLoading
                          ? "Loading departments..."
                          : "Select department"}
                      </option>

                      {departments.map(
                        (department) => (

                          <option
                            key={
                              department._id
                            }
                            value={
                              department.name
                            }
                          >
                            {department.name}
                          </option>

                        )
                      )}

                    </select>

                  </div>

                  {/* DESIGNATION */}

                  <div>

                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Designation
                    </label>

                    <input
                      type="text"
                      name="designation"
                      value={
                        editingEmployee.designation ||
                        ""
                      }
                      onChange={
                        handleEditChange
                      }
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
                    />

                  </div>

                  {/* STATUS */}

                  <div>

                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>

                    <select
                      name="status"
                      value={
                        editingEmployee.status ||
                        "active"
                      }
                      onChange={
                        handleEditChange
                      }
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
                    >

                      <option value="active">
                        Active
                      </option>

                      <option value="inactive">
                        Inactive
                      </option>

                    </select>

                  </div>

                </div>

                {/* BUTTONS */}

                <div className="flex justify-end gap-3 mt-6">

                  <button
                    type="button"
                    onClick={() => {
                      setShowEditModal(false);
                      setEditingEmployee(null);
                    }}
                    className="px-5 py-2.5 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={editLoading}
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white rounded-lg font-semibold"
                  >
                    {editLoading
                      ? "Updating..."
                      : "Update Employee"}
                  </button>

                </div>

              </form>

            </div>

          </div>

        )}

      {/* ===================================== */}
      {/* EMPLOYEE ATTENDANCE DETAILS */}
      {/* ===================================== */}

      {selectedEmployee && (

        <EmployeeAttendanceChart
          employee={selectedEmployee}
          attendance={attendance}
          leaves={leaves}
          onClose={() =>
            setSelectedEmployee(null)
          }
        />

      )}

    </div>
  );
};

export default Employees;