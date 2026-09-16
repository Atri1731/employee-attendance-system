

import { useEffect, useState } from "react";

function LeaveManagement() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [leaveType, setLeaveType] = useState("");
  const [status, setStatus] = useState("");

  const [showPaymentModal, setShowPaymentModal] = useState(false);
const [selectedLeave, setSelectedLeave] = useState(null);
const [selectedPayment, setSelectedPayment] = useState("paid");

  useEffect(() => {
    fetchLeaves();
  }, []);

  // Fetch all leave requests
  const fetchLeaves = async () => {
    try {
      const token = sessionStorage.getItem("token");

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
          data.message || "Failed to fetch leave requests"
        );
      }

      setLeaves(data.leaves || []);
    } catch (error) {
      console.error("Fetch leaves error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Approve / Reject leave
 const updateLeaveStatus = async (
  id,
  newStatus,
  leavePayment = null
) => {
    try {
      const token = sessionStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/leaves/${id}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
body: JSON.stringify({
  status: newStatus,
  ...(newStatus === "approved" && {
    leavePayment,
  }),
}),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update leave status"
        );
      }

      alert(`Leave ${newStatus} successfully!`);

      // Refresh data
      fetchLeaves();
    } catch (error) {
      console.error("Update leave status error:", error);

      alert(error.message);
    }
  };

  const openApprovalModal = (leave) => {
  setSelectedLeave(leave);
  setSelectedPayment("paid");
  setShowPaymentModal(true);
};

const handleApproveLeave = async () => {
  if (!selectedLeave) return;

  await updateLeaveStatus(
    selectedLeave._id,
    "approved",
    selectedPayment
  );

  setShowPaymentModal(false);
  setSelectedLeave(null);
};

  // Filter leaves
  const filteredLeaves = leaves.filter((leave) => {
    const employeeName =
      leave.employee?.name?.toLowerCase() || "";

    const employeeId =
      leave.employee?.employeeId?.toLowerCase() || "";

    const searchValue = search.toLowerCase();

    const matchesSearch =
      employeeName.includes(searchValue) ||
      employeeId.includes(searchValue);

    const matchesLeaveType =
      leaveType === "" ||
      leave.leaveType === leaveType;

    const matchesStatus =
      status === "" ||
      leave.status === status;

    return (
      matchesSearch &&
      matchesLeaveType &&
      matchesStatus
    );
  });

  // Format date
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Format leave type
  const formatLeaveType = (type) => {
    if (!type) return "—";

    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  return (
    <div className="p-6 bg-blue-100 min-h-screen">

      {/* Page Header */}
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-gray-800">
          Leave Management
        </h1>

        <p className="text-gray-500 mt-1">
          Review and manage employee leave requests.
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 mb-6">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* Search */}
          <input
            type="text"
            placeholder="Search employee..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Leave Type */}
          <select
            value={leaveType}
            onChange={(e) => setLeaveType(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Leave Types</option>
            <option value="casual">Casual Leave</option>
            <option value="medical">Medical Leave</option>
            <option value="annual">Annual Leave</option>
            <option value="other">Other</option>
          </select>

          {/* Status */}
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>

        </div>

      </div>

      {/* Leave Requests */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">

        <div className="p-5 border-b border-gray-200 text-center">
          <h2 className="text-lg font-semibold text-gray-800">
            Leave Requests
          </h2>
        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gray-50 border-b border-gray-200">

              <tr>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Employee
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Leave Type
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  From
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  To
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Reason
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
                    colSpan="7"
                    className="px-6 py-16 text-center text-gray-500"
                  >
                    Loading leave requests...
                  </td>
                </tr>

              ) : filteredLeaves.length === 0 ? (

                <tr>

                  <td
                    colSpan="7"
                    className="px-6 py-16 text-center"
                  >

                    <p className="text-lg font-medium text-gray-400">
                      No leave requests found
                    </p>

                    <p className="text-sm text-gray-400 mt-1">
                      Employee leave requests will appear here.
                    </p>

                  </td>

                </tr>

              ) : (

                filteredLeaves.map((leave) => (

                  <tr
                    key={leave._id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >

                    {/* Employee */}
                    <td className="px-6 py-4">

                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          {leave.employee?.name || "Unknown"}
                        </p>

                        <p className="text-xs text-gray-500">
                          ID:{" "}
                          {leave.employee?.employeeId || "—"}
                        </p>
                      </div>

                    </td>

                    {/* Leave Type */}
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {formatLeaveType(leave.leaveType)}
                    </td>

                    {/* From */}
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {formatDate(leave.fromDate)}
                    </td>

                    {/* To */}
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {formatDate(leave.toDate)}
                    </td>

                    {/* Reason */}
                    <td className="px-6 py-4 text-sm text-gray-700 max-w-xs">
                      <p className="truncate">
                        {leave.reason}
                      </p>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">

                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                          leave.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : leave.status === "approved"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {leave.status.charAt(0).toUpperCase() +
                          leave.status.slice(1)}
                      </span>

                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">

                      {leave.status === "pending" ? (

                        <div className="flex gap-2">

                          <button
                          onClick={() => openApprovalModal(leave)}
                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-xs font-semibold transition"
                          >
                            Approve
                          </button>

                          <button
                            onClick={() =>
                              updateLeaveStatus(
                                leave._id,
                                "rejected"
                              )
                            }
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-xs font-semibold transition"
                          >
                            Reject
                          </button>

                        </div>

                      ) : (

                        <span className="text-sm text-gray-400">
                          No action
                        </span>

                      )}

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>
      
      {showPaymentModal && selectedLeave && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
      
      <h2 className="text-xl font-bold text-gray-900">
        Approve Leave
      </h2>

      <p className="mt-2 text-sm text-gray-500">
        Select whether this leave should be paid or unpaid.
      </p>

      <div className="mt-5 space-y-3">

        {/* Paid */}
        <label
          className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition ${
            selectedPayment === "paid"
              ? "border-green-500 bg-green-50"
              : "border-gray-200 hover:bg-gray-50"
          }`}
        >
          <input
            type="radio"
            name="leavePayment"
            value="paid"
            checked={selectedPayment === "paid"}
            onChange={(e) => setSelectedPayment(e.target.value)}
          />

          <div>
            <p className="font-semibold text-gray-900">
              Paid Leave
            </p>
            <p className="text-sm text-gray-500">
              Employee will receive salary for this leave.
            </p>
          </div>
        </label>

        {/* Unpaid */}
        <label
          className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition ${
            selectedPayment === "unpaid"
              ? "border-red-500 bg-red-50"
              : "border-gray-200 hover:bg-gray-50"
          }`}
        >
          <input
            type="radio"
            name="leavePayment"
            value="unpaid"
            checked={selectedPayment === "unpaid"}
            onChange={(e) => setSelectedPayment(e.target.value)}
          />

          <div>
            <p className="font-semibold text-gray-900">
              Unpaid Leave
            </p>
            <p className="text-sm text-gray-500">
              Salary will be deducted for this leave.
            </p>
          </div>
        </label>

      </div>

      <div className="mt-6 flex justify-end gap-3">

        <button
          onClick={() => {
            setShowPaymentModal(false);
            setSelectedLeave(null);
          }}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>

        <button
          onClick={handleApproveLeave}
          className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
        >
          Approve Leave
        </button>

      </div>
    </div>
  </div>
)}

    </div>
  );
}

export default LeaveManagement;