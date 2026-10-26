
import { useState } from "react";
import { UserPlus, Eye, EyeOff  } from "lucide-react";
function AdminManagement() {
const [showPassword, setShowPassword] = useState(false);
  
  
    const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const token = sessionStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/admins`,
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
        throw new Error(data.message || "Unable to create Admin.");
      }

      setMessage("Admin account created successfully!");

      setFormData({
        name: "",
        email: "",
        password: "",
        phone: "",
      });
    } catch (error) {
      setMessage(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
   <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-6">
  <div className="w-full max-w-xl">
    <div className="mb-6 text-center">
      <h1 className="text-2xl font-bold text-gray-800">
        Admin Management
      </h1>

      <p className="mt-1 text-gray-500">
        Create and manage administrator accounts.
      </p>
    </div>
      <form
        onSubmit={handleSubmit}
        className="max-w-xl space-y-5 rounded-xl bg-white p-6 shadow-sm border border-gray-200"
      >
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Admin name"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="admin@company.com"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter phone number"
          />
        </div>

      
<div>
  <label className="mb-2 block text-sm font-medium text-gray-700">
    Temporary Password
  </label>

  <div className="relative">
    <input
      type={showPassword ? "text" : "password"}
      name="password"
      value={formData.password}
      onChange={handleChange}
      minLength={8}
      required
      className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-12 outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="At least 8 characters"
    />

    <button
      type="button"
      onClick={() => setShowPassword((prev) => !prev)}
      aria-label={showPassword ? "Hide password" : "Show password"}
      className="absolute right-0 top-0 flex h-full w-12 items-center justify-center text-gray-500 hover:text-blue-600"
    >
      {showPassword ? (
        <Eye size={20} />
      ) : (
        <EyeOff size={20} />
      )}
    </button>
  </div>
</div>


        {message && (
          <p role="status" className="text-sm text-blue-700">
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
        >
          <UserPlus size={18} />
          {loading ? "Creating..." : "Create Admin"}
        </button>
      </form>
    </div>
    </div>
  );
}

export default AdminManagement;
