import { useEffect, useState } from "react";
import {
  FileText,
  Download,
  FileSpreadsheet,
} from "lucide-react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function Reports() {
  const [attendance, setAttendance] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);

  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  // Filters
  const [employeeFilter, setEmployeeFilter] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // Generated report
  const [reportData, setReportData] = useState([]);

  // Summary
  const [summary, setSummary] = useState({
    totalWorkingDays: 0,
    presentDays: 0,
    absentDays: 0,
    attendancePercentage: 0,
  });

  // =========================
  // FETCH DATA
  // =========================

  useEffect(() => {
    fetchAttendance();
    fetchEmployees();
    fetchDepartments();
  }, []);

  const fetchAttendance = async () => {
    try {
      setLoading(true);

      // const token = localStorage.getItem("token");
            const token = sessionStorage.getItem("token");


      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/attendance`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch attendance"
        );
      }

      setAttendance(data.attendance || []);
    } catch (error) {
      console.error("Fetch attendance error:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchEmployees = async () => {
    try {
      // const token = localStorage.getItem("token");
      const token = sessionStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/employees`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch employees"
        );
      }

      setEmployees(data.employees || []);
    } catch (error) {
      console.error("Fetch employees error:", error);
    }
  };

  const fetchDepartments = async () => {
    try {
      // const token = localStorage.getItem("token");
      const token = sessionStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/departments`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch departments"
        );
      }

      const activeDepartments = (
        data.departments || []
      ).filter(
        (department) => department.status === "active"
      );

      setDepartments(activeDepartments);
    } catch (error) {
      console.error(
        "Fetch departments error:",
        error
      );
    }
  };

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

  const getDateValue = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString(
      "en-CA"
    );
  };

  // =========================
  // WORKING HOURS
  // =========================

  const calculateWorkingHours = (
    date,
    checkIn,
    checkOut
  ) => {
    if (!date || !checkIn || !checkOut) {
      return "-";
    }

    const dateValue = getDateValue(date);

    const start = new Date(
      `${dateValue}T${checkIn}:00`
    );

    const end = new Date(
      `${dateValue}T${checkOut}:00`
    );

    const difference = end - start;

    if (difference <= 0) {
      return "-";
    }

    const totalMinutes = Math.floor(
      difference / (1000 * 60)
    );

    const hours = Math.floor(
      totalMinutes / 60
    );

    const minutes = totalMinutes % 60;

    return `${hours}h ${minutes}m`;
  };

  // =========================
  // GENERATE REPORT
  // =========================

  const handleGenerateReport = () => {
    try {
      setGenerating(true);

      let filtered = [...attendance];

      // Employee filter
      if (employeeFilter) {
        filtered = filtered.filter(
          (record) =>
            record.employee?._id === employeeFilter
        );
      }

      // Department filter
      if (departmentFilter) {
        filtered = filtered.filter(
          (record) =>
            record.employee?.department ===
            departmentFilter
        );
      }

      // From date
      if (fromDate) {
        filtered = filtered.filter(
          (record) =>
            getDateValue(record.date) >= fromDate
        );
      }

      // To date
      if (toDate) {
        filtered = filtered.filter(
          (record) =>
            getDateValue(record.date) <= toDate
        );
      }

      // Sort newest first
      filtered.sort(
        (a, b) =>
          new Date(b.date) -
          new Date(a.date)
      );

      setReportData(filtered);

      // =========================
      // CALCULATE SUMMARY
      // =========================

      const present = filtered.filter(
        (record) =>
          record.status?.toLowerCase() ===
          "present"
      ).length;

      const absent = filtered.filter(
        (record) =>
          record.status?.toLowerCase() ===
          "absent"
      ).length;

      const totalWorkingDays =
        present + absent;

      const percentage =
        totalWorkingDays > 0
          ? (
              (present /
                totalWorkingDays) *
              100
            ).toFixed(1)
          : 0;

      setSummary({
        totalWorkingDays,
        presentDays: present,
        absentDays: absent,
        attendancePercentage:
          percentage,
      });
    } catch (error) {
      console.error(
        "Generate report error:",
        error
      );

      alert(
        "Failed to generate report"
      );
    } finally {
      setGenerating(false);
    }
  };

  // =========================
  // EXPORT CSV
  // =========================

  const handleExportCSV = () => {
    if (reportData.length === 0) {
      alert(
        "Generate a report before exporting."
      );
      return;
    }

    const headers = [
      "Date",
      "Employee ID",
      "Employee Name",
      "Department",
      "Designation",
      "Check In",
      "Check Out",
      "Working Hours",
      "Status",
    ];

    const rows = reportData.map(
      (record) => [
        formatDate(record.date),
        record.employee?.employeeId ||
          "-",
        record.employee?.name || "-",
        record.employee?.department ||
          "-",
        record.employee?.designation ||
          "-",
        record.checkIn || "-",
        record.checkOut || "-",
        calculateWorkingHours(
          record.date,
          record.checkIn,
          record.checkOut
        ),
        record.status || "-",
      ]
    );

    const csvContent = [
      headers,
      ...rows,
    ]
      .map((row) =>
        row
          .map(
            (value) =>
              `"${String(value).replace(
                /"/g,
                '""'
              )}"`
          )
          .join(",")
      )
      .join("\n");

    const blob = new Blob(
      [csvContent],
      {
        type: "text/csv;charset=utf-8;",
      }
    );

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;
    link.download =
      "attendance-report.csv";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  // =========================
  // EXPORT EXCEL
  // =========================

  const handleExportExcel = () => {
    if (reportData.length === 0) {
      alert(
        "Generate a report before exporting."
      );
      return;
    }

    const rows = reportData.map(
      (record) => ({
        Date: formatDate(
          record.date
        ),

        "Employee ID":
          record.employee
            ?.employeeId || "-",

        "Employee Name":
          record.employee?.name ||
          "-",

        Department:
          record.employee
            ?.department || "-",

        Designation:
          record.employee
            ?.designation || "-",

        "Check In":
          record.checkIn || "-",

        "Check Out":
          record.checkOut || "-",

        "Working Hours":
          calculateWorkingHours(
            record.date,
            record.checkIn,
            record.checkOut
          ),

        Status:
          record.status || "-",
      })
    );

    const worksheet =
      XLSX.utils.json_to_sheet(
        rows
      );

    const workbook =
      XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Attendance Report"
    );

    XLSX.writeFile(
      workbook,
      "attendance-report.xlsx"
    );
  };

  // =========================
  // EXPORT PDF
  // =========================

  const handleExportPDF = () => {
    if (reportData.length === 0) {
      alert(
        "Generate a report before exporting."
      );
      return;
    }

    const doc =
      new jsPDF("landscape");

    doc.setFontSize(18);

    doc.text(
      "Attendance Report",
      14,
      15
    );

    doc.setFontSize(10);

    doc.text(
      `Attendance Percentage: ${summary.attendancePercentage}%`,
      14,
      23
    );

    const rows = reportData.map(
      (record) => [
        formatDate(record.date),

        record.employee
          ?.employeeId || "-",

        record.employee?.name ||
          "-",

        record.employee
          ?.department || "-",

        record.checkIn || "-",

        record.checkOut || "-",

        calculateWorkingHours(
          record.date,
          record.checkIn,
          record.checkOut
        ),

        record.status || "-",
      ]
    );

    autoTable(doc, {
      startY: 30,

      head: [
        [
          "Date",
          "Employee ID",
          "Employee",
          "Department",
          "Check In",
          "Check Out",
          "Working Hours",
          "Status",
        ],
      ],

      body: rows,

      styles: {
        fontSize: 8,
      },

      headStyles: {
        fontSize: 8,
      },
    });

    doc.save(
      "attendance-report.pdf"
    );
  };

  // =========================
  // REPORT CARD
  // =========================

  function ReportCard({
    title,
    value,
  }) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <p className="text-sm text-gray-500">
          {title}
        </p>

        <p className="text-2xl font-bold text-gray-800 mt-2">
          {value}
        </p>
      </div>
    );
  }

  // =========================
  // UI
  // =========================

  return (
    <div className="p-4 sm:p-6 bg-blue-100 min-h-screen">

      {/* Page Header */}
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-gray-800">
          Attendance Reports
        </h1>

        <p className="text-gray-500 mt-1">
          Generate and view employee
          attendance reports.
        </p>
      </div>

      {/* Report Filters */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 mb-6">

        <h2 className="text-lg font-semibold text-gray-800 mb-5">
          Generate Report
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

          {/* Employee */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Employee
            </label>

            <select
              value={employeeFilter}
              onChange={(e) =>
                setEmployeeFilter(
                  e.target.value
                )
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">
                All Employees
              </option>

              {employees.map(
                (employee) => (
                  <option
                    key={employee._id}
                    value={
                      employee._id
                    }
                  >
                    {employee.name} (
                    {
                      employee.employeeId
                    }
                    )
                  </option>
                )
              )}
            </select>
          </div>

          {/* Department */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Department
            </label>

            <select
              value={
                departmentFilter
              }
              onChange={(e) =>
                setDepartmentFilter(
                  e.target.value
                )
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">
                All Departments
              </option>

              {departments.map(
                (department) => (
                  <option
                    key={
                      department._id
                    }
                    value={
                      department.name
                    }
                  >
                    {
                      department.name
                    }
                  </option>
                )
              )}
            </select>
          </div>

          {/* From Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              From Date
            </label>

            <input
              type="date"
              value={fromDate}
              onChange={(e) =>
                setFromDate(
                  e.target.value
                )
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* To Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              To Date
            </label>

            <input
              type="date"
              value={toDate}
              onChange={(e) =>
                setToDate(
                  e.target.value
                )
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

        </div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-3 mt-6">

          {/* Generate */}
          <button
            type="button"
            onClick={
              handleGenerateReport
            }
            disabled={
              loading || generating
            }
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-semibold transition disabled:opacity-50"
          >
            <FileText
              size={18}
            />

            {generating
              ? "Generating..."
              : "Generate Report"}
          </button>

          {/* CSV */}
          <button
            type="button"
            onClick={
              handleExportCSV
            }
            className="inline-flex items-center gap-2 border border-gray-300 hover:bg-gray-50 text-gray-700 px-5 py-3 rounded-lg font-semibold transition"
          >
            <Download
              size={18}
            />

            Export CSV
          </button>

          {/* Excel */}
          <button
            type="button"
            onClick={
              handleExportExcel
            }
            className="inline-flex items-center gap-2 border border-green-300 hover:bg-green-50 text-green-700 px-5 py-3 rounded-lg font-semibold transition"
          >
            <FileSpreadsheet
              size={18}
            />

            Export Excel
          </button>

          {/* PDF */}
          <button
            type="button"
            onClick={
              handleExportPDF
            }
            className="inline-flex items-center gap-2 border border-red-300 hover:bg-red-50 text-red-700 px-5 py-3 rounded-lg font-semibold transition"
          >
            <FileText
              size={18}
            />

            Export PDF
          </button>

        </div>
      </div>

      {/* Report Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">

        <ReportCard
          title="Total Working Days"
          value={
            summary.totalWorkingDays
          }
        />

        <ReportCard
          title="Present Days"
          value={
            summary.presentDays
          }
        />

        <ReportCard
          title="Absent Days"
          value={
            summary.absentDays
          }
        />

        <ReportCard
          title="Attendance Percentage"
          value={`${summary.attendancePercentage}%`}
        />

      </div>

      {/* Report Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">

        <div className="p-5 border-b border-gray-200 text-center">
          <h2 className="text-lg font-semibold text-gray-800">
            Attendance Report
          </h2>
        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gray-50 border-b border-gray-200">

              <tr>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Date
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Employee
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

            <tbody className="divide-y divide-gray-100">

              {loading ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-16 text-center text-gray-500"
                  >
                    Loading attendance
                    data...
                  </td>
                </tr>
              ) : reportData.length ===
                0 ? (
                <tr>

                  <td
                    colSpan="6"
                    className="px-6 py-16 text-center"
                  >

                    <p className="text-lg font-medium text-gray-400">
                      No report data
                      available
                    </p>

                    <p className="text-sm text-gray-400 mt-1">
                      Select the filters
                      and generate a
                      report.
                    </p>

                  </td>

                </tr>
              ) : (
                reportData.map(
                  (record) => (
                    <tr
                      key={
                        record._id
                      }
                      className="hover:bg-gray-50"
                    >

                      <td className="px-6 py-4 text-sm text-gray-700">
                        {formatDate(
                          record.date
                        )}
                      </td>

                      <td className="px-6 py-4">

                        <p className="font-medium text-gray-800">
                          {
                            record
                              .employee
                              ?.name ||
                            "-"
                          }
                        </p>

                        <p className="text-xs text-gray-400">
                          {
                            record
                              .employee
                              ?.employeeId ||
                            "-"
                          }
                        </p>

                      </td>

                      <td className="px-6 py-4 text-sm text-gray-600">
                        {record.checkIn ||
                          "-"}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-600">
                        {record.checkOut ||
                          "-"}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-600">
                        {calculateWorkingHours(
                          record.date,
                          record.checkIn,
                          record.checkOut
                        )}
                      </td>

                      <td className="px-6 py-4">

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            record.status?.toLowerCase() ===
                            "present"
                              ? "bg-green-100 text-green-700"
                              : record.status?.toLowerCase() ===
                                "leave"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {
                            record.status ||
                            "-"
                          }
                        </span>

                      </td>

                    </tr>
                  )
                )
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Reports;