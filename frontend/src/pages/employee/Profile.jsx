
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





// import { useEffect, useRef, useState } from "react";
// import {
//   User,
//   Mail,
//   Phone,
//   Building2,
//   BriefcaseBusiness,
//   CalendarDays,
//   BadgeCheck,
//   Pencil,
//   Lock,
//   Save,
//   X,
//   RotateCcw,
//   CheckCircle2,
//   PhoneCall,
// } from "lucide-react";

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

//   const [originalData, setOriginalData] = useState({
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
//   const [editing, setEditing] = useState(false);
//   const [errors, setErrors] = useState({});

//   // References for validation focus
//   const nameRef = useRef(null);
//   const emailRef = useRef(null);
//   const phoneRef = useRef(null);

//   // =========================================================
//   // FETCH PROFILE
//   // =========================================================

//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   const fetchProfile = async () => {
//     try {
//       setLoading(true);

//       const token = localStorage.getItem("token");

//       const response = await fetch(
//         `${import.meta.env.VITE_API_URL}/employees/me`,
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

//       const profileData = {
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
//       };

//       setFormData(profileData);
//       setOriginalData(profileData);
//     } catch (error) {
//       console.error("Fetch profile error:", error);
//       alert(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // =========================================================
//   // HANDLE CHANGE
//   // =========================================================

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));

//     // Remove error while user is correcting field
//     if (errors[name]) {
//       setErrors((prev) => ({
//         ...prev,
//         [name]: "",
//       }));
//     }
//   };

//   // =========================================================
//   // VALIDATION
//   // =========================================================

//   const validateForm = () => {
//     const newErrors = {};

//     const name = formData.name.trim();
//     const email = formData.email.trim();
//     const phone = formData.phone.trim();

//     // NAME
//     if (!name) {
//       newErrors.name = "Full name is required.";
//     } else if (name.length < 2) {
//       newErrors.name =
//         "Full name must contain at least 2 characters.";
//     } else if (name.length > 50) {
//       newErrors.name =
//         "Full name cannot exceed 50 characters.";
//     } else if (!/^[A-Za-zÀ-ÿ\s]+$/.test(name)) {
//       newErrors.name =
//         "Name should contain letters and spaces only.";
//     }

//     // EMAIL
//     if (!email) {
//       newErrors.email = "Email address is required.";
//     } else if (email.length > 100) {
//       newErrors.email =
//         "Email address is too long.";
//     } else if (
//       !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(
//         email
//       )
//     ) {
//       newErrors.email =
//         "Please enter a valid email address.";
//     }

//     // PHONE
//     if (!phone) {
//       newErrors.phone = "Phone number is required.";
//     } else if (!/^[6-9]\d{9}$/.test(phone)) {
//       newErrors.phone =
//         "Enter a valid 10-digit Indian mobile number.";
//     }

//     setErrors(newErrors);

//     // =====================================================
//     // FOCUS + SCROLL TO FIRST INVALID FIELD
//     // =====================================================

//     if (newErrors.name) {
//       setTimeout(() => {
//         nameRef.current?.scrollIntoView({
//           behavior: "smooth",
//           block: "center",
//         });

//         nameRef.current?.focus();
//       }, 100);

//       return false;
//     }

//     if (newErrors.email) {
//       setTimeout(() => {
//         emailRef.current?.scrollIntoView({
//           behavior: "smooth",
//           block: "center",
//         });

//         emailRef.current?.focus();
//       }, 100);

//       return false;
//     }

//     if (newErrors.phone) {
//       setTimeout(() => {
//         phoneRef.current?.scrollIntoView({
//           behavior: "smooth",
//           block: "center",
//         });

//         phoneRef.current?.focus();
//       }, 100);

//       return false;
//     }

//     return true;
//   };

//   // =========================================================
//   // EDIT
//   // =========================================================

//   const handleEdit = () => {
//     setErrors({});
//     setEditing(true);

//     setTimeout(() => {
//       nameRef.current?.focus();
//     }, 150);
//   };

//   // =========================================================
//   // CANCEL
//   // =========================================================

//   const handleCancel = () => {
//     setFormData(originalData);
//     setErrors({});
//     setEditing(false);
//   };

