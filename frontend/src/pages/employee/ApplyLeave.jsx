// import { useState } from "react";

// function ApplyLeave() {
//   const [formData, setFormData] = useState({
//     leaveType: "",
//     fromDate: "",
//     toDate: "",
//     reason: "",
//   });

//   function handleChange(e) {
//     const { name, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   }

//   function handleSubmit(e) {
//     e.preventDefault();

//     // Backend connection will be added later.
//     console.log(formData);
//   }

//   return (
//     <div className="p-6  min-h-screen bg-blue-100 ">

//       {/* Page Header */}
//       <div className="mb-6 text-center">
//         <h1 className="text-2xl font-bold text-gray-800 justify-center">
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
//               className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
//             >
//               Submit Leave Request
//             </button>

//             <button
//               type="button"
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

import {useState} from "react";

function ApplyLeave() {
  const [leaveDuration, setLeaveDuration] = useState("single");

  const [formData, setFormData] = useState({
    leaveType: "",
    fromDate: "",
    toDate: "",
    reason: "",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const {name, value} = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleDurationChange(value) {
    setLeaveDuration(value);

    // Clear dates when switching duration
    setFormData((prev) => ({
      ...prev,
      fromDate: "",
      toDate: "",
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // Check dates
    if (!formData.fromDate) {
      alert("Please select a date.");
      return;
    }

    if (leaveDuration === "multiple" && !formData.toDate) {
      alert("Please select the end date.");
      return;
    }

    // For single day, use the same date
    const fromDate = formData.fromDate;

    const toDate =
      leaveDuration === "single" ? formData.fromDate : formData.toDate;

    // Check date order
    if (new Date(toDate) < new Date(fromDate)) {
      alert("To date cannot be before from date.");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await fetch(`${import.meta.env.VITE_API_URL}/leaves`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          leaveType: formData.leaveType,
          fromDate,
          toDate,
          reason: formData.reason,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit leave request");
      }

      alert("Leave request submitted successfully!");

      // Clear form
      setFormData({
        leaveType: "",
        fromDate: "",
        toDate: "",
        reason: "",
      });

      setLeaveDuration("single");
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

    setLeaveDuration("single");
  }

  return (
    <div className="p-6 min-h-screen bg-blue-100">
      {/* Page Header */}
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-gray-800">Apply for Leave</h1>

        <p className="text-gray-500 mt-1">
          Submit a leave request to your administrator.
        </p>
      </div>

      {/* Leave Form */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 max-w-3xl mx-auto">
        <form onSubmit={handleSubmit}>
          {/* Leave Duration */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Leave Duration
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Single Day */}
              <button
                type="button"
                onClick={() => handleDurationChange("single")}
                className={`text-left border rounded-xl p-4 transition ${
                  leaveDuration === "single"
                    ? "border-blue-600 bg-blue-50 ring-2 ring-blue-200"
                    : "border-gray-300 hover:border-blue-400"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      leaveDuration === "single"
                        ? "border-blue-600"
                        : "border-gray-400"
                    }`}
                  >
                    {leaveDuration === "single" && (
                      <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                    )}
                  </div>

                  <div>
                    <p className="font-semibold text-gray-800">Single Day</p>

                    <p className="text-sm text-gray-500">Apply for one day</p>
                  </div>
                </div>
              </button>

              {/* Multiple Days */}
              <button
                type="button"
                onClick={() => handleDurationChange("multiple")}
                className={`text-left border rounded-xl p-4 transition ${
                  leaveDuration === "multiple"
                    ? "border-blue-600 bg-blue-50 ring-2 ring-blue-200"
                    : "border-gray-300 hover:border-blue-400"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      leaveDuration === "multiple"
                        ? "border-blue-600"
                        : "border-gray-400"
                    }`}
                  >
                    {leaveDuration === "multiple" && (
                      <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                    )}
                  </div>

                  <div>
                    <p className="font-semibold text-gray-800">Multiple Days</p>

                    <p className="text-sm text-gray-500">
                      Apply for several days
                    </p>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Leave Type */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Leave Type
            </label>

            <select
              name="leaveType"
              value={formData.leaveType}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select leave type</option>
              <option value="casual">Casual Leave</option>
              <option value="medical">Medical Leave</option>
              <option value="annual">Annual Leave</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* From / Single Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {leaveDuration === "single" ? "Leave Date" : "From Date"}
              </label>

              <input
                type="date"
                name="fromDate"
                value={formData.fromDate}
                onChange={handleChange}
                min={new Date().toISOString().split("T")[0]}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* To Date - Only Multiple */}
            {leaveDuration === "multiple" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  To Date
                </label>

                <input
                  type="date"
                  name="toDate"
                  value={formData.toDate}
                  onChange={handleChange}
                  min={
                    formData.fromDate || new Date().toISOString().split("T")[0]
                  }
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
          </div>

          {/* Selected Days */}
          {leaveDuration === "multiple" &&
            formData.fromDate &&
            formData.toDate &&
            new Date(formData.toDate) >= new Date(formData.fromDate) && (
              <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg px-4 py-3">
                <p className="text-sm text-blue-700">
                  <span className="font-semibold">Leave Duration:</span>{" "}
                  {Math.floor(
                    (new Date(formData.toDate) - new Date(formData.fromDate)) /
                      (1000 * 60 * 60 * 24),
                  ) + 1}{" "}
                  day(s)
                </p>
              </div>
            )}

          {/* Reason */}
          <div className="mt-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reason
            </label>

            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              required
              rows="5"
              placeholder="Enter the reason for your leave..."
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-6">
            <button
              type="submit"
              disabled={loading}
              className={`bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition ${
                loading ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Submitting..." : "Submit Leave Request"}
            </button>

            <button
              type="button"
              disabled={loading}
              onClick={handleClear}
              className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-semibold transition"
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
