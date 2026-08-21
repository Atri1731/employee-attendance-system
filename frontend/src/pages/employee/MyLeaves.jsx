// function MyLeaves() {
//   return (
//     <div className="p-6  min-h-screen bg-blue-100">

//       {/* Page Header */}
//       <div className="mb-6 text-center">
//         <h1 className="text-2xl font-bold text-gray-800">
//           My Leaves
//         </h1>

//         <p className="text-gray-500 mt-1">
//           View your leave requests and their current status.
//         </p>
//       </div>

//       {/* Leave Summary */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">

//         {/* Pending */}
//         <div className="bg-white border border-gray-200 rounded-xl p-6">
//           <p className="text-sm text-gray-500">
//             Pending Requests
//           </p>

//           <p className="text-2xl font-bold text-yellow-600 mt-2">
//             —
//           </p>
//         </div>

//         {/* Approved */}
//         <div className="bg-white border border-gray-200 rounded-xl p-6">
//           <p className="text-sm text-gray-500">
//             Approved Leaves
//           </p>

//           <p className="text-2xl font-bold text-green-600 mt-2">
//             —
//           </p>
//         </div>

//         {/* Rejected */}
//         <div className="bg-white border border-gray-200 rounded-xl p-6">
//           <p className="text-sm text-gray-500">
//             Rejected Leaves
//           </p>

//           <p className="text-2xl font-bold text-red-600 mt-2">
//             —
//           </p>
//         </div>

//       </div>

//       {/* Leave Requests */}
//       <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">

//         <div className="p-5 border-b border-gray-200">
//           <h2 className="text-lg font-semibold text-gray-800">
//             My Leave Requests
//           </h2>
//         </div>

//         <div className="overflow-x-auto">

//           <table className="w-full">

//             <thead className="bg-gray-50 border-b border-gray-200">

//               <tr>

//                 <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
//                   Leave Type
//                 </th>

//                 <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
//                   From
//                 </th>

//                 <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
//                   To
//                 </th>

//                 <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
//                   Reason
//                 </th>

//                 <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
//                   Status
//                 </th>

//               </tr>

//             </thead>

//             <tbody>

//               <tr>

//                 <td
//                   colSpan="5"
//                   className="px-6 py-16 text-center"
//                 >

//                   <p className="text-lg font-medium text-gray-400">
//                     No leave requests found
//                   </p>

//                   <p className="text-sm text-gray-400 mt-1">
//                     Your submitted leave requests will appear here.
//                   </p>

//                 </td>

//               </tr>

//             </tbody>

//           </table>

//         </div>

//       </div>

//     </div>
//   );
// }

// export default MyLeaves;

import { useEffect, useState } from "react";

function MyLeaves() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyLeaves();
  }, []);

  const fetchMyLeaves = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/leaves/my",
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
      console.error("Fetch leaves error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Leave statistics
  const pendingLeaves = leaves.filter(
    (leave) => leave.status === "pending"
  ).length;

  const approvedLeaves = leaves.filter(
    (leave) => leave.status === "approved"
  ).length;

  const rejectedLeaves = leaves.filter(
    (leave) => leave.status === "rejected"
  ).length;

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
    <div className="p-6 min-h-screen bg-blue-100">

      {/* Page Header */}
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-gray-800">
          My Leaves
        </h1>

        <p className="text-gray-500 mt-1">
          View your leave requests and their current status.
        </p>
      </div>

      {/* Leave Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">

        {/* Pending */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <p className="text-sm text-gray-500">
            Pending Requests
          </p>

          <p className="text-2xl font-bold text-yellow-600 mt-2">
            {pendingLeaves}
          </p>
        </div>

        {/* Approved */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <p className="text-sm text-gray-500">
            Approved Leaves
          </p>

          <p className="text-2xl font-bold text-green-600 mt-2">
            {approvedLeaves}
          </p>
        </div>

        {/* Rejected */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <p className="text-sm text-gray-500">
            Rejected Leaves
          </p>

          <p className="text-2xl font-bold text-red-600 mt-2">
            {rejectedLeaves}
          </p>
        </div>

      </div>

      {/* Leave Requests */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">

        <div className="p-5 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">
            My Leave Requests
          </h2>
        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gray-50 border-b border-gray-200">

              <tr>

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

              </tr>

            </thead>

            <tbody>

              {loading ? (

                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-16 text-center text-gray-500"
                  >
                    Loading leave requests...
                  </td>
                </tr>

              ) : leaves.length === 0 ? (

                <tr>

                  <td
                    colSpan="5"
                    className="px-6 py-16 text-center"
                  >

                    <p className="text-lg font-medium text-gray-400">
                      No leave requests found
                    </p>

                    <p className="text-sm text-gray-400 mt-1">
                      Your submitted leave requests will appear here.
                    </p>

                  </td>

                </tr>

              ) : (

                leaves.map((leave) => (

                  <tr
                    key={leave._id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >

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

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default MyLeaves;