//   // =========================================================
//   // RESET
//   // =========================================================

//   const handleReset = () => {
//     setFormData(originalData);
//     setErrors({});
//   };

//   // =========================================================
//   // SAVE
//   // =========================================================

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       return;
//     }

//     try {
//       setSaving(true);

//       const token = localStorage.getItem("token");

//       const response = await fetch(
//         `${import.meta.env.VITE_API_URL}/employees/me`,
//         {
//           method: "PUT",

//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },

//           body: JSON.stringify({
//             name: formData.name.trim(),
//             email: formData.email.trim(),
//             phone: formData.phone.trim(),
//           }),
//         }
//       );

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(
//           data.message || "Failed to update profile"
//         );
//       }

//       const updatedData = {
//         ...formData,
//         name: data.employee.name,
//         email: data.employee.email,
//         phone: data.employee.phone || "",
//       };

//       setFormData(updatedData);
//       setOriginalData(updatedData);

//       setErrors({});
//       setEditing(false);

//       alert("Profile updated successfully!");
//     } catch (error) {
//       console.error("Update profile error:", error);

//       alert(error.message);
//     } finally {
//       setSaving(false);
//     }
//   };

//   // =========================================================
//   // FORMAT DATE
//   // =========================================================

//   const formatDate = (date) => {
//     if (!date) return "-";

//     return new Date(date).toLocaleDateString("en-IN", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//     });
//   };

//   // =========================================================
//   // INITIALS
//   // =========================================================

//   const getInitials = () => {
//     if (!formData.name) return "U";

//     const words = formData.name.trim().split(/\s+/);

//     if (words.length === 1) {
//       return words[0].charAt(0).toUpperCase();
//     }

//     return (
//       words[0].charAt(0) +
//       words[words.length - 1].charAt(0)
//     ).toUpperCase();
//   };

//   // =========================================================
//   // LOADING
//   // =========================================================

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-blue-50 flex items-center justify-center p-6">
//         <div className="bg-white rounded-2xl border border-gray-200 shadow-sm px-10 py-10 text-center">
//           <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>

//           <p className="text-gray-500">
//             Loading your profile...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   // =========================================================
//   // INFO FIELD
//   // =========================================================

//   const InfoField = ({
//     icon: Icon,
//     label,
//     value,
//     editable,
//     name,
//     type = "text",
//     placeholder,
//     error,
//     inputRef,
//   }) => {
//     return (
//       <div
//         ref={inputRef}
//         className="scroll-mt-24"
//       >
//         <div className="flex items-center justify-between mb-2">
//           <label className="text-sm font-semibold text-gray-700">
//             {label}
//           </label>

//           {!editable && (
//             <span className="flex items-center gap-1 text-xs text-gray-400">
//               <Lock size={12} />
//               Protected
//             </span>
//           )}
//         </div>

//         <div
//           className={`
//             relative rounded-xl border transition-all duration-200
//             ${
//               editing && editable
//                 ? "border-blue-500 ring-2 ring-blue-100 bg-white"
//                 : "border-gray-200 bg-gray-50"
//             }
//             ${
//               editing && editable && error
//                 ? "border-red-500 ring-2 ring-red-100"
//                 : ""
//             }
//           `}
//         >
//           <Icon
//             size={19}
//             className={`
//               absolute left-4 top-1/2 -translate-y-1/2
//               ${
//                 editing && editable
//                   ? error
//                     ? "text-red-500"
//                     : "text-blue-600"
//                   : "text-gray-400"
//               }
//             `}
//           />

//           {editing && editable ? (
//             <input
//               ref={inputRef}
//               type={type}
//               name={name}
//               value={value}
//               onChange={handleChange}
//               placeholder={placeholder}
//               autoComplete="off"
//               className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-transparent outline-none text-gray-800 placeholder:text-gray-400"
//             />
//           ) : (
//             <div className="pl-12 pr-4 py-3.5 min-h-[54px] flex items-center">
//               <span
//                 className={
//                   value
//                     ? "text-gray-800"
//                     : "text-gray-400"
//                 }
//               >
//                 {value || "-"}
//               </span>
//             </div>
//           )}

//           {editing && editable && !error && (
//             <CheckCircle2
//               size={18}
//               className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500"
//             />
//           )}
//         </div>

//         {editing && error && (
//           <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
//             <span>⚠</span>
//             {error}
//           </p>
//         )}
//       </div>
//     );
//   };

//   // =========================================================
//   // PAGE
//   // =========================================================

//   return (
//     <div className="min-h-screen bg-blue-50 px-4 py-6 sm:px-6 lg:px-8">
//       <div className="max-w-5xl mx-auto">

    

//         {/* ================================================= */}
//         {/* SOCIAL STYLE PROFILE CARD */}
//         {/* ================================================= */}

//         <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

//           {/* COVER */}
//           <div className="h-32 sm:h-40 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 relative">

//             <div className="absolute inset-0 bg-white/5"></div>

//             <div className="absolute top-5 right-5">
              
//             </div>
//           </div>

//           {/* PROFILE BODY */}
//           <div className="px-5 sm:px-8 pb-7">

//             {/* AVATAR + NAME */}
//             <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-14 sm:-mt-16">

//               {/* Avatar */}
//               <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-white p-1.5 shadow-lg shrink-0">

//                 <div className="w-full h-full rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center">
//                   <span className="text-3xl sm:text-4xl font-bold text-blue-600">
//                     {getInitials()}
//                   </span>
//                 </div>

//                 <div className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 border-4 border-white rounded-full"></div>
//               </div>

//               {/* Name */}
//               <div className="pb-2 min-w-0">

//                 <div className="flex items-center gap-2">
//                   <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 truncate">
//                     {formData.name || "Employee"}
//                   </h2>

//                   <BadgeCheck
//                     size={23}
//                     className="text-blue-600 shrink-0"
//                   />
//                 </div>

//                 <p className="text-gray-500 mt-1">
//                   {formData.designation || "Employee"}
//                 </p>
//               </div>
//             </div>

//             {/* META */}
//             <div className="flex flex-wrap gap-3 mt-5">

//               <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-gray-50 border border-gray-200 text-sm text-gray-600">
//                 <BadgeCheck
//                   size={17}
//                   className="text-blue-600"
//                 />

//                 <span>Employee ID</span>

//                 <strong className="text-gray-800">
//                   {formData.employeeId || "-"}
//                 </strong>
//               </div>

//               <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-gray-50 border border-gray-200 text-sm text-gray-600">
//                 <Building2
//                   size={17}
//                   className="text-blue-600"
//                 />

//                 <strong className="text-gray-800">
//                   {formData.department || "-"}
//                 </strong>
//               </div>
//             </div>

//             {/* EDIT BUTTON */}
//             {!editing && (
//               <button
//                 type="button"
//                 onClick={handleEdit}
//                 className="mt-6 inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition shadow-sm"
//               >
//                 <Pencil size={18} />
//                 Edit Profile
//               </button>
//             )}
//           </div>
//         </div>

//         {/* ================================================= */}
//         {/* CONTACT INFORMATION */}
//         {/* ================================================= */}

//         <div className="mt-6 bg-white rounded-2xl border border-gray-200 shadow-sm p-5 sm:p-7">

//           <div className="flex items-start justify-between gap-4 mb-6">

//             <div>
//               <h2 className="text-xl font-bold text-gray-800">
//                 Contact Information
//               </h2>

//               <p className="text-sm text-gray-500 mt-1">
//                 How your organization can contact you.
//               </p>
//             </div>

//             <div className="hidden sm:flex w-10 h-10 rounded-lg bg-blue-50 items-center justify-center">
//               <PhoneCall
//                 size={20}
//                 className="text-blue-600"
//               />
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

//             {/* EMAIL */}
//             <InfoField
//               icon={Mail}
//               label="Email Address"
//               value={formData.email}
//               editable={true}
//               name="email"
//               type="email"
//               placeholder="example@gmail.com"
//               error={errors.email}
//               inputRef={emailRef}
//             />

//             {/* PHONE */}
//             <InfoField
//               icon={Phone}
//               label="Phone Number"
//               value={formData.phone}
//               editable={true}
//               name="phone"
//               type="tel"
//               placeholder="9876543210"
//               error={errors.phone}
//               inputRef={phoneRef}
//             />
//           </div>

//           {/* CONTACT ACTIONS */}

//           {!editing && (
//             <div className="flex flex-wrap gap-3 mt-6 pt-5 border-t border-gray-100">

//               {formData.email && (
//                 <a
//                   href={`mailto:${formData.email}`}
//                   className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition font-medium"
//                 >
//                   <Mail size={17} />
//                   Send Email
//                 </a>
//               )}

//               {formData.phone && (
//                 <a
//                   href={`tel:${formData.phone}`}
//                   className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition font-medium"
//                 >
//                   <Phone size={17} />
//                   Call
//                 </a>
//               )}
//             </div>
//           )}
//         </div>

//         {/* ================================================= */}
//         {/* PERSONAL INFORMATION */}
//         {/* ================================================= */}

//         <div className="mt-6 bg-white rounded-2xl border border-gray-200 shadow-sm p-5 sm:p-7">

//           <div className="mb-6">
//             <h2 className="text-xl font-bold text-gray-800">
//               Personal Information
//             </h2>

//             <p className="text-sm text-gray-500 mt-1">
//               Basic information associated with your employee account.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

//             {/* NAME */}
//             <InfoField
//               icon={User}
//               label="Full Name"
//               value={formData.name}
//               editable={true}
//               name="name"
//               placeholder="Enter your full name"
//               error={errors.name}
//               inputRef={nameRef}
//             />

//             {/* EMPLOYEE ID */}
//             <InfoField
//               icon={BadgeCheck}
//               label="Employee ID"
//               value={formData.employeeId}
//               editable={false}
//             />

//             {/* DEPARTMENT */}
//             <InfoField
//               icon={Building2}
//               label="Department"
//               value={formData.department}
//               editable={false}
//             />

//             {/* DESIGNATION */}
//             <InfoField
//               icon={BriefcaseBusiness}
//               label="Designation"
//               value={formData.designation}
//               editable={false}
//             />

//             {/* JOINING DATE */}
//             <InfoField
//               icon={CalendarDays}
//               label="Joining Date"
//               value={formatDate(formData.joiningDate)}
//               editable={false}
//             />
//           </div>
//         </div>

//         {/* ================================================= */}
//         {/* EDIT MODE */}
//         {/* ================================================= */}

//         {editing && (
//           <div className="mt-6 bg-white rounded-2xl border border-blue-200 shadow-sm overflow-hidden">

//             {/* EDIT HEADER */}
//             <div className="bg-blue-50 px-5 sm:px-7 py-4 border-b border-blue-100">

//               <div className="flex items-start gap-3">

//                 <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
//                   <Pencil
//                     size={18}
//                     className="text-blue-600"
//                   />
//                 </div>

//                 <div>
//                   <h3 className="font-semibold text-gray-800">
//                     Editing Profile
//                   </h3>

//                   <p className="text-sm text-gray-500 mt-0.5">
//                     Only highlighted fields can be changed.
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* ACTIONS */}
//             <div className="p-5 sm:p-7">

