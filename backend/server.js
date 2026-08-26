// const dns = require("dns");

// dns.setServers(["8.8.8.8", "1.1.1.1"]);

// require("dotenv").config();

// const express = require("express");
// const cors = require("cors");

// const connectDB = require("./config/db");

// const authRoutes = require("./routes/auth.routes");
// const employeeRoutes = require("./routes/employee.routes");
// const attendanceRoutes = require("./routes/attendance.routes");
// const leaveRoutes = require("./routes/leave.routes");
// const departmentRoutes = require("./routes/department.routes");
// const holidayRoutes = require("./routes/holiday.routes");

// const app = express();

// connectDB();

// // app.use(cors());
// app.use(
//   cors({
//     origin: [
//       "http://localhost:5173",
//       "https://employee-attendance-system-one-rosy.vercel.app",
//     ],
//     methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );
// app.use(express.json());

// app.use("/api/auth", authRoutes);
// app.use("/api/employees", employeeRoutes);
// app.use("/api/attendance", attendanceRoutes);
// app.use("/api/leaves", leaveRoutes);
// app.use("/api/departments", departmentRoutes);
// app.use("/api/holidays", holidayRoutes);

// app.get("/", (req, res) => {
//   res.json({
//     message: "Employee Attendance System Backend is running",
//   });
// });

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


const dns = require("dns");

dns.setServers(["8.8.8.8", "1.1.1.1"]);

require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const authRoutes = require("./routes/auth.routes");
const employeeRoutes = require("./routes/employee.routes");
const attendanceRoutes = require("./routes/attendance.routes");
const leaveRoutes = require("./routes/leave.routes");
const departmentRoutes = require("./routes/department.routes");
const holidayRoutes = require("./routes/holiday.routes");

const app = express();

connectDB();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://employee-attendance-system-one-rosy.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options("*", cors());

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/leaves", leaveRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/holidays", holidayRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Employee Attendance System Backend is running",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});