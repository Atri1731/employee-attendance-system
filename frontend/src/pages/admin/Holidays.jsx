// import { useEffect, useState } from "react";
// import {
//   CalendarDays,
//   Plus,
//   Pencil,
//   Trash2,
//   X,
//   Search,
// } from "lucide-react";

// function Holidays() {
//   const [holidays, setHolidays] = useState([]);
//   const [search, setSearch] = useState("");

//   const [showAddModal, setShowAddModal] = useState(false);
//   const [editingHoliday, setEditingHoliday] = useState(null);

//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);

//   const [formData, setFormData] = useState({
//     holidayId: "",
//     name: "",
//     date: "",
//     description: "",
//   });

//   // =========================
//   // FETCH HOLIDAYS
//   // =========================

//   const fetchHolidays = async () => {
//     try {
//       setLoading(true);

//       const token = localStorage.getItem("token");

//       const response = await fetch(
//         `${import.meta.env.VITE_API_URL}/holidays`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(
//           data.message || "Failed to fetch holidays"
//         );
//       }

//       setHolidays(data.holidays || []);
//     } catch (error) {
//       console.error("Fetch holidays error:", error);
//       alert(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchHolidays();
//   }, []);

//   // =========================
//   // HANDLE INPUT
//   // =========================

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // =========================
//   // ADD HOLIDAY
//   // =========================

//   const handleAddHoliday = async (e) => {
//     e.preventDefault();

//     try {
//       setSaving(true);

//       const token = localStorage.getItem("token");