//               <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

//                 <p className="text-sm text-gray-500">
//                   Changes will be saved to your employee account.
//                 </p>

//                 <div className="flex flex-col sm:flex-row gap-3">

//                   {/* RESET */}
//                   <button
//                     type="button"
//                     onClick={handleReset}
//                     disabled={saving}
//                     className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition disabled:opacity-50"
//                   >
//                     <RotateCcw size={17} />
//                     Reset
//                   </button>

//                   {/* CANCEL */}
//                   <button
//                     type="button"
//                     onClick={handleCancel}
//                     disabled={saving}
//                     className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition disabled:opacity-50"
//                   >
//                     <X size={17} />
//                     Cancel
//                   </button>

//                   {/* SAVE */}
//                   <button
//                     type="button"
//                     onClick={handleSubmit}
//                     disabled={saving}
//                     className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition disabled:opacity-60 disabled:cursor-not-allowed"
//                   >
//                     <Save size={17} />

//                     {saving
//                       ? "Saving..."
//                       : "Save Changes"}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* ================================================= */}
//         {/* SECURITY NOTICE */}
//         {/* ================================================= */}

//         <div className="mt-6 mb-8 bg-white rounded-xl border border-gray-200 p-4 sm:p-5">

//           <div className="flex gap-3">

