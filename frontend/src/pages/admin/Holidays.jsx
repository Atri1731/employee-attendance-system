import { useEffect, useState } from "react";
import {
  CalendarDays,
  Plus,
  Pencil,
  Trash2,
  X,
  Search,
} from "lucide-react";

function Holidays() {
  const [holidays, setHolidays] = useState([]);
  const [search, setSearch] = useState("");

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingHoliday, setEditingHoliday] = useState(null);

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

      const response = await fetch(
        "http://localhost:5000/api/holidays",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch holidays"
        );
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
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // ADD HOLIDAY
  // =========================

  const handleAddHoliday = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/holidays",
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
          data.message || "Failed to add holiday"
        );
      }

      alert("Holiday added successfully!");

      setFormData({
        holidayId: "",
        name: "",
        date: "",
        description: "",
      });

      setShowAddModal(false);

      fetchHolidays();
    } catch (error) {
      console.error("Add holiday error:", error);
      alert(error.message);
    } finally {
      setSaving(false);
    }
  };

  // =========================
  // EDIT HOLIDAY
  // =========================

  const handleEdit = (holiday) => {
    setEditingHoliday(holiday);

    setFormData({
      holidayId: holiday.holidayId,
      name: holiday.name,
      date: holiday.date
        ? holiday.date.split("T")[0]
        : "",
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
        `http://localhost:5000/api/holidays/${editingHoliday._id}`,
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
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update holiday"
        );
      }

      alert("Holiday updated successfully!");

      setEditingHoliday(null);

      setFormData({
        holidayId: "",
        name: "",
        date: "",
        description: "",
      });

      fetchHolidays();
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
      "Are you sure you want to delete this holiday?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/holidays/${id}`,
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
          data.message || "Failed to delete holiday"
        );
      }

      alert("Holiday deleted successfully!");

      fetchHolidays();
    } catch (error) {
      console.error("Delete holiday error:", error);
      alert(error.message);
    }
  };

  // =========================
  // SEARCH
  // =========================

  const filteredHolidays = holidays.filter((holiday) => {
    const searchText = search.toLowerCase();

    return (
      holiday.holidayId
        ?.toLowerCase()
        .includes(searchText) ||
      holiday.name
        ?.toLowerCase()
        .includes(searchText) ||
      holiday.description
        ?.toLowerCase()
        .includes(searchText)
    );
  });

  // =========================
  // FORMAT DATE
  // =========================

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="p-6 min-h-screen bg-blue-100">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Holidays
          </h1>

          <p className="text-gray-500 mt-1">
            Manage holidays in your organization.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setFormData({
              holidayId: "",
              name: "",
              date: "",
              description: "",
            });

            setShowAddModal(true);
          }}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-medium transition"
        >
          <Plus size={18} />
          Add Holiday
        </button>
      </div>

      {/* SEARCH */}
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
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">

        <div className="overflow-x-auto">
          <table className="w-full">

            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Holiday ID
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Holiday
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Date
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Description
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Status
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y">

              {loading ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    Loading holidays...
                  </td>
                </tr>
              ) : filteredHolidays.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-12 text-center"
                  >
                    <CalendarDays
                      size={40}
                      className="mx-auto text-gray-300 mb-3"
                    />

                    <p className="text-lg font-medium text-gray-400">
                      No holidays found
                    </p>

                    <p className="text-sm text-gray-400 mt-1">
                      Add a holiday to get started.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredHolidays.map((holiday) => (
                  <tr
                    key={holiday._id}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {holiday.holidayId}
                    </td>

                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-800">
                        {holiday.name}
                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-600">
                      {formatDate(holiday.date)}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-600 max-w-xs">
                      {holiday.description || "-"}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          holiday.status === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {holiday.status}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">

                        <button
                          type="button"
                          onClick={() =>
                            handleEdit(holiday)
                          }
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                          title="Edit"
                        >
                          <Pencil size={17} />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(holiday._id)
                          }
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                          title="Delete"
                        >
                          <Trash2 size={17} />
                        </button>

                      </div>
                    </td>
                  </tr>
                ))
              )}

            </tbody>
          </table>
        </div>
      </div>

      {/* ADD MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">

          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg">

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

            <form
              onSubmit={handleAddHoliday}
              className="p-6 space-y-4"
            >

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

      {/* EDIT MODAL */}
      {editingHoliday && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">

          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg">

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

            <form
              onSubmit={handleUpdateHoliday}
              className="p-6 space-y-4"
            >

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
                  <option value="active">
                    Active
                  </option>

                  <option value="inactive">
                    Inactive
                  </option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-2">

                <button
                  type="button"
                  onClick={() =>
                    setEditingHoliday(null)
                  }
                  className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50"
                >
                  {saving
                    ? "Saving..."
                    : "Save Changes"}
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