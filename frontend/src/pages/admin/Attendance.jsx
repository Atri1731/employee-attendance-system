import {useEffect, useState} from "react";
import {Search, UserX, X} from "lucide-react";

function Attendance() {
  // =========================
  // ATTENDANCE STATES
  // =========================

  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [dateFilter, setDateFilter] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [search, setSearch] = useState("");
  // <button
  //   type="button"
  //   onClick={() => {
  //     setDateFilter("");
  //     setDepartmentFilter("");
  //     setStatusFilter("");
  //     setSearch("");
  //   }}
  //   className="mt-7 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
  // >
  //   Clear Filters
  // </button>;

  // =========================
  // ABSENT STATES
  // =========================

  const [employees, setEmployees] = useState([]);
  const [showAbsentModal, setShowAbsentModal] = useState(false);
  const [absentEmployee, setAbsentEmployee] = useState("");
  const [absentDate, setAbsentDate] = useState("");
  const [savingAbsent, setSavingAbsent] = useState(false);

  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [selectedCheckoutAttendance, setSelectedCheckoutAttendance] =
    useState(null);
  const [checkoutTime, setCheckoutTime] = useState("");
  const [savingCheckout, setSavingCheckout] = useState(false);

  // =========================
  // UPDATE ATTENDANCE STATES
  // =========================

  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedAttendance, setSelectedAttendance] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [savingStatus, setSavingStatus] = useState(false);
  // =========================
  // LOAD DATA
  // =========================

  useEffect(() => {
    fetchAttendance();
    fetchEmployees();

    // Set today's date
    const today = new Date().toLocaleDateString("en-CA");
    setAbsentDate(today);
  }, []);

  // =========================
  // FETCH ATTENDANCE
  // =========================

  async function fetchAttendance() {
    try {
      setLoading(true);

      // const token = localStorage.getItem("token");
      const token = sessionStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/attendance`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      console.log("ATTENDANCE RESPONSE:", data);
      console.log("ATTENDANCE RECORDS:", data.attendance);

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch attendance");
      }

      setAttendance(data.attendance || []);
    } catch (error) {
      console.error("Fetch attendance error:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  // // =========================
  // // FETCH EMPLOYEES
  // // =========================

  // async function fetchEmployees() {
  //   try {
  //     // const token = localStorage.getItem("token");
  //     const token = sessionStorage.getItem("token");

  //     const response = await fetch(
  //       `${import.meta.env.VITE_API_URL}/employees`,
  //       {
  //         method: "GET",
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       },
  //     );

  // =========================
  // FETCH EMPLOYEES
  // =========================

  async function fetchEmployees() {
    try {
      const token = sessionStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/employees`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch employees");
      }

      setEmployees(data.employees || []);
    } catch (error) {
      console.error("Fetch employees error:", error);
      alert(error.message);
    }
  }

  //     const data = await response.json();

  //     if (!response.ok) {
  //       throw new Error(data.message || "Failed to fetch employees");
  //     }

  //     setEmployees(data.employees || []);
  //   } catch (error) {
  //     console.error("Fetch employees error:", error);
  //     alert(error.message);
  //   }
  // }

  //   const responseText = await response.text();

  // console.log("UPDATE STATUS URL:", response.url);
  // console.log("UPDATE STATUS STATUS:", response.status);
  // console.log("UPDATE STATUS RESPONSE:", responseText);

  // if (!response.ok) {
  //   throw new Error(
  //     `Request failed: ${response.status} ${response.statusText}`,
  //   );
  // }

  // const data = JSON.parse(responseText);

  // =========================
  // MARK ABSENT
  // =========================

  async function handleMarkAbsent() {
    // Check employee
    if (!absentEmployee) {
      alert("Please select an employee");
      return;
    }

    // Check date
    if (!absentDate) {
      alert("Please select a date");
      return;
    }

    try {
      setSavingAbsent(true);

      // const token = localStorage.getItem("token");
      const token = sessionStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/attendance/absent`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            employeeId: absentEmployee,
            date: absentDate,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to mark employee absent");
      }

      // Success
      alert("Employee marked absent successfully!");

      // Close modal
      setShowAbsentModal(false);

      // Clear employee
      setAbsentEmployee("");

      // Keep today's date
      const today = new Date().toLocaleDateString("en-CA");
      setAbsentDate(today);

      // Refresh attendance
      await fetchAttendance();
    } catch (error) {
      console.error("Mark absent error:", error);
      alert(error.message);
    } finally {
      setSavingAbsent(false);
    }
  }

  // =========================
  // UPDATE ATTENDANCE STATUS
  // =========================

  // async function handleUpdateStatus() {
  //   if (!selectedAttendance) {
  //     return;
  //   }

  //   if (!selectedStatus) {
  //     alert("Please select a status");
  //     return;
  //   }

  //   try {
  //     setSavingStatus(true);

  //     const token = sessionStorage.getItem("token");

  //     const response = await fetch(
  //       `${import.meta.env.VITE_API_URL}/attendance/${selectedAttendance._id}`,
  //       {
  //         method: "PUT",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //         body: JSON.stringify({
  //           status: selectedStatus,
  //         }),
  //       },
  //     );

  //     const data = await response.json();

  //     if (!response.ok) {
  //       throw new Error(data.message || "Failed to update attendance status");
  //     }

  //     alert("Attendance status updated successfully!");

  //     setShowStatusModal(false);
  //     setSelectedAttendance(null);
  //     setSelectedStatus("");

  //     await fetchAttendance();
  //   } catch (error) {
  //     console.error("Update attendance status error:", error);
  //     alert(error.message);
  //   } finally {
  //     setSavingStatus(false);
  //   }
  // }

  // =========================
  // UPDATE ATTENDANCE STATUS
  // =========================

  async function handleUpdateStatus() {
    if (!selectedAttendance) {
      return;
    }

    if (!selectedStatus) {
      alert("Please select a status");
      return;
    }

    try {
      setSavingStatus(true);

      const token = sessionStorage.getItem("token");

      console.log(
        "UPDATE URL:",
        `${import.meta.env.VITE_API_URL}/attendance/${selectedAttendance._id}`,
      );

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/attendance/${selectedAttendance._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status: selectedStatus,
          }),
        },
      );

    
      // const data = await response.json();

      // if (!response.ok) {
      //   throw new Error(data.message || "Failed to update attendance status");
      // }

      const responseText = await response.text();

      console.log("UPDATE URL:", response.url);
      console.log("UPDATE STATUS:", response.status);
      console.log("UPDATE RESPONSE:", responseText);

      if (!response.ok) {
        throw new Error(
          `Request failed: ${response.status} ${response.statusText}`,
        );
      }

      const data = JSON.parse(responseText);

      alert("Attendance status updated successfully!");

      setShowStatusModal(false);
      setSelectedAttendance(null);
      setSelectedStatus("");

      await fetchAttendance();
    } catch (error) {
      console.error("Update attendance status error:", error);
      alert(error.message);
    } finally {
      setSavingStatus(false);
    }
  }

// =========================
// UPDATE CHECKOUT
// =========================

async function handleUpdateCheckout() {
  if (!selectedCheckoutAttendance) {
    return;
  }

  if (!checkoutTime) {
    alert("Please select a checkout time");
    return;
  }

  try {
    setSavingCheckout(true);

    const token = sessionStorage.getItem("token");

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/attendance/${selectedCheckoutAttendance._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          status: selectedCheckoutAttendance.status,
          checkOut: checkoutTime,
        }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Failed to update checkout time",
      );
    }

    alert("Checkout time updated successfully!");

    setShowCheckoutModal(false);
    setSelectedCheckoutAttendance(null);
    setCheckoutTime("");

    await fetchAttendance();
  } catch (error) {
    console.error("Update checkout error:", error);
    alert(error.message);
  } finally {
    setSavingCheckout(false);
  }
}



  // =========================
  // WORKING HOURS
  // =========================

  function calculateWorkingHours(checkIn, checkOut) {
    if (!checkIn || !checkOut) {
      return "-";
    }

    const [inHour, inMinute] = checkIn.split(":").map(Number);

    const [outHour, outMinute] = checkOut.split(":").map(Number);

    const startMinutes = inHour * 60 + inMinute;

    const endMinutes = outHour * 60 + outMinute;

    const difference = endMinutes - startMinutes;

    if (difference <= 0) {
      return "-";
    }

    const hours = Math.floor(difference / 60);

    const minutes = difference % 60;

    return `${hours}h ${minutes}m`;
  }

  // =========================
  // FORMAT DATE
  // =========================

  function formatDate(date) {
    if (!date) {
      return "-";
    }

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }

  // =========================
  // FILTER ATTENDANCE
  // =========================

  const filteredAttendance = attendance.filter((record) => {
    const employee = record.employee;

    if (!employee) {
      return false;
    }

    const dateObject = new Date(record.date);

    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, "0");
    const day = String(dateObject.getDate()).padStart(2, "0");

    const recordDate = `${year}-${month}-${day}`;

    const matchesDate = !dateFilter || recordDate === dateFilter;

    const matchesDepartment =
      !departmentFilter || employee.department === departmentFilter;

    const matchesStatus = !statusFilter || record.status === statusFilter;

    const searchText = search.toLowerCase();

    const matchesSearch =
      !search ||
      employee.name?.toLowerCase().includes(searchText) ||
      employee.employeeId?.toLowerCase().includes(searchText);

    return matchesDate && matchesDepartment && matchesStatus && matchesSearch;
  });

  // =========================
  // PAGE
  // =========================

  return (
    <div className="min-h-screen bg-blue-100 p-6">
      {/* =========================
          PAGE HEADER
      ========================= */}

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Attendance</h1>

        <p className="text-gray-500 mt-1">
          Monitor and manage employee attendance.
        </p>
      </div>

      {/* =========================
          FILTERS
      ========================= */}

      <div className="bg-white border border-gray-200 rounded-xl p-5 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {" "}
          {/* DATE */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date
            </label>

            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* DEPARTMENT */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Department
            </label>

            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Departments</option>

              <option value="IT">IT</option>

              <option value="HR">HR</option>

              <option value="Sales">Sales</option>

              <option value="Marketing">Marketing</option>

              <option value="Finance">Finance</option>

              <option value="Administration">Administration</option>
            </select>
          </div>
          {/* STATUS */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Status</option>

              <option value="present">Present</option>

              <option value="absent">Absent</option>

              <option value="half-day">Half Day</option>

              <option value="leave">Leave</option>
            </select>
          </div>
          {/* SEARCH */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Employee
            </label>

            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search employee..."
                className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-end">
        <button
          type="button"
          onClick={() => {
            setDateFilter("");
            setDepartmentFilter("");
            setStatusFilter("");
            setSearch("");
          }}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
        >
          Clear Filters
        </button>
      </div>
      {/* =========================
          ATTENDANCE TABLE
      ========================= */}

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        {/* TABLE HEADER */}

        <div className="p-5 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">
            Attendance Records
          </h2>

          <div className="flex items-center gap-3">
            {/* MARK ABSENT BUTTON */}

            <button
              type="button"
              onClick={() => {
                setShowAbsentModal(true);
              }}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
            >
              <UserX size={17} />
              Mark Absent
            </button>

            {/* REFRESH */}

            <button
              type="button"
              onClick={fetchAttendance}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              Refresh
            </button>
          </div>
        </div>

        {/* TABLE */}

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Employee ID
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Employee
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Date
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Department
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Check In
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Check Out
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Working Hours
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {/* LOADING */}

              {loading ? (
                <tr>
                  <td colSpan="8" className="px-6 py-16 text-center">
                    <p className="text-gray-500">Loading attendance...</p>
                  </td>
                </tr>
              ) : filteredAttendance.length === 0 ? (
                /* EMPTY */

                <tr>
                  <td colSpan="8" className="px-6 py-16 text-center">
                    <p className="text-lg font-medium text-gray-400">
                      No attendance records found
                    </p>

                    <p className="text-sm text-gray-400 mt-1">
                      Attendance records will appear here when employees mark
                      their attendance.
                    </p>
                  </td>
                </tr>
              ) : (
                /* RECORDS */

                filteredAttendance.map((record) => (
                  <tr
                    key={record._id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {record.employee.employeeId}
                    </td>

                    <td className="px-6 py-4 text-sm font-medium text-gray-800">
                      {record.employee.name}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-700">
                      {formatDate(record.date)}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-700">
                      {record.employee.department}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-700">
                      {record.checkIn || "-"}
                    </td>

                    {/* <td className="px-6 py-4 text-sm text-gray-700">
                      {record.checkOut || "-"}
                    </td> */}
                    <td className="px-6 py-4 text-sm text-gray-700">
                      <div className="flex items-center gap-3 whitespace-nowrap">
                        <span>{record.checkOut || "-"}</span>

                        {record.status === "present" && record.checkOut && (
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedCheckoutAttendance(record);
                              setCheckoutTime(record.checkOut);
                              setShowCheckoutModal(true);
                            }}
                            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                          >
                            Edit
                          </button>
                        )}
                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-700">
                      {calculateWorkingHours(record.checkIn, record.checkOut)}
                    </td>

                    {/* <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                          record.status === "present"
                            ? "bg-green-100 text-green-700"
                            : record.status === "absent"
                              ? "bg-red-100 text-red-700"
                              : record.status === "leave"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {record.status}
                      </span>
                    </td> */}

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span
                          className={`inline-flex whitespace-nowrap px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                            record.status === "present"
                              ? "bg-green-100 text-green-700"
                              : record.status === "absent"
                                ? "bg-red-100 text-red-700"
                                : record.status === "leave"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-orange-100 text-orange-700"
                          }`}
                        >
                          {record.status === "half-day"
                            ? "Half Day"
                            : record.status}
                        </span>

                        <button
                          type="button"
                          onClick={() => {
                            setSelectedAttendance(record);
                            setSelectedStatus(record.status);
                            setShowStatusModal(true);
                          }}
                          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                        >
                          Change
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

      {/* =========================
          MARK ABSENT MODAL
      ========================= */}

      {showAbsentModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            {/* MODAL HEADER */}

            <div className="flex items-center justify-between px-6 py-4 border-b">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  Mark Employee Absent
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Create an absent attendance record.
                </p>
              </div>

              {/* CLOSE */}

              <button
                type="button"
                onClick={() => {
                  setShowAbsentModal(false);
                  setAbsentEmployee("");
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>

            {/* MODAL BODY */}

            <div className="p-6 space-y-5">
              {/* EMPLOYEE */}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Employee
                </label>

                <select
                  value={absentEmployee}
                  onChange={(e) => {
                    setAbsentEmployee(e.target.value);
                  }}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select employee</option>

                  {employees.map((employee) => (
                    <option key={employee._id} value={employee._id}>
                      {employee.employeeId} - {employee.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* DATE */}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date
                </label>

                <input
                  type="date"
                  value={absentDate}
                  onChange={(e) => {
                    setAbsentDate(e.target.value);
                  }}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* MODAL FOOTER */}

            <div className="flex justify-end gap-3 px-6 py-4 border-t bg-gray-50 rounded-b-xl">
              {/* CANCEL */}

              <button
                type="button"
                onClick={() => {
                  setShowAbsentModal(false);
                  setAbsentEmployee("");
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>

              {/* MARK ABSENT */}

              <button
                type="button"
                onClick={handleMarkAbsent}
                disabled={savingAbsent}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition disabled:opacity-50"
              >
                <UserX size={17} />

                {savingAbsent ? "Saving..." : "Mark Absent"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================
    UPDATE STATUS MODAL
========================= */}

      {showStatusModal && selectedAttendance && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            {/* HEADER */}

            <div className="flex items-center justify-between px-6 py-4 border-b">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  Update Attendance
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Change the attendance status.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setShowStatusModal(false);
                  setSelectedAttendance(null);
                  setSelectedStatus("");
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>

            {/* BODY */}

            <div className="p-6 space-y-5">
              {/* EMPLOYEE */}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Employee
                </label>

                <input
                  type="text"
                  value={`${selectedAttendance.employee.employeeId} - ${selectedAttendance.employee.name}`}
                  disabled
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-100 text-gray-600"
                />
              </div>

              {/* DATE */}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date
                </label>

                <input
                  type="text"
                  value={formatDate(selectedAttendance.date)}
                  disabled
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-100 text-gray-600"
                />
              </div>

              {/* STATUS */}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>

                <select
                  value={selectedStatus}
                  onChange={(e) => {
                    setSelectedStatus(e.target.value);
                  }}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="present">Present</option>
                  <option value="absent">Absent</option>
                  <option value="half-day">Half Day</option>
                  <option value="leave">Leave</option>
                </select>
              </div>
            </div>

            {/* FOOTER */}

            <div className="flex justify-end gap-3 px-6 py-4 border-t bg-gray-50 rounded-b-xl">
              <button
                type="button"
                onClick={() => {
                  setShowStatusModal(false);
                  setSelectedAttendance(null);
                  setSelectedStatus("");
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleUpdateStatus}
                disabled={savingStatus}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition disabled:opacity-50"
              >
                {savingStatus ? "Updating..." : "Update Status"}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* =========================
    EDIT CHECKOUT MODAL
========================= */}

      {showCheckoutModal && selectedCheckoutAttendance && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            {/* HEADER */}

            <div className="flex items-center justify-between px-6 py-4 border-b">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  Edit Checkout Time
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Update the employee's actual checkout time.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setShowCheckoutModal(false);
                  setSelectedCheckoutAttendance(null);
                  setCheckoutTime("");
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>

            {/* BODY */}

            <div className="p-6 space-y-5">
              {/* EMPLOYEE */}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Employee
                </label>

                <input
                  type="text"
                  value={`${selectedCheckoutAttendance.employee.employeeId} - ${selectedCheckoutAttendance.employee.name}`}
                  disabled
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-100 text-gray-600"
                />
              </div>

              {/* DATE */}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date
                </label>

                <input
                  type="text"
                  value={formatDate(selectedCheckoutAttendance.date)}
                  disabled
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-100 text-gray-600"
                />
              </div>

              {/* CHECKOUT */}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Check Out Time
                </label>

                <input
                  type="time"
                  value={checkoutTime}
                  onChange={(e) => setCheckoutTime(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* FOOTER */}

            <div className="flex justify-end gap-3 px-6 py-4 border-t bg-gray-50 rounded-b-xl">
              <button
                type="button"
                onClick={() => {
                  setShowCheckoutModal(false);
                  setSelectedCheckoutAttendance(null);
                  setCheckoutTime("");
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleUpdateCheckout}
                disabled={savingCheckout}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition disabled:opacity-50"
              >
                {savingCheckout ? "Saving..." : "Save Checkout"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Attendance;