//       const response = await fetch(
//         `${import.meta.env.VITE_API_URL}/holidays`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify(formData),
//         }
//       );

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(
//           data.message || "Failed to add holiday"
//         );
//       }

//       alert("Holiday added successfully!");

//       setFormData({
//         holidayId: "",
//         name: "",
//         date: "",
//         description: "",
//       });

//       setShowAddModal(false);

//       fetchHolidays();
//     } catch (error) {
//       console.error("Add holiday error:", error);
//       alert(error.message);
//     } finally {
//       setSaving(false);
//     }
//   };

//   // =========================
//   // EDIT HOLIDAY
//   // =========================

//   const handleEdit = (holiday) => {
//     setEditingHoliday(holiday);

//     setFormData({
//       holidayId: holiday.holidayId,
//       name: holiday.name,
//       date: holiday.date
//         ? holiday.date.split("T")[0]
//         : "",
//       description: holiday.description || "",
//     });
//   };

//   // =========================
//   // UPDATE HOLIDAY
//   // =========================

//   const handleUpdateHoliday = async (e) => {
//     e.preventDefault();

//     try {
//       setSaving(true);

//       const token = localStorage.getItem("token");

//       const response = await fetch(
//         `${import.meta.env.VITE_API_URL}/holidays/${editingHoliday._id}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({
//             name: formData.name,
//             date: formData.date,
//             description: formData.description,
//           }),
//         }
//       );

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(
//           data.message || "Failed to update holiday"
//         );
//       }

//       alert("Holiday updated successfully!");

//       setEditingHoliday(null);

//       setFormData({
//         holidayId: "",
//         name: "",
//         date: "",
//         description: "",
//       });

//       fetchHolidays();
//     } catch (error) {
//       console.error("Update holiday error:", error);
//       alert(error.message);
//     } finally {
//       setSaving(false);
//     }
//   };

//   // =========================
//   // DELETE HOLIDAY
//   // =========================

//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this holiday?"
//     );

//     if (!confirmDelete) {
//       return;
//     }

//     try {
//       const token = localStorage.getItem("token");

//       const response = await fetch(
//         `${import.meta.env.VITE_API_URL}/holidays/${id}`,
//         {
//           method: "DELETE",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(
//           data.message || "Failed to delete holiday"
//         );
//       }

//       alert("Holiday deleted successfully!");

//       fetchHolidays();
//     } catch (error) {
//       console.error("Delete holiday error:", error);
//       alert(error.message);
//     }
//   };

//   // =========================
//   // SEARCH
//   // =========================

//   const filteredHolidays = holidays.filter((holiday) => {
//     const searchText = search.toLowerCase();

//     return (
//       holiday.holidayId
//         ?.toLowerCase()
//         .includes(searchText) ||
//       holiday.name
//         ?.toLowerCase()
//         .includes(searchText) ||
//       holiday.description
//         ?.toLowerCase()
//         .includes(searchText)
//     );
//   });

//   // =========================
//   // FORMAT DATE
//   // =========================

//   const formatDate = (date) => {
//     if (!date) return "-";

//     return new Date(date).toLocaleDateString("en-IN", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//     });
//   };

//   return (
//     <div className="p-6 min-h-screen bg-blue-100">

//       {/* HEADER */}
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

//         <div>
//           <h1 className="text-2xl font-bold text-gray-800">
//             Holidays
//           </h1>

//           <p className="text-gray-500 mt-1">
//             Manage holidays in your organization.
//           </p>
//         </div>

//         <button
//           type="button"
//           onClick={() => {
//             setFormData({
//               holidayId: "",
//               name: "",
//               date: "",
//               description: "",
//             });

//             setShowAddModal(true);
//           }}
//           className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-medium transition"
//         >
//           <Plus size={18} />
//           Add Holiday
//         </button>
//       </div>

//       {/* SEARCH */}
//       <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
//         <div className="relative max-w-md">
//           <Search
//             size={19}
//             className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//           />

//           <input
//             type="text"
//             placeholder="Search holidays..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//       </div>

//       {/* TABLE */}
//       <div className="bg-white rounded-xl shadow-sm overflow-hidden">

//         <div className="overflow-x-auto">
//           <table className="w-full">

//             <thead className="bg-gray-50 border-b">
//               <tr>
//                 <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
//                   Holiday ID
//                 </th>

//                 <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
//                   Holiday
//                 </th>

//                 <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
//                   Date
//                 </th>

//                 <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
//                   Description
//                 </th>

//                 <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
//                   Status
//                 </th>

//                 <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
//                   Actions
//                 </th>
//               </tr>
//             </thead>

//             <tbody className="divide-y">

//               {loading ? (
//                 <tr>
//                   <td
//                     colSpan="6"
//                     className="px-6 py-12 text-center text-gray-500"
//                   >
//                     Loading holidays...
//                   </td>
//                 </tr>
//               ) : filteredHolidays.length === 0 ? (
//                 <tr>
//                   <td
//                     colSpan="6"
//                     className="px-6 py-12 text-center"
//                   >
//                     <CalendarDays
//                       size={40}
//                       className="mx-auto text-gray-300 mb-3"
//                     />

//                     <p className="text-lg font-medium text-gray-400">
//                       No holidays found
//                     </p>

//                     <p className="text-sm text-gray-400 mt-1">
//                       Add a holiday to get started.
//                     </p>
//                   </td>
//                 </tr>
//               ) : (
//                 filteredHolidays.map((holiday) => (
//                   <tr
//                     key={holiday._id}
//                     className="hover:bg-gray-50"
//                   >
//                     <td className="px-6 py-4 text-sm text-gray-700">
//                       {holiday.holidayId}
//                     </td>

//                     <td className="px-6 py-4">
//                       <div className="font-medium text-gray-800">
//                         {holiday.name}
//                       </div>
//                     </td>

//                     <td className="px-6 py-4 text-sm text-gray-600">
//                       {formatDate(holiday.date)}
//                     </td>

//                     <td className="px-6 py-4 text-sm text-gray-600 max-w-xs">
//                       {holiday.description || "-"}
//                     </td>

//                     <td className="px-6 py-4">
//                       <span
//                         className={`px-3 py-1 rounded-full text-xs font-medium ${
//                           holiday.status === "active"
//                             ? "bg-green-100 text-green-700"
//                             : "bg-gray-100 text-gray-600"
//                         }`}
//                       >
//                         {holiday.status}
//                       </span>
//                     </td>

//                     <td className="px-6 py-4">
//                       <div className="flex items-center gap-2">

//                         <button
//                           type="button"
//                           onClick={() =>
//                             handleEdit(holiday)
//                           }
//                           className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
//                           title="Edit"
//                         >
//                           <Pencil size={17} />
//                         </button>

//                         <button
//                           type="button"
//                           onClick={() =>
//                             handleDelete(holiday._id)
//                           }
//                           className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
//                           title="Delete"
//                         >
//                           <Trash2 size={17} />
//                         </button>

//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               )}

//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* ADD MODAL */}
//       {showAddModal && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">

//           <div className="bg-white rounded-xl shadow-xl w-full max-w-lg">

//             <div className="flex items-center justify-between px-6 py-4 border-b">
//               <h2 className="text-xl font-semibold text-gray-800">
//                 Add Holiday
//               </h2>

//               <button
//                 type="button"
//                 onClick={() => setShowAddModal(false)}
//                 className="p-2 hover:bg-gray-100 rounded-lg"
//               >
//                 <X size={20} />
//               </button>
//             </div>

//             <form
//               onSubmit={handleAddHoliday}
//               className="p-6 space-y-4"
//             >

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Holiday ID
//                 </label>

//                 <input
//                   type="text"
//                   name="holidayId"
//                   value={formData.holidayId}
//                   onChange={handleChange}
//                   placeholder="H001"
//                   required
//                   className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Holiday Name
//                 </label>

//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   placeholder="Independence Day"
//                   required
//                   className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Date
//                 </label>

//                 <input
//                   type="date"
//                   name="date"
//                   value={formData.date}
//                   onChange={handleChange}
//                   required
//                   className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Description
//                 </label>

//                 <textarea
//                   name="description"
//                   value={formData.description}
//                   onChange={handleChange}
//                   placeholder="Holiday description..."
//                   rows="3"
//                   className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
//                 />
//               </div>

//               <div className="flex justify-end gap-3 pt-2">

//                 <button
//                   type="button"
//                   onClick={() => setShowAddModal(false)}
//                   className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
//                 >
//                   Cancel
//                 </button>

//                 <button
//                   type="submit"
//                   disabled={saving}
//                   className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50"
//                 >
//                   {saving ? "Adding..." : "Add Holiday"}
//                 </button>

//               </div>

//             </form>
//           </div>
//         </div>
//       )}

//       {/* EDIT MODAL */}
//       {editingHoliday && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">

//           <div className="bg-white rounded-xl shadow-xl w-full max-w-lg">

//             <div className="flex items-center justify-between px-6 py-4 border-b">
//               <h2 className="text-xl font-semibold text-gray-800">
//                 Edit Holiday
//               </h2>

//               <button
//                 type="button"
//                 onClick={() => setEditingHoliday(null)}
//                 className="p-2 hover:bg-gray-100 rounded-lg"
//               >
//                 <X size={20} />
//               </button>
//             </div>

//             <form
//               onSubmit={handleUpdateHoliday}
//               className="p-6 space-y-4"
//             >

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Holiday ID
//                 </label>

//                 <input
//                   type="text"
//                   value={formData.holidayId}
//                   disabled
//                   className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-100 text-gray-500"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Holiday Name
//                 </label>

//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   required
//                   className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Date
//                 </label>

//                 <input
//                   type="date"
//                   name="date"
//                   value={formData.date}
//                   onChange={handleChange}
//                   required
//                   className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Description
//                 </label>

//                 <textarea
//                   name="description"
//                   value={formData.description}
//                   onChange={handleChange}
//                   rows="3"
//                   className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Status
//                 </label>

//                 <select
//                   value={editingHoliday.status}
//                   onChange={(e) =>
//                     setEditingHoliday((prev) => ({
//                       ...prev,
//                       status: e.target.value,
//                     }))
//                   }
//                   className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                   <option value="active">
//                     Active
//                   </option>

//                   <option value="inactive">
//                     Inactive
//                   </option>
//                 </select>
//               </div>

//               <div className="flex justify-end gap-3 pt-2">

//                 <button
//                   type="button"
//                   onClick={() =>
//                     setEditingHoliday(null)
//                   }
//                   className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
//                 >
//                   Cancel
//                 </button>

//                 <button
//                   type="submit"
//                   disabled={saving}
//                   className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50"
//                 >
//                   {saving
//                     ? "Saving..."
//                     : "Save Changes"}
//                 </button>

//               </div>

//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Holidays;

import {useEffect, useMemo, useState} from "react";
import {
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  Plus,
  Pencil,
  Trash2,
  X,
  Search,
  PartyPopper,
} from "lucide-react";

function Holidays() {
  const [holidays, setHolidays] = useState([]);
  const [search, setSearch] = useState("");

  const [currentDate, setCurrentDate] = useState(new Date());

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingHoliday, setEditingHoliday] = useState(null);
  const [selectedHoliday, setSelectedHoliday] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    holidayId: "",
    name: "",
    date: "",
    description: "",
  });

  // =========================
  // FETCH HOLIDAYS
  // =========================

  const fetchHolidays = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await fetch(`${import.meta.env.VITE_API_URL}/holidays`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch holidays");
      }

      setHolidays(data.holidays || []);
    } catch (error) {
      console.error("Fetch holidays error:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHolidays();
  }, []);

  // =========================
  // HANDLE INPUT
  // =========================

  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // RESET FORM
  // =========================

  const resetForm = () => {
    setFormData({
      holidayId: "",
      name: "",
      date: "",
      description: "",
    });
  };

  // =========================
  // OPEN ADD MODAL
  // =========================

  const openAddModal = (selectedDate = "") => {
    resetForm();

    if (selectedDate) {
      setFormData((prev) => ({
        ...prev,
        date: selectedDate,
      }));
    }

    setShowAddModal(true);
  };

  // =========================
  // ADD HOLIDAY
  // =========================

  const handleAddHoliday = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const token = localStorage.getItem("token");

      const response = await fetch(`${import.meta.env.VITE_API_URL}/holidays`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add holiday");
      }

      alert("Holiday added successfully!");

      setShowAddModal(false);
      resetForm();

      await fetchHolidays();
    } catch (error) {
      console.error("Add holiday error:", error);
      alert(error.message);
    } finally {
      setSaving(false);
    }
  };

  // =========================
  // OPEN EDIT
  // =========================

  const handleEdit = (holiday) => {
    setSelectedHoliday(null);
    setEditingHoliday(holiday);

    setFormData({
      holidayId: holiday.holidayId || "",
      name: holiday.name || "",
      date: holiday.date ? holiday.date.split("T")[0] : "",
      description: holiday.description || "",
    });
  };

  // =========================
  // UPDATE HOLIDAY
  // =========================

  const handleUpdateHoliday = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const token = localStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/holidays/${editingHoliday._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: formData.name,
            date: formData.date,
            description: formData.description,
            status: editingHoliday.status,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update holiday");
      }

      alert("Holiday updated successfully!");

      setEditingHoliday(null);
      resetForm();

      await fetchHolidays();
    } catch (error) {
      console.error("Update holiday error:", error);
      alert(error.message);
    } finally {
      setSaving(false);
    }
  };

  // =========================
  // DELETE HOLIDAY
  // =========================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this holiday?",
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/holidays/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete holiday");
      }

      alert("Holiday deleted successfully!");

      setSelectedHoliday(null);

      await fetchHolidays();
    } catch (error) {
      console.error("Delete holiday error:", error);
      alert(error.message);
    }
  };

  // =========================
  // SEARCH
  // =========================

