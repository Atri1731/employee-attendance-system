// import { useEffect, useState } from "react";

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

//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);

//   // Fetch profile
//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   const fetchProfile = async () => {
//     try {
//       const token = localStorage.getItem("token");

// const response = await fetch(
//   `${import.meta.env.VITE_API_URL}/employees/me`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(
//           data.message || "Failed to fetch profile"
//         );
//       }

//       const employee = data.employee;

//       setFormData({
//         employeeId: employee.employeeId || "",
//         name: employee.name || "",
//         email: employee.email || "",
//         phone: employee.phone || "",
//         department: employee.department || "",
//         designation: employee.designation || "",
//         joiningDate: employee.joiningDate
//           ? new Date(employee.joiningDate)
//               .toISOString()
//               .split("T")[0]
//           : "",
//       });
//     } catch (error) {
//       console.error("Fetch profile error:", error);

//       alert(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle input
//   function handleChange(e) {
//     const { name, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   }

//   // Save profile
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       setSaving(true);

//       const token = localStorage.getItem("token");

//     const response = await fetch(
//   `${import.meta.env.VITE_API_URL}/employees/me`,
//   {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify({
//       name: formData.name,
//       email: formData.email,
//       phone: formData.phone,
//     }),
//   }
// );
//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(
//           data.message || "Failed to update profile"
//         );
//       }

//       setFormData((prev) => ({
//         ...prev,
//         name: data.employee.name,
//         email: data.employee.email,
//         phone: data.employee.phone || "",
//       }));

//       alert("Profile updated successfully!");
//     } catch (error) {
//       console.error("Update profile error:", error);

//       alert(error.message);
//     } finally {
//       setSaving(false);
//     }
//   };

//   return (
//     <div className="p-6 min-h-screen bg-blue-100">

//       {/* Page Header */}
//       <div className="mb-6">
//         <h1 className="text-2xl font-bold text-gray-800 text-center">
//           My Profile
//         </h1>

//         <p className="text-gray-500 mt-1 text-center">
//           View and manage your personal information.
//         </p>
//       </div>

//       {/* Profile Form */}
//       <div className="bg-white border border-gray-200 rounded-xl p-6 max-w-4xl mx-auto">

//         {loading ? (
//           <div className="py-16 text-center text-gray-500">
//             Loading profile...
//           </div>
//         ) : (
//           <form onSubmit={handleSubmit}>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

//               {/* Employee ID */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Employee ID
//                 </label>

//                 <input
//                   type="text"
//                   name="employeeId"
//                   value={formData.employeeId}
//                   readOnly
//                   className="w-full border border-gray-300 bg-gray-100 rounded-lg px-4 py-3 outline-none text-gray-600 cursor-not-allowed"
//                 />
//               </div>

//               {/* Full Name */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Full Name
//                 </label>

//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   placeholder="Enter your full name"
//                   className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>

//               {/* Email */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Email
//                 </label>

//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   placeholder="Enter your email"
//                   className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>

//               {/* Phone */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Phone
//                 </label>

//                 <input
//                   type="tel"
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   placeholder="Enter your phone number"
//                   className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>

//               {/* Department */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Department
//                 </label>

//                 <input
//                   type="text"
//                   name="department"
//                   value={formData.department}
//                   readOnly
//                   className="w-full border border-gray-300 bg-gray-100 rounded-lg px-4 py-3 outline-none text-gray-600 cursor-not-allowed"
//                 />
//               </div>

//               {/* Designation */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Designation
//                 </label>

//                 <input
//                   type="text"
//                   name="designation"
//                   value={formData.designation}
//                   readOnly
//                   className="w-full border border-gray-300 bg-gray-100 rounded-lg px-4 py-3 outline-none text-gray-600 cursor-not-allowed"
//                 />
//               </div>

//               {/* Joining Date */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Joining Date
//                 </label>

