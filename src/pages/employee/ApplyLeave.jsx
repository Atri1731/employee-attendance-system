// // import { useState } from "react";

// // function ApplyLeave() {
// //   const [formData, setFormData] = useState({
// //     leaveType: "",
// //     fromDate: "",
// //     toDate: "",
// //     reason: "",
// //   });

// //   function handleChange(e) {
// //     const { name, value } = e.target;

// //     setFormData((prev) => ({
// //       ...prev,
// //       [name]: value,
// //     }));
// //   }

// //   function handleSubmit(e) {
// //     e.preventDefault();

// //     // Backend connection will be added later.
// //     console.log(formData);
// //   }

// //   return (
// //     <div className="p-6  min-h-screen bg-blue-100 ">

// //       {/* Page Header */}
// //       <div className="mb-6 text-center">
// //         <h1 className="text-2xl font-bold text-gray-800 justify-center">
// //           Apply for Leave
// //         </h1>

// //         <p className="text-gray-500 mt-1">
// //           Submit a leave request to your administrator.
// //         </p>
// //       </div>

// //       {/* Leave Form */}
// //       <div className="bg-white border border-gray-200 rounded-xl p-6 max-w-3xl mx-auto">

// //         <form onSubmit={handleSubmit}>

// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

// //             {/* Leave Type */}
// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-2">
// //                 Leave Type
// //               </label>

// //               <select
// //                 name="leaveType"
// //                 value={formData.leaveType}
// //                 onChange={handleChange}
// //                 required
// //                 className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
// //               >
// //                 <option value="">Select leave type</option>
// //                 <option value="casual">Casual Leave</option>
// //                 <option value="medical">Medical Leave</option>
// //                 <option value="annual">Annual Leave</option>
// //                 <option value="other">Other</option>
// //               </select>
// //             </div>

// //             {/* From Date */}
// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-2">
// //                 From Date
// //               </label>

// //               <input
// //                 type="date"
// //                 name="fromDate"
// //                 value={formData.fromDate}
// //                 onChange={handleChange}
// //                 required
// //                 className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
// //               />
// //             </div>

// //             {/* To Date */}
// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-2">
// //                 To Date
// //               </label>

// //               <input
// //                 type="date"
// //                 name="toDate"
// //                 value={formData.toDate}
// //                 onChange={handleChange}
// //                 required
// //                 className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
// //               />
// //             </div>

// //           </div>

// //           {/* Reason */}
// //           <div className="mt-5">

// //             <label className="block text-sm font-medium text-gray-700 mb-2">
// //               Reason
// //             </label>

// //             <textarea
// //               name="reason"
// //               value={formData.reason}
// //               onChange={handleChange}
// //               required
// //               rows="5"
// //               placeholder="Enter the reason for your leave..."
// //               className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-blue-500"
// //             />

// //           </div>

// //           {/* Buttons */}
// //           <div className="flex gap-3 mt-6">

// //             <button
// //               type="submit"
// //               className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
// //             >
// //               Submit Leave Request
// //             </button>

// //             <button
// //               type="button"
// //               onClick={() =>
// //                 setFormData({
// //                   leaveType: "",
// //                   fromDate: "",
// //                   toDate: "",
// //                   reason: "",
// //                 })
// //               }
// //               className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-semibold transition"
// //             >
// //               Clear
// //             </button>

// //           </div>

// //         </form>

// //       </div>

// //     </div>
// //   );
// // }

// // export default ApplyLeave;

// import { useState } from "react";

// function ApplyLeave() {
//   const [formData, setFormData] = useState({
//     leaveType: "",
//     fromDate: "",
//     toDate: "",
//     reason: "",
//   });

//   const [loading, setLoading] = useState(false);

//   function handleChange(e) {
//     const { name, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   }

//   async function handleSubmit(e) {
//     e.preventDefault();

//     // Check date
//     if (new Date(formData.toDate) < new Date(formData.fromDate)) {
//       alert("To date cannot be before from date.");
//       return;
//     }

//     try {
//       setLoading(true);

//       const token = localStorage.getItem("token");

//       const response = await fetch(
//         `${import.meta.env.VITE_API_URL}/leaves`,
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
//           data.message || "Failed to submit leave request"
//         );
//       }

//       alert("Leave request submitted successfully!");

//       // Clear form
//       setFormData({
//         leaveType: "",
//         fromDate: "",
//         toDate: "",
//         reason: "",
//       });
//     } catch (error) {
//       console.error("Apply leave error:", error);

//       alert(error.message);
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="p-6 min-h-screen bg-blue-100">

//       {/* Page Header */}
//       <div className="mb-6 text-center">
//         <h1 className="text-2xl font-bold text-gray-800">
//           Apply for Leave
//         </h1>

//         <p className="text-gray-500 mt-1">
//           Submit a leave request to your administrator.
//         </p>
//       </div>

//       {/* Leave Form */}
//       <div className="bg-white border border-gray-200 rounded-xl p-6 max-w-3xl mx-auto">

//         <form onSubmit={handleSubmit}>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

//             {/* Leave Type */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Leave Type
//               </label>

//               <select
//                 name="leaveType"
//                 value={formData.leaveType}
//                 onChange={handleChange}
//                 required
//                 className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="">Select leave type</option>
//                 <option value="casual">Casual Leave</option>
//                 <option value="medical">Medical Leave</option>
//                 <option value="annual">Annual Leave</option>
//                 <option value="other">Other</option>
//               </select>
//             </div>

//             {/* From Date */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 From Date
//               </label>

//               <input
//                 type="date"
//                 name="fromDate"
//                 value={formData.fromDate}
//                 onChange={handleChange}
//                 required
//                 className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             {/* To Date */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 To Date
//               </label>