//             <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
//               <Lock
//                 size={18}
//                 className="text-gray-500"
//               />
//             </div>

//             <div>
//               <p className="text-sm font-semibold text-gray-700">
//                 Protected employee information
//               </p>

//               <p className="text-sm text-gray-500 mt-1 leading-relaxed">
//                 Employee ID, department, designation and joining
//                 date are managed by the administrator and cannot
//                 be changed from your profile.
//               </p>
//             </div>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }

// export default Profile;

import { useEffect, useRef, useState } from "react";
import {
  User,
  Mail,
  Phone,
  Building2,
  BriefcaseBusiness,
  CalendarDays,
  BadgeCheck,
  Pencil,
  Lock,
  Save,
  X,
  RotateCcw,
  CheckCircle2,
  PhoneCall,
  AlertCircle,
} from "lucide-react";

// =========================================================
// HELPER COMPONENT (OUTSIDE COMPONENT TO PREVENT UNMOUNTING)
// =========================================================
const InfoField = ({
  icon: Icon,
  label,
  value,
  editable,
  editing,
  name,
  type = "text",
  placeholder,
  error,
  onChange,
  inputRef,
  fieldRef,
}) => {
  return (
    <div ref={fieldRef} className="scroll-mt-24">
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-sm font-semibold text-slate-700">
          {label}
        </label>

        {!editable && (
          <span className="flex items-center gap-1 text-xs text-slate-400 font-medium">
            <Lock size={12} />
            Read-only
          </span>
        )}
      </div>

      <div
        className={`
          relative rounded-xl border transition-all duration-200
          ${
            editing && editable
              ? error
                ? "border-red-400 ring-4 ring-red-50 bg-white"
                : "border-blue-400 ring-4 ring-blue-50 bg-white"
              : "border-slate-200 bg-slate-50/80"
          }
        `}
      >
        <Icon
          size={18}
          className={`
            absolute left-4 top-1/2 -translate-y-1/2 transition-colors
            ${
              editing && editable
                ? error
                  ? "text-red-500"
                  : "text-blue-600"
                : "text-slate-400"
            }
          `}
        />

        {editing && editable ? (
          <input
            ref={inputRef}
            type={type}
            name={name}
            value={value || ""}
            onChange={onChange}
            placeholder={placeholder}
            autoComplete="off"
            className="w-full pl-11 pr-10 py-3 rounded-xl bg-transparent outline-none text-slate-800 placeholder:text-slate-400 text-sm font-medium"
          />
        ) : (
          <div className="pl-11 pr-4 py-3 min-h-[46px] flex items-center">
            <span
              className={`text-sm font-medium ${
                value ? "text-slate-800" : "text-slate-400"
              }`}
            >
              {value || "-"}
            </span>
          </div>
        )}

        {editing && editable && !error && value && (
          <CheckCircle2
            size={18}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-500"
          />
        )}
      </div>

      {editing && error && (
        <p className="mt-1.5 text-xs text-red-500 font-medium flex items-center gap-1">
          <AlertCircle size={13} />
          {error}
        </p>
      )}
    </div>
  );
};

