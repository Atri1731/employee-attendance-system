const STANDARD_WORKING_HOURS = 8;

function calculateWorkingHours(checkIn, checkOut) {
  if (!checkIn || !checkOut) {
    return 0;
  }

  const [inHour, inMinute] = checkIn.split(":").map(Number);
  const [outHour, outMinute] = checkOut.split(":").map(Number);

  const startMinutes = inHour * 60 + inMinute;
  const endMinutes = outHour * 60 + outMinute;

  const difference = endMinutes - startMinutes;

  if (difference <= 0) {
    return 0;
  }

  return difference / 60;
}

const User = require("../models/user.model");
const Attendance = require("../models/attendance.model");

// GET PAYROLL FOR EMPLOYEE
const getEmployeePayroll = async (req, res) => {
  try {
    // If employee calls /me, use logged-in user's ID.
    // If admin calls /:id, use the ID from params.
    const employeeId = req.params.id || req.user.id;

    const employee = await User.findOne({
      _id: employeeId,
      role: "employee",
    }).select("-password");

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    // Current month
    const now = new Date();

    const year = now.getFullYear();
    const month = now.getMonth();

    // First day of current month
    const startDate = new Date(year, month, 1);

    // First day of next month
    const endDate = new Date(year, month + 1, 1);

    // Get attendance for current month
    const attendance = await Attendance.find({
      employee: employee._id,
      date: {
        $gte: startDate,
        $lt: endDate,
      },
    }).sort({date: 1});

    // Count attendance
    const presentDays = attendance.filter(
      (item) => item.status === "present",
    ).length;

    const halfDays = attendance.filter(
      (item) => item.status === "half-day",
    ).length;

    const absentDays = attendance.filter(
      (item) => item.status === "absent",
    ).length;

    const leaveDays = attendance.filter(
      (item) => item.status === "leave",
    ).length;

    // Number of days in current month
    const totalDaysInMonth = new Date(
      year,
      month + 1,
      0,
    ).getDate();

    // // Salary calculation
    // const monthlySalary = employee.salary || 0;

    // const perDaySalary = monthlySalary / totalDaysInMonth;

    // // Present = full salary
    // // Half-day = 50% salary
    // // Absent = 0
    // // Leave = currently treated as unpaid
    // const payableDays = presentDays + halfDays * 0.5;

    // const calculatedSalary = payableDays * perDaySalary;

    // Salary calculation based on working hours
const monthlySalary = employee.salary || 0;

const perDaySalary = monthlySalary / totalDaysInMonth;

const hourlyRate =
  perDaySalary / STANDARD_WORKING_HOURS;

let totalWorkingHours = 0;

attendance.forEach((item) => {
  const hours = calculateWorkingHours(
    item.checkIn,
    item.checkOut,
  );

  if (item.status === "present") {
    totalWorkingHours += hours;
  }

  if (item.status === "half-day") {
    totalWorkingHours += Math.min(
      hours,
      STANDARD_WORKING_HOURS / 2,
    );
  }
});

const calculatedSalary =
  totalWorkingHours * hourlyRate;

    res.status(200).json({
      message: "Payroll fetched successfully",

      payroll: {
        employee: {
          id: employee._id,
          employeeId: employee.employeeId,
          name: employee.name,
          email: employee.email,
          department: employee.department,
          designation: employee.designation,
        },

        month: month + 1,
        year,

        // salary: {
        //   monthlySalary,
        //   perDaySalary: Number(perDaySalary.toFixed(2)),
        //   payableDays,
        //   calculatedSalary: Number(calculatedSalary.toFixed(2)),
        // },

        salary: {
  monthlySalary,

  perDaySalary: Number(
    perDaySalary.toFixed(2),
  ),

  hourlyRate: Number(
    hourlyRate.toFixed(2),
  ),

  totalWorkingHours: Number(
    totalWorkingHours.toFixed(2),
  ),

  payableDays: Number(
    (
      totalWorkingHours / STANDARD_WORKING_HOURS
    ).toFixed(2),
  ),

  calculatedSalary: Number(
    calculatedSalary.toFixed(2),
  ),
},

        attendance: {
          totalDaysInMonth,
          presentDays,
          halfDays,
          absentDays,
          leaveDays,
        },
      },
    });
  } catch (error) {
    console.error("Get employee payroll error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// GET PAYROLL FOR ALL EMPLOYEES - ADMIN
const getAllPayroll = async (req, res) => {
  try {
    const employees = await User.find({
      role: "employee",
    }).select("-password");

    const now = new Date();

    const year = now.getFullYear();
    const month = now.getMonth();

    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 1);

    const totalDaysInMonth = new Date(
      year,
      month + 1,
      0,
    ).getDate();

    const payroll = [];

    for (const employee of employees) {
      const attendance = await Attendance.find({
        employee: employee._id,
        date: {
          $gte: startDate,
          $lt: endDate,
        },
      });

      const presentDays = attendance.filter(
        (item) => item.status === "present",
      ).length;

      const halfDays = attendance.filter(
        (item) => item.status === "half-day",
      ).length;

      const absentDays = attendance.filter(
        (item) => item.status === "absent",
      ).length;

      const leaveDays = attendance.filter(
        (item) => item.status === "leave",
      ).length;
const monthlySalary = employee.salary || 0;

const perDaySalary =
  monthlySalary / totalDaysInMonth;

const hourlyRate =
  perDaySalary / STANDARD_WORKING_HOURS;

let totalWorkingHours = 0;

attendance.forEach((item) => {
  const hours = calculateWorkingHours(
    item.checkIn,
    item.checkOut,
  );

  if (item.status === "present") {
    totalWorkingHours += hours;
  }

  if (item.status === "half-day") {
    totalWorkingHours += Math.min(
      hours,
      STANDARD_WORKING_HOURS / 2,
    );
  }
});

const calculatedSalary =
  totalWorkingHours * hourlyRate;

const payableDays =
  totalWorkingHours / STANDARD_WORKING_HOURS;

      payroll.push({
        employee: {
          id: employee._id,
          employeeId: employee.employeeId,
          name: employee.name,
          department: employee.department,
          designation: employee.designation,
        },

        monthlySalary,

        attendance: {
          presentDays,
          halfDays,
          absentDays,
          leaveDays,
        },

     payableDays: Number(
  payableDays.toFixed(2),
),

totalWorkingHours: Number(
  totalWorkingHours.toFixed(2),
),

hourlyRate: Number(
  hourlyRate.toFixed(2),
),

calculatedSalary: Number(
  calculatedSalary.toFixed(2),
),
      });
    }

    res.status(200).json({
      message: "Payroll fetched successfully",

      month: month + 1,
      year,

      totalEmployees: payroll.length,

      payroll,
    });
  } catch (error) {
    console.error("Get all payroll error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  getEmployeePayroll,
  getAllPayroll,
};