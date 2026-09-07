const dns = require("dns");

dns.setServers(["8.8.8.8", "1.1.1.1"]);

require("dotenv").config();

const mongoose = require("mongoose");
const Attendance = require("../models/attendance.model");
const User = require("../models/user.model");
const Leave = require("../models/leave.model");

const TIME_ZONE = "Asia/Kolkata";

function getCurrentMinutesIST() {
  const parts = new Intl.DateTimeFormat("en-IN", {
    timeZone: TIME_ZONE,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(new Date());

  const hour = Number(parts.find((p) => p.type === "hour").value);
  const minute = Number(parts.find((p) => p.type === "minute").value);

  return hour * 60 + minute;
}

function getTodayIST() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

function getDayRange(dateString) {
  const startOfDay = new Date(`${dateString}T00:00:00+05:30`);
  const endOfDay = new Date(`${dateString}T23:59:59.999+05:30`);

  return {startOfDay, endOfDay};
}

async function runAutoAttendance() {
  const currentMinutes = getCurrentMinutesIST();

  if (currentMinutes < 18 * 60) {
    console.log("Automatic attendance skipped. It will run at 6:00 PM IST.");
    return;
  }
  const todayString = getTodayIST();
  const {startOfDay, endOfDay} = getDayRange(todayString);

  console.log(`Running automatic attendance for ${todayString}`);

  // Get all active employees
  const employees = await User.find({
    role: "employee",
    status: "active",
  }).select("_id employeeId name");

  // Get today's attendance records
  const attendanceRecords = await Attendance.find({
    date: {
      $gte: startOfDay,
      $lte: endOfDay,
    },
  });

  // Get approved leaves covering today
  const approvedLeaves = await Leave.find({
    status: "approved",
    fromDate: {$lte: endOfDay},
    toDate: {$gte: startOfDay},
  });

  let absentCount = 0;
  let leaveCount = 0;

  for (const employee of employees) {
    const existingAttendance = attendanceRecords.find(
      (attendance) =>
        attendance.employee.toString() === employee._id.toString(),
    );

    // Already has attendance → do nothing
    if (existingAttendance) {
      continue;
    }

    // Check whether employee has approved leave today
    const hasApprovedLeave = approvedLeaves.some(
      (leave) => leave.employee.toString() === employee._id.toString(),
    );

    if (hasApprovedLeave) {
      await Attendance.create({
        employee: employee._id,
        date: startOfDay,
        status: "leave",
        checkIn: null,
        checkOut: null,
        remarks: "Approved leave",
      });

      leaveCount++;

      console.log(`${employee.employeeId || employee.name} marked as Leave`);
    } else {
      await Attendance.create({
        employee: employee._id,
        date: startOfDay,
        status: "absent",
        checkIn: null,
        checkOut: null,
        remarks: "Automatically marked absent",
      });

      absentCount++;

      console.log(`${employee.employeeId || employee.name} marked as Absent`);
    }
  }

  console.log(
    `Automatic attendance completed. Absent: ${absentCount}, Leave: ${leaveCount}`,
  );
}

async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected for automatic attendance");

    await runAutoAttendance();

    await mongoose.disconnect();

    console.log("Automatic attendance job finished");
    process.exit(0);
  } catch (error) {
    console.error("Automatic attendance job failed:", error);

    await mongoose.disconnect();

    process.exit(1);
  }
}

main();