// =========================================================
// MAIN PROFILE COMPONENT
// =========================================================
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

  const [originalData, setOriginalData] = useState({
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
  const [errors, setErrors] = useState({});

  // Input references
  const nameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const phoneInputRef = useRef(null);

  // Scroll target references
  const nameFieldRef = useRef(null);
  const emailFieldRef = useRef(null);
  const phoneFieldRef = useRef(null);

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

      const employee = data.employee || {};

      const profileData = {
        employeeId: employee.employeeId || "",
        name: employee.name || "",
        email: employee.email || "",
        phone: employee.phone || "",
        department: employee.department || "",
        designation: employee.designation || "",
        joiningDate: employee.joiningDate
          ? new Date(employee.joiningDate).toISOString().split("T")[0]
          : "",
      };

      setFormData(profileData);
      setOriginalData(profileData);
    } catch (error) {
      console.error("Fetch profile error:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // =========================================================
  // FIXED VALIDATION LOGIC
  // =========================================================
  const validateForm = () => {
    const newErrors = {};

    const name = (formData.name || "").toString().trim();
    const email = (formData.email || "").toString().trim();
    const phone = (formData.phone || "").toString().trim();

    // 1. FULL NAME VALIDATION
    if (!name) {
      newErrors.name = "Full name is required.";
    } else if (name.length < 2) {
      newErrors.name = "Full name must be at least 2 characters.";
    } else if (name.length > 50) {
      newErrors.name = "Full name cannot exceed 50 characters.";
    } else if (!/^[A-Za-z\s.'-]+$/.test(name)) {
      newErrors.name = "Name should only contain letters and spaces.";
    }

    // 2. EMAIL VALIDATION
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) {
      newErrors.email = "Email address is required.";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    // 3. PHONE VALIDATION
    // Accepts 10 digits or digits with optional country code (+91)
    const cleanPhone = phone.replace(/[\s-]/g, "");
    const phoneRegex = /^(?:\+91)?\d{10}$/;

    if (!phone) {
      newErrors.phone = "Phone number is required.";
    } else if (!phoneRegex.test(cleanPhone)) {
      newErrors.phone = "Enter a valid 10-digit mobile number.";
    }

    setErrors(newErrors);

    // Focus & scroll to first broken field
    if (newErrors.name) {
      nameFieldRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      nameInputRef.current?.focus();
      return false;
    }

    if (newErrors.email) {
      emailFieldRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      emailInputRef.current?.focus();
      return false;
    }

    if (newErrors.phone) {
      phoneFieldRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      phoneInputRef.current?.focus();
      return false;
    }

    return true;
  };

  const handleEdit = () => {
    setErrors({});
    setEditing(true);

    setTimeout(() => {
      nameInputRef.current?.focus();
    }, 150);
  };

  const handleCancel = () => {
    setFormData(originalData);
    setErrors({});
    setEditing(false);
  };

  const handleReset = () => {
    setFormData(originalData);
    setErrors({});
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    if (!validateForm()) {
      return;
    }

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
            name: formData.name.trim(),
            email: formData.email.trim(),
            phone: formData.phone.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update profile");
      }

      const updatedData = {
        ...formData,
        name: data.employee.name,
        email: data.employee.email,
        phone: data.employee.phone || "",
      };

      setFormData(updatedData);
      setOriginalData(updatedData);
      setErrors({});
      setEditing(false);

      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Update profile error:", error);
      alert(error.message);
    } finally {
      setSaving(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getInitials = () => {
    if (!formData.name) return "U";
    const words = formData.name.trim().split(/\s+/);
    if (words.length === 1) {
      return words[0].charAt(0).toUpperCase();
    }
    return (
      words[0].charAt(0) + words[words.length - 1].charAt(0)
    ).toUpperCase();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm px-10 py-10 text-center max-w-sm w-full">
          <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/60 px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} noValidate>
          {/* PROFILE HEADER CARD */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="h-32 sm:h-36 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 relative">
              <div className="absolute inset-0 bg-black/5" />
            </div>

            <div className="px-5 sm:px-8 pb-6">
              <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-12 sm:-mt-14">
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-white p-1.5 shadow-md shrink-0">
                  <div className="w-full h-full rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center">
                    <span className="text-2xl sm:text-3xl font-bold text-blue-600 tracking-tight">
                      {getInitials()}
                    </span>
                  </div>
                  <div className="absolute bottom-2 right-2 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></div>
                </div>

                <div className="pb-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h1 className="text-xl sm:text-2xl font-bold text-slate-800 truncate">
                      {formData.name || "Employee Profile"}
                    </h1>
                    <BadgeCheck
                      size={20}
                      className="text-blue-600 shrink-0"
                    />
                  </div>
                  <p className="text-slate-500 text-sm font-medium mt-0.5">
                    {formData.designation || "Team Member"}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2.5 mt-5">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100/80 border border-slate-200/60 text-xs font-semibold text-slate-600">
                  <span>ID:</span>
                  <span className="text-slate-900">
                    {formData.employeeId || "-"}
                  </span>
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100/80 border border-slate-200/60 text-xs font-semibold text-slate-600">
                  <Building2 size={14} className="text-blue-600" />
                  <span className="text-slate-900">
                    {formData.department || "-"}
                  </span>
                </div>
              </div>

              {!editing && (
                <button
                  type="button"
                  onClick={handleEdit}
                  className="mt-6 inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-xl text-sm font-semibold transition shadow-sm"
                >
                  <Pencil size={16} />
                  Edit Profile
                </button>
              )}
            </div>
          </div>

          {/* CONTACT INFORMATION */}
          <div className="mt-6 bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-7">
            <div className="flex items-start justify-between gap-4 mb-5">
              <div>
                <h2 className="text-lg font-bold text-slate-800">
                  Contact Information
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Update your reachability details across the organization.
                </p>
              </div>

              <div className="hidden sm:flex w-9 h-9 rounded-xl bg-blue-50 items-center justify-center">
                <PhoneCall size={18} className="text-blue-600" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <InfoField
                icon={Mail}
                label="Email Address"
                value={formData.email}
                editable={true}
                editing={editing}
                onChange={handleChange}
                name="email"
                type="email"
                placeholder="example@organization.com"
                error={errors.email}
                inputRef={emailInputRef}
                fieldRef={emailFieldRef}
              />

              <InfoField
                icon={Phone}
                label="Phone Number"
                value={formData.phone}
                editable={true}
                editing={editing}
                onChange={handleChange}
                name="phone"
                type="tel"
                placeholder="9876543210"
                error={errors.phone}
                inputRef={phoneInputRef}
                fieldRef={phoneFieldRef}
              />
            </div>
          </div>

          {/* PERSONAL INFORMATION */}
          <div className="mt-6 bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-7">
            <div className="mb-5">
              <h2 className="text-lg font-bold text-slate-800">
                Personal & Job Details
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Key identity and organizational parameters linked to your account.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <InfoField
                icon={User}
                label="Full Name"
                value={formData.name}
                editable={true}
                editing={editing}
                onChange={handleChange}
                name="name"
                placeholder="Enter full name"
                error={errors.name}
                inputRef={nameInputRef}
                fieldRef={nameFieldRef}
              />

              <InfoField
                icon={BadgeCheck}
                label="Employee ID"
                value={formData.employeeId}
                editable={false}
                editing={editing}
              />

              <InfoField
                icon={Building2}
                label="Department"
                value={formData.department}
                editable={false}
                editing={editing}
              />

              <InfoField
                icon={BriefcaseBusiness}
                label="Designation"
                value={formData.designation}
                editable={false}
                editing={editing}
              />

              <InfoField
                icon={CalendarDays}
                label="Joining Date"
                value={formatDate(formData.joiningDate)}
                editable={false}
                editing={editing}
              />
            </div>
          </div>

          {/* EDIT BAR / SAVE CONTROLS */}
          {editing && (
            <div className="mt-6 bg-white rounded-2xl border border-blue-200 shadow-sm overflow-hidden transition-all">
              <div className="bg-blue-50/70 px-5 sm:px-7 py-3.5 border-b border-blue-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                    <Pencil size={15} className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                      Editing Mode Active
                    </h3>
                    <p className="text-xs text-slate-500">
                      Modifiable fields are unlocked. Click save once you are done.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5 sm:px-7 sm:py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-slate-500 hidden sm:block">
                  Ensure all details match your official documents.
                </p>

                <div className="flex flex-wrap items-center justify-end gap-2.5 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={handleReset}
                    disabled={saving}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition disabled:opacity-50"
                  >
                    <RotateCcw size={14} />
                    Reset
                  </button>

                  <button
                    type="button"
                    onClick={handleCancel}
                    disabled={saving}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition disabled:opacity-50"
                  >
                    <X size={14} />
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={saving}
                    className="inline-flex items-center justify-center gap-1.5 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-xs font-semibold text-white transition disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
                  >
                    <Save size={14} />
                    {saving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* SECURITY FOOTER NOTE */}
          <div className="mt-6 mb-8 bg-white rounded-xl border border-slate-200 p-4 sm:p-5">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                <Lock size={16} className="text-slate-500" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-700">
                  Protected Employee Records
                </p>
                <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                  Employee ID, department, designation, and joining date are managed centrally by the HR administration system and cannot be directly modified.
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;