const filteredHolidays = holidays.filter((holiday) => {
  const searchText = search.trim().toLowerCase();

  if (!searchText) {
    return true;
  }

  return (
    holiday.holidayId?.toLowerCase().includes(searchText) ||
    holiday.name?.toLowerCase().includes(searchText) ||
    holiday.description?.toLowerCase().includes(searchText)
  );
});

const handleSearch = (value) => {
  setSearch(value);

  const searchText = value.trim().toLowerCase();

  if (!searchText) {
    return;
  }

  const foundHoliday = holidays.find((holiday) => {
    return (
      holiday.holidayId?.toLowerCase().includes(searchText) ||
      holiday.name?.toLowerCase().includes(searchText) ||
      holiday.description?.toLowerCase().includes(searchText)
    );
  });

  if (foundHoliday?.date) {
    const holidayDate = new Date(foundHoliday.date);

    setCurrentDate(
      new Date(
        holidayDate.getFullYear(),
        holidayDate.getMonth(),
        1
      )
    );
  }
};

  // =========================
  // MONTH / YEAR
  // =========================

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthName = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  // =========================
  // CALENDAR DAYS
  // =========================

  const calendarDays = useMemo(() => {
    const firstDay = new Date(year, month, 1).getDay();

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  }, [year, month]);

  // =========================
  // DATE HELPERS
  // =========================

  const getHolidayDate = (holiday) => {
    if (!holiday.date) return "";

    return new Date(holiday.date).toLocaleDateString("en-CA");
  };

  const getDayHoliday = (day) => {
    if (!day) return null;

    const calendarDate = `${year}-${String(month + 1).padStart(
      2,
      "0",
    )}-${String(day).padStart(2, "0")}`;

    return holidays.find(
  (holiday) => getHolidayDate(holiday) === calendarDate,
);
  };

  // =========================
  // NAVIGATION
  // =========================

  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // =========================
  // FORMAT DATE
  // =========================

  const formatHolidayDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  // =========================
  // UI
  // =========================

  return (
    <div className="p-4 sm:p-6 bg-blue-100 min-h-screen">
      {/* =========================
          HEADER
      ========================= */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Holiday Calendar
          </h1>

          <p className="text-sm sm:text-base text-gray-500 mt-1">
            Manage organization holidays.
          </p>
        </div>

        <button
          type="button"
          onClick={() => openAddModal()}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-medium transition"
        >
          <Plus size={18} />
          Add Holiday
        </button>
      </div>

      {/* =========================
          SEARCH
      ========================= */}

      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="relative max-w-md">
          <Search
            size={19}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search holidays..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* =========================
          CALENDAR
      ========================= */}

      <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6">
        {/* Calendar Header */}

        <div className="flex items-center justify-between mb-6">
          <button
            type="button"
            onClick={previousMonth}
            className="p-2 sm:p-2.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="text-center">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800">
              {monthName}
            </h2>

            <button
              type="button"
              onClick={goToToday}
              className="text-sm text-blue-600 hover:underline mt-1"
            >
              Today
            </button>
          </div>

          <button
            type="button"
            onClick={nextMonth}
            className="p-2 sm:p-2.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {search.trim() && (
  <div className="mt-3 text-sm text-gray-500">
    {filteredHolidays.length > 0 ? (
      <>
        Showing{" "}
        <span className="font-semibold text-blue-600">
          {filteredHolidays.length}
        </span>{" "}
        holiday
        {filteredHolidays.length !== 1 ? "s" : ""} matching{" "}
        <span className="font-semibold">
          "{search}"
        </span>
      </>
    ) : (
      <span className="text-red-500">
        No holidays found for "{search}"
      </span>
    )}
  </div>
)}

        {/* Week Days */}

        <div className="grid grid-cols-7 border-b border-gray-200">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div
              key={day}
              className="text-center text-xs sm:text-sm font-semibold text-gray-500 py-3"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar */}

        {loading ? (
          <div className="py-16 text-center text-gray-500">
            Loading holidays...
          </div>
        ) : (
          <div className="grid grid-cols-7">
            {calendarDays.map((day, index) => {
              const holiday = getDayHoliday(day);

              const today = new Date();

              const isToday =
                day &&
                today.getDate() === day &&
                today.getMonth() === month &&
                today.getFullYear() === year;

              return (
                <div
                  key={index}
                  onDoubleClick={() => {
                    if (day && !holiday) {
                      const selectedDate = `${year}-${String(
                        month + 1,
                      ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

                      openAddModal(selectedDate);
                    }
                  }}
                  className={`relative min-h-[80px] sm:min-h-[105px] border-b border-r border-gray-100 p-1.5 sm:p-2 ${
                    !day ? "bg-gray-50" : "bg-white"
                  } ${
                    day && !holiday ? "hover:bg-gray-50 cursor-pointer" : ""
                  }`}
                >
                  {day && (
                    <div className="h-full">
                      {/* Day Number */}

                      <div
                        className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs sm:text-sm font-medium ${
                          isToday
                            ? "bg-blue-600 text-white"
                            : holiday
                              ? "text-blue-700 font-bold"
                              : "text-gray-700"
                        }`}
                      >
                        {day}
                      </div>

                      {/* Holiday */}

                      {holiday && (
                        <div className="relative mt-2 group">
                          <button
                            type="button"
                            onClick={() => setSelectedHoliday(holiday)}
                            className="w-full text-left focus:outline-none"
                          >
                            <div
                              className={`flex items-center gap-1.5 rounded-md px-1.5 sm:px-2 py-1.5 border transition ${
                                holiday.status === "active"
                                  ? "bg-blue-50 border-blue-200 hover:bg-blue-100 hover:border-blue-400"
                                  : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                              }`}
                            >
                              <span className="text-xs">🎉</span>

                              <span className="hidden sm:block text-xs font-semibold truncate text-blue-700">
                                {holiday.name}
                              </span>

                              <span className="sm:hidden text-xs font-semibold text-blue-700">
                                Holiday
                              </span>
                            </div>
                          </button>

                          {/* Hover Tooltip */}

                          <div className="absolute z-30 left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-52">
                            <div className="bg-gray-900 text-white rounded-lg shadow-xl p-3">
                              <div className="flex items-start gap-2">
                                <span>🎉</span>

                                <div className="min-w-0">
                                  <p className="text-xs sm:text-sm font-semibold break-words">
                                    {holiday.name}
                                  </p>

                                  <p className="text-[10px] sm:text-xs text-gray-300 mt-1">
                                    {formatHolidayDate(holiday.date)}
                                  </p>

                                  <p className="text-[10px] text-gray-400 mt-1">
                                    Status: {holiday.status}
                                  </p>
                                </div>
                              </div>

                              <div className="absolute left-1/2 -translate-x-1/2 top-full border-8 border-transparent border-t-gray-900" />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Legend */}

        <div className="flex flex-wrap items-center gap-4 mt-5 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-blue-100 border border-blue-200" />
            <span>Active Holiday</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-gray-100 border border-gray-200" />
            <span>Inactive Holiday</span>
          </div>

          <span className="text-xs text-gray-400">
            Double-click an empty date to add a holiday
          </span>
        </div>
      </div>

      {/* =========================
          HOLIDAY DETAILS MODAL
      ========================= */}

      {selectedHoliday && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => setSelectedHoliday(null)}
        >
          <div
            className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-5 sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}

            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
                  <PartyPopper size={23} className="text-blue-600" />
                </div>

                <div>
                  <p className="text-xs font-medium text-blue-600">
                    Organization Holiday
                  </p>

                  <h2 className="text-lg sm:text-xl font-bold text-gray-800 mt-0.5">
                    {selectedHoliday.name}
                  </h2>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedHoliday(null)}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            {/* Date */}

            <div className="mt-6 bg-blue-50 border border-blue-100 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <CalendarDays size={21} className="text-blue-600" />

                <div>
                  <p className="text-xs text-gray-500">Holiday Date</p>

                  <p className="font-semibold text-gray-800 mt-0.5">
                    {formatHolidayDate(selectedHoliday.date)}
                  </p>
                </div>
              </div>
            </div>

            {/* Holiday ID */}

            <div className="mt-4">
              <p className="text-sm font-semibold text-gray-700 mb-2">
                Holiday ID
              </p>

              <div className="border border-gray-200 rounded-xl p-3">
                <p className="text-sm text-gray-600">
                  {selectedHoliday.holidayId}
                </p>
              </div>
            </div>

            {/* Status */}

            <div className="mt-4">
              <p className="text-sm font-semibold text-gray-700 mb-2">Status</p>

              <span
                className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                  selectedHoliday.status === "active"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {selectedHoliday.status}
              </span>
            </div>

            {/* Description */}

            {selectedHoliday.description && (
              <div className="mt-4">
                <p className="text-sm font-semibold text-gray-700 mb-2">
                  Description
                </p>

                <div className="border border-gray-200 rounded-xl p-4">
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {selectedHoliday.description}
                  </p>
                </div>
              </div>
            )}

            {/* Actions */}

            <div className="grid grid-cols-2 gap-3 mt-6">
              <button
                type="button"
                onClick={() => handleEdit(selectedHoliday)}
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
              >
                <Pencil size={17} />
                Edit
              </button>

              <button
                type="button"
                onClick={() => handleDelete(selectedHoliday._id)}
                className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition"
              >
                <Trash2 size={17} />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================
          ADD MODAL
      ========================= */}

      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h2 className="text-xl font-semibold text-gray-800">
                Add Holiday
              </h2>

              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddHoliday} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Holiday ID
                </label>

                <input
                  type="text"
                  name="holidayId"
                  value={formData.holidayId}
                  onChange={handleChange}
                  placeholder="H001"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Holiday Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Independence Day"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>

                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Holiday description..."
                  rows="3"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50"
                >
                  {saving ? "Adding..." : "Add Holiday"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================
          EDIT MODAL
      ========================= */}

      {editingHoliday && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h2 className="text-xl font-semibold text-gray-800">
                Edit Holiday
              </h2>

              <button
                type="button"
                onClick={() => setEditingHoliday(null)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleUpdateHoliday} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Holiday ID
                </label>

                <input
                  type="text"
                  value={formData.holidayId}
                  disabled
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-100 text-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Holiday Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>

                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>

                <select
                  value={editingHoliday.status}
                  onChange={(e) =>
                    setEditingHoliday((prev) => ({
                      ...prev,
                      status: e.target.value,
                    }))
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="active">Active</option>

                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingHoliday(null)}
                  className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Holidays;
