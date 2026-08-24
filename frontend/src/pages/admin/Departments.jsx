import {useEffect, useState} from "react";
import {Building2, Plus, Pencil, Trash2, X} from "lucide-react";

function Departments() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);

  const [departmentId, setDepartmentId] = useState("");
  const [departmentName, setDepartmentName] = useState("");

  const [saving, setSaving] = useState(false);

  const [editingDepartment, setEditingDepartment] = useState(null);
  const [editName, setEditName] = useState("");
  const [editStatus, setEditStatus] = useState("active");

  // Fetch departments
  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const token = localStorage.getItem("token");

const response = await fetch(
  `${import.meta.env.VITE_API_URL}/departments`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  },
);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch departments");
      }

      setDepartments(data.departments || []);
    } catch (error) {
      console.error("Fetch departments error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Add department
  const handleAddDepartment = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const token = localStorage.getItem("token");
   const response = await fetch(
  `${import.meta.env.VITE_API_URL}/departments`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      departmentId,
      name: departmentName,
    }),
  },
);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add department");
      }

      alert("Department added successfully!");

      setDepartmentId("");
      setDepartmentName("");
      setShowModal(false);

      fetchDepartments();
    } catch (error) {
      console.error("Add department error:", error);

      alert(error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (department) => {
    setEditingDepartment(department);
    setEditName(department.name);
    setEditStatus(department.status);
  };

  const handleUpdateDepartment = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const token = localStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/departments/${editingDepartment._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: editName,
            status: editStatus,
          }),
        },
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update department");
      }

      alert("Department updated successfully!");

      setEditingDepartment(null);
      setEditName("");
      setEditStatus("active");

      fetchDepartments();
    } catch (error) {
      console.error("Update department error:", error);
      alert(error.message);
    } finally {
      setSaving(false);
    }
  };

  // Delete department
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this department?",
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/departments/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete department");
      }

      alert("Department deleted successfully!");

      fetchDepartments();
    } catch (error) {
      console.error("Delete department error:", error);

      alert(error.message);
    }
  };

  const totalEmployees = departments.reduce(
    (total, department) => total + (department.employeeCount || 0),
    0,
  );

  const activeDepartments = departments.filter(
    (department) => department.status === "active",
  ).length;

  return (
    <div className="p-6 min-h-screen bg-blue-100">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 text-">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Departments</h1>

          <p className="text-gray-500 mt-1">
            Manage departments in your organization.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-semibold transition"
        >
          <Plus size={18} />
          Add Department
        </button>
      </div>

      {/* Department Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
              <Building2 size={20} />
            </div>

            <div>
              <p className="text-sm text-gray-500">Total Departments</p>

              <p className="text-2xl font-bold text-gray-800">
                {departments.length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <p className="text-sm text-gray-500">Active Departments</p>

          <p className="text-2xl font-bold text-green-600 mt-2">
            {activeDepartments}
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <p className="text-sm text-gray-500">Total Employees</p>

          <p className="text-2xl font-bold text-gray-800 mt-2">
            {totalEmployees}
          </p>
        </div>
      </div>

      {/* Department Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="p-5 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">
            Department List
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Department ID
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Department Name
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Employees
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Status
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-16 text-center text-gray-500"
                  >
                    Loading departments...
                  </td>
                </tr>
              ) : departments.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-16 text-center">
                    <p className="text-lg font-medium text-gray-400">
                      No departments found
                    </p>

                    <p className="text-sm text-gray-400 mt-1">
                      Departments added to the system will appear here.
                    </p>
                  </td>
                </tr>
              ) : (
                departments.map((department) => (
                  <tr
                    key={department._id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {department.departmentId}
                    </td>

                    <td className="px-6 py-4 text-sm font-medium text-gray-800">
                      {department.name}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-700">
                      {department.employeeCount}
                    </td>

                    <td className="px-6 py-4">
                      <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                        {department.status}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => handleEdit(department)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                          title="Edit"
                        >
                          <Pencil size={17} />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(department._id)}
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

      {/* Add Department Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-gray-800">
                Add Department
              </h2>

              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={22} />
              </button>
            </div>

            <form onSubmit={handleAddDepartment}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Department ID
                </label>

                <input
                  type="text"
                  value={departmentId}
                  onChange={(e) => setDepartmentId(e.target.value)}
                  placeholder="e.g. DEP001"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Department Name
                </label>

                <input
                  type="text"
                  value={departmentName}
                  onChange={(e) => setDepartmentName(e.target.value)}
                  placeholder="e.g. Engineering"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                disabled={saving}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
              >
                {saving ? "Adding..." : "Add Department"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Edit Department Modal */}
      {editingDepartment && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-gray-800">
                Edit Department
              </h2>

              <button
                type="button"
                onClick={() => setEditingDepartment(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={22} />
              </button>
            </div>

            <form onSubmit={handleUpdateDepartment}>
              {/* Department ID */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Department ID
                </label>

                <input
                  type="text"
                  value={editingDepartment.departmentId}
                  disabled
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-100 text-gray-500"
                />
              </div>

              {/* Department Name */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Department Name
                </label>

                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Status */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>

                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
              >
                {saving ? "Updating..." : "Update Department"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Departments;