//                 <input
//                   type="date"
//                   name="joiningDate"
//                   value={formData.joiningDate}
//                   readOnly
//                   className="w-full border border-gray-300 bg-gray-100 rounded-lg px-4 py-3 outline-none text-gray-600 cursor-not-allowed"
//                 />
//               </div>

//             </div>

//             {/* Buttons */}
//             <div className="flex gap-3 mt-8">

//               <button
//                 type="submit"
//                 disabled={saving}
//                 className={`bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition ${
//                   saving
//                     ? "opacity-60 cursor-not-allowed"
//                     : ""
//                 }`}
//               >
//                 {saving ? "Saving..." : "Save Changes"}
//               </button>

//               <button
//                 type="button"
//                 onClick={fetchProfile}
//                 disabled={loading || saving}
//                 className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-semibold transition"
//               >
//                 Reset
//               </button>

//             </div>

//           </form>
//         )}

//       </div>

//     </div>
//   );
// }

// export default Profile;


import { useEffect, useState } from "react";
import {
  Mail,
  Phone,
  Building2,
  BriefcaseBusiness,
  CalendarDays,
  UserRound,
  Pencil,
  Save,
  RotateCcw,
  IdCard,
} from "lucide-react";

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
  const [editing, setEditing] = useState(false);

  // =========================
  // FETCH PROFILE
  // =========================
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/employees/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch profile");
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
          ? new Date(employee.joiningDate).toISOString().split("T")[0]
          : "",
      });
    } catch (error) {
      console.error("Fetch profile error:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // HANDLE INPUT
  // =========================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // SAVE PROFILE
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const token = localStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/employees/me`,
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
        throw new Error(data.message || "Failed to update profile");
      }

      setFormData((prev) => ({
        ...prev,
        name: data.employee.name,
        email: data.employee.email,
        phone: data.employee.phone || "",
      }));

      setEditing(false);

      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Update profile error:", error);
      alert(error.message);
    } finally {
      setSaving(false);
    }
  };

  // =========================
  // RESET
  // =========================
  const handleReset = async () => {
    await fetchProfile();
    setEditing(false);
  };

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 px-8 py-10 text-center">
          <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>

          <p className="text-gray-600 font-medium">
            Loading profile...
          </p>
        </div>
      </div>
    );
  }

  // =========================
  // AVATAR LETTER
  // =========================
  const avatarLetter = formData.name
    ? formData.name.charAt(0).toUpperCase()
    : "U";

  return (
    <div className="min-h-screen bg-gray-100 pb-10">

      {/* =========================
          COVER SECTION
      ========================= */}
      <div className="relative">

        {/* Cover */}
        <div className="h-48 sm:h-56 md:h-64 bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 relative overflow-hidden">

          {/* Decorative circles */}
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/10 rounded-full"></div>

          <div className="absolute -bottom-32 -left-20 w-80 h-80 bg-white/10 rounded-full"></div>

          <div className="absolute top-10 left-1/3 w-24 h-24 bg-white/5 rounded-full"></div>

          {/* Header text */}
          <div className="relative max-w-6xl mx-auto px-5 sm:px-6 pt-7">

            <p className="text-blue-100 text-sm font-medium">
              Employee Profile
            </p>

            <h1 className="text-white text-2xl sm:text-3xl font-bold mt-1">
              My Profile
            </h1>

          </div>
        </div>

        {/* =========================
            PROFILE CARD
        ========================= */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6">

          <div className="relative -mt-16 sm:-mt-20">

            <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">

              {/* Profile top */}
              <div className="px-5 sm:px-8 pt-5 sm:pt-7 pb-6">

                <div className="flex flex-col md:flex-row md:items-end gap-5">

                  {/* Avatar */}
                  <div className="flex-shrink-0">

                    <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 p-1 shadow-lg">

                      <div className="w-full h-full rounded-full bg-white flex items-center justify-center">

                        <div className="w-[88%] h-[88%] rounded-full bg-blue-100 flex items-center justify-center">

                          <span className="text-4xl sm:text-5xl font-bold text-blue-700">
                            {avatarLetter}
                          </span>

                        </div>

                      </div>

                    </div>

                  </div>

                  {/* Basic information */}
                  <div className="flex-1">

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                      <div>

                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                          {formData.name || "Employee"}
                        </h2>

                        <p className="text-gray-500 mt-1">
                          {formData.designation || "Employee"}
                        </p>

                        <div className="flex flex-wrap items-center gap-3 mt-3">

                          <span className="inline-flex items-center gap-1.5 text-sm text-gray-600">
                            <Building2 size={16} />
                            {formData.department || "Department"}
                          </span>

                          <span className="text-gray-300">
                            •
                          </span>

                          <span className="inline-flex items-center gap-1.5 text-sm text-gray-600">
                            <IdCard size={16} />
                            ID: {formData.employeeId || "-"}
                          </span>

                        </div>

                      </div>

                      {/* Edit button */}
                      {!editing && (
                        <button
                          type="button"
                          onClick={() => setEditing(true)}
                          className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-semibold transition shadow-sm"
                        >
                          <Pencil size={17} />
                          Edit Profile
                        </button>
                      )}

                    </div>

                  </div>

                </div>

              </div>

              {/* =========================
                  QUICK INFO
              ========================= */}
              <div className="border-t border-gray-100 bg-gray-50/70 px-5 sm:px-8 py-5">

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                  {/* Department */}
                  <div className="bg-white border border-gray-200 rounded-xl p-4">

                    <div className="flex items-center gap-3">

                      <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                        <Building2
                          size={20}
                          className="text-blue-600"
                        />
                      </div>

                      <div>
                        <p className="text-xs text-gray-500">
                          Department
                        </p>

                        <p className="font-semibold text-gray-800">
                          {formData.department || "-"}
                        </p>
                      </div>

                    </div>

                  </div>

                  {/* Designation */}
                  <div className="bg-white border border-gray-200 rounded-xl p-4">

                    <div className="flex items-center gap-3">

                      <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                        <BriefcaseBusiness
                          size={20}
                          className="text-indigo-600"
                        />
                      </div>

                      <div>
                        <p className="text-xs text-gray-500">
                          Designation
                        </p>

                        <p className="font-semibold text-gray-800">
                          {formData.designation || "-"}
                        </p>
                      </div>

                    </div>

                  </div>

                  {/* Joining Date */}
                  <div className="bg-white border border-gray-200 rounded-xl p-4">

                    <div className="flex items-center gap-3">

                      <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                        <CalendarDays
                          size={20}
                          className="text-purple-600"
                        />
                      </div>

                      <div>
                        <p className="text-xs text-gray-500">
                          Joined
                        </p>

                        <p className="font-semibold text-gray-800">
                          {formData.joiningDate
                            ? new Date(
                                formData.joiningDate
                              ).toLocaleDateString("en-IN", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              })
                            : "-"}
                        </p>
                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* =========================
          MAIN CONTENT
      ========================= */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-6">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* =========================
              LEFT - ABOUT
          ========================= */}
          <div className="lg:col-span-1">

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

              <h3 className="text-lg font-bold text-gray-900 mb-5">
                About
              </h3>

              <div className="space-y-5">

                {/* Email */}
                <div className="flex items-start gap-3">

                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <Mail
                      size={19}
                      className="text-blue-600"
                    />
                  </div>

                  <div className="min-w-0">

                    <p className="text-xs text-gray-500">
                      Email Address
                    </p>

                    <p className="text-sm font-medium text-gray-800 break-all mt-0.5">
                      {formData.email || "-"}
                    </p>

                  </div>

                </div>

                {/* Phone */}
                <div className="flex items-start gap-3">

                  <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0">
                    <Phone
                      size={19}
                      className="text-green-600"
                    />
                  </div>

                  <div>

                    <p className="text-xs text-gray-500">
                      Phone Number
                    </p>

                    <p className="text-sm font-medium text-gray-800 mt-0.5">
                      {formData.phone || "Not provided"}
                    </p>

                  </div>

                </div>

                {/* Employee ID */}
                <div className="flex items-start gap-3">

                  <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center flex-shrink-0">
                    <IdCard
                      size={19}
                      className="text-indigo-600"
                    />
                  </div>

                  <div>

                    <p className="text-xs text-gray-500">
                      Employee ID
                    </p>

                    <p className="text-sm font-medium text-gray-800 mt-0.5">
                      {formData.employeeId || "-"}
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* =========================
              RIGHT - INFORMATION
          ========================= */}
          <div className="lg:col-span-2">

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

              <div className="flex items-center justify-between mb-6">

                <div>

                  <h3 className="text-lg font-bold text-gray-900">
                    Personal Information
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Manage your personal account information.
                  </p>

                </div>

                {!editing && (
                  <UserRound
                    size={24}
                    className="text-gray-300"
                  />
                )}

              </div>

              <form onSubmit={handleSubmit}>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                  {/* Employee ID */}
                  <div>

                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Employee ID
                    </label>

                    <input
                      type="text"
                      value={formData.employeeId}
                      readOnly
                      className="w-full border border-gray-200 bg-gray-100 rounded-lg px-4 py-3 text-gray-500 outline-none cursor-not-allowed"
                    />

                  </div>

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
                      disabled={!editing}
                      placeholder="Enter your full name"
                      className={`w-full border rounded-lg px-4 py-3 outline-none transition ${
                        editing
                          ? "border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          : "border-gray-200 bg-gray-50 text-gray-700 cursor-not-allowed"
                      }`}
                    />

                  </div>

                  {/* Email */}
                  <div>

                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={!editing}
                      placeholder="Enter your email"
                      className={`w-full border rounded-lg px-4 py-3 outline-none transition ${
                        editing
                          ? "border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          : "border-gray-200 bg-gray-50 text-gray-700 cursor-not-allowed"
                      }`}
                    />

                  </div>

                  {/* Phone */}
                  <div>

                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>

                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={!editing}
                      placeholder="Enter your phone number"
                      className={`w-full border rounded-lg px-4 py-3 outline-none transition ${
                        editing
                          ? "border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          : "border-gray-200 bg-gray-50 text-gray-700 cursor-not-allowed"
                      }`}
                    />

                  </div>

                  {/* Department */}
                  <div>

                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Department
                    </label>

                    <input
                      type="text"
                      value={formData.department}
                      readOnly
                      className="w-full border border-gray-200 bg-gray-100 rounded-lg px-4 py-3 text-gray-500 outline-none cursor-not-allowed"
                    />

                  </div>

                  {/* Designation */}
                  <div>

                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Designation
                    </label>

                    <input
                      type="text"
                      value={formData.designation}
                      readOnly
                      className="w-full border border-gray-200 bg-gray-100 rounded-lg px-4 py-3 text-gray-500 outline-none cursor-not-allowed"
                    />

                  </div>

                  {/* Joining Date */}
                  <div className="md:col-span-2">

                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Joining Date
                    </label>

                    <input
                      type="date"
                      value={formData.joiningDate}
                      readOnly
                      className="w-full border border-gray-200 bg-gray-100 rounded-lg px-4 py-3 text-gray-500 outline-none cursor-not-allowed"
                    />

                  </div>

                </div>

                {/* =========================
                    EDIT BUTTONS
                ========================= */}
                {editing && (
                  <div className="flex flex-col sm:flex-row gap-3 mt-7 pt-6 border-t border-gray-100">

                    <button
                      type="submit"
                      disabled={saving}
                      className={`inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition ${
                        saving
                          ? "opacity-60 cursor-not-allowed"
                          : ""
                      }`}
                    >
                      <Save size={18} />

                      {saving
                        ? "Saving..."
                        : "Save Changes"}
                    </button>

                    <button
                      type="button"
                      onClick={handleReset}
                      disabled={saving}
                      className="inline-flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-semibold transition"
                    >
                      <RotateCcw size={17} />

                      Cancel
                    </button>

                  </div>
                )}

              </form>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;
