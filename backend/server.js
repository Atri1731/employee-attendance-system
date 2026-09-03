const dns = require("dns");

dns.setServers(["8.8.8.8", "1.1.1.1"]);

require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const authRoutes = require("./routes/auth.routes");
const employeeRoutes = require("./routes/employee.routes");
const payrollRoutes = require("./routes/payroll.routes");
const attendanceRoutes = require("./routes/attendance.routes");
const leaveRoutes = require("./routes/leave.routes");
const departmentRoutes = require("./routes/department.routes");
const holidayRoutes = require("./routes/holiday.routes");

require("./jobs/autoCheckout");

const app = express();

connectDB();

// app.use(
//   cors({
//     origin: [
//       "http://localhost:5173",
//       "https://employee-attendance-system-667rguo14-atri-patel-s-projects.vercel.app",
//       "https://employee-attendance-system-b0327ctyl-atri-patel-s-projects.vercel.app",
//       "https://employee-attendance-system-one-rosy.vercel.app",
//     ],
//     methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   }),
// );
const allowedOrigins = [
  "http://localhost:5173",
  "https://employee-attendance-system-one-rosy.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests without an origin
      if (!origin) {
        return callback(null, true);
      }

      // Allow your Vercel project deployments
      if (
        origin === "https://employee-attendance-system-one-rosy.vercel.app" ||
        origin.includes("employee-attendance-system-")
      ) {
        return callback(null, true);
      }

      // Allow localhost
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      callback(new Error("Not allowed by CORS"));
    },

    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],

    allowedHeaders: ["Content-Type", "Authorization"],

    credentials: true,
  }),
);
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/leaves", leaveRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/holidays", holidayRoutes);

app.use("/api/payroll", payrollRoutes);
app.get("/", (req, res) => {
  res.json({
    message: "Employee Attendance System Backend is running",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