//               <input
//                 type="date"
//                 name="toDate"
//                 value={formData.toDate}
//                 onChange={handleChange}
//                 required
//                 className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//           </div>

//           {/* Reason */}
//           <div className="mt-5">

//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Reason
//             </label>

//             <textarea
//               name="reason"
//               value={formData.reason}
//               onChange={handleChange}
//               required
//               rows="5"
//               placeholder="Enter the reason for your leave..."
//               className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-blue-500"
//             />

//           </div>

//           {/* Buttons */}
//           <div className="flex gap-3 mt-6">

//             <button
//               type="submit"
//               disabled={loading}
//               className={`bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition ${
//                 loading
//                   ? "opacity-60 cursor-not-allowed"
//                   : ""
//               }`}
//             >
//               {loading
//                 ? "Submitting..."
//                 : "Submit Leave Request"}
//             </button>

//             <button
//               type="button"
//               disabled={loading}
//               onClick={() =>
//                 setFormData({
//                   leaveType: "",
//                   fromDate: "",
//                   toDate: "",
//                   reason: "",
//                 })
//               }
//               className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-semibold transition"
//             >
//               Clear
//             </button>

//           </div>

//         </form>

//       </div>

//     </div>
//   );
// }

// export default ApplyLeave;

import { useState } from "react";

function ApplyLeave() {
  const [duration, setDuration] = useState("single");

  const [formData, setFormData] = useState({
    leaveType: "",
    fromDate: "",
    toDate: "",
    reason: "",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleDurationChange(type) {
    setDuration(type);

    // Clear dates when switching
    setFormData((prev) => ({
      ...prev,
      fromDate: "",
      toDate: "",
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // Single day
    if (duration === "single") {
      if (!formData.fromDate) {
        alert("Please select a date.");
        return;
      }
    }

    // Multiple days
    if (duration === "multiple") {
      if (!formData.fromDate || !formData.toDate) {
        alert("Please select both from and to dates.");
        return;
      }

      if (new Date(formData.toDate) < new Date(formData.fromDate)) {
        alert("To date cannot be before from date.");
        return;
      }
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      // For single day, send same date as fromDate and toDate
      const submitData = {
        ...formData,
        toDate:
          duration === "single"
            ? formData.fromDate
            : formData.toDate,
      };

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/leaves`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(submitData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to submit leave request"
        );
      }

      alert("Leave request submitted successfully!");

      setFormData({
        leaveType: "",
        fromDate: "",
        toDate: "",
        reason: "",
      });

      setDuration("single");
    } catch (error) {
      console.error("Apply leave error:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  function handleClear() {
    setFormData({
      leaveType: "",
      fromDate: "",
      toDate: "",
      reason: "",
    });

    setDuration("single");
  }

  return (
    <div className="min-h-screen bg-blue-50 p-4 sm:p-6">
      {/* Header */}
      <div className="mb-6 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Apply for Leave
        </h1>

        <p className="mt-1 text-sm sm:text-base text-gray-500">
          Submit a leave request to your administrator.
        </p>
      </div>

      {/* Form Card */}
      <div className="mx-auto max-w-3xl rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
        <form onSubmit={handleSubmit}>
          {/* Leave Type */}
          <div className="mb-6">
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Leave Type
            </label>

            <select
              name="leaveType"
              value={formData.leaveType}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            >
              <option value="">Select leave type</option>
              <option value="casual">Casual Leave</option>
              <option value="medical">Medical Leave</option>
              <option value="annual">Annual Leave</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Leave Duration */}
          <div className="mb-6">
            <label className="mb-3 block text-sm font-semibold text-gray-700">
              Leave Duration
            </label>

            <div className="flex flex-col gap-3 sm:flex-row">
              {/* Single Day */}
              <label
                className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 transition ${
                  duration === "single"
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-300 hover:bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  name="duration"
                  value="single"
                  checked={duration === "single"}
                  onChange={() => handleDurationChange("single")}
                  className="h-4 w-4 accent-blue-600"
                />

                <span className="font-medium text-gray-700">
                  Single Day
                </span>
              </label>

              {/* Multiple Days */}
              <label
                className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 transition ${
                  duration === "multiple"
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-300 hover:bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  name="duration"
                  value="multiple"
                  checked={duration === "multiple"}
                  onChange={() => handleDurationChange("multiple")}
                  className="h-4 w-4 accent-blue-600"
                />

                <span className="font-medium text-gray-700">
                  Multiple Days
                </span>
              </label>
            </div>
          </div>

          {/* Dates */}
          {duration === "single" ? (
            <div className="mb-6">
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Select Date
              </label>

              <input
                type="date"
                name="fromDate"
                value={formData.fromDate}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>
          ) : (
            <div className="mb-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {/* From Date */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  From Date
                </label>

                <input
                  type="date"
                  name="fromDate"
                  value={formData.fromDate}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              </div>

              {/* To Date */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  To Date
                </label>

                <input
                  type="date"
                  name="toDate"
                  value={formData.toDate}
                  onChange={handleChange}
                  required
                  min={formData.fromDate || undefined}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              </div>
            </div>
          )}

          {/* Reason */}
          <div className="mb-6">
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Reason
            </label>

            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              required
              rows="5"
              placeholder="Enter the reason for your leave..."
              className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="submit"
              disabled={loading}
              className={`rounded-lg px-6 py-3 font-semibold text-white transition ${
                loading
                  ? "cursor-not-allowed bg-blue-400"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Submitting..." : "Submit Leave Request"}
            </button>

            <button
              type="button"
              onClick={handleClear}
              disabled={loading}
              className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ApplyLeave;