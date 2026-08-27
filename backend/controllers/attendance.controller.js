// const Attendance = require("../models/attendance.model");
// const User = require("../models/user.model");

// // ===============================
// // Helper: Get start and end of day
// // ===============================
// const getDayRange = (dateValue) => {
//   const startOfDay = new Date(`${dateValue}T00:00:00`);

//   const endOfDay = new Date(`${dateValue}T23:59:59.999`);

//   return {
//     startOfDay,
//     endOfDay,
//   };
// };

// // ===============================
// // Admin: Mark Attendance
// // ===============================
// const markAttendance = async (req, res) => {
//   try {
//     const {
//       employee,
//       date,
//       status,
//       checkIn,
//       checkOut,
//       remarks,
//     } = req.body;

//     if (!employee || !date || !status) {
//       return res.status(400).json({
//         message: "Employee, date and status are required",
//       });
//     }

//     // Check employee exists
//     const employeeExists = await User.findById(employee);

//     if (!employeeExists) {
//       return res.status(404).json({
//         message: "Employee not found",
//       });
//     }

//     // Get selected day range
//     const { startOfDay, endOfDay } = getDayRange(date);

//     // Check if attendance already exists
//     const existingAttendance = await Attendance.findOne({
//       employee,
//       date: {
//         $gte: startOfDay,
//         $lte: endOfDay,
//       },
//     });

//     if (existingAttendance) {
//       return res.status(400).json({
//         message:
//           "Attendance already marked for this employee on this date",
//       });
//     }

//     // Create attendance
//     const attendance = await Attendance.create({
//       employee,
//       date: startOfDay,
//       status,
//       checkIn: checkIn || null,
//       checkOut: checkOut || null,
//       remarks: remarks || "",
//     });

//     const populatedAttendance =
//       await Attendance.findById(attendance._id).populate(
//         "employee",
//         "employeeId name email department designation"
//       );

//     res.status(201).json({
//       message: "Attendance marked successfully",
//       attendance: populatedAttendance,
//     });
//   } catch (error) {
//     console.error("Mark attendance error:", error);

//     res.status(500).json({
//       message: "Server error",
//     });
//   }
// };

// // ===============================
// // Admin: Mark Employee Absent
// // ===============================
// const markAbsent = async (req, res) => {
//   try {
//     const { employeeId, date } = req.body;

//     if (!employeeId || !date) {
//       return res.status(400).json({
//         message: "Employee and date are required",
//       });
//     }

//     // Check employee exists
//     const employeeExists = await User.findById(employeeId);

//     if (!employeeExists) {
//       return res.status(404).json({
//         message: "Employee not found",
//       });
//     }

//     // Get selected day range
//     const { startOfDay, endOfDay } = getDayRange(date);

//     // Check if attendance already exists on this day
//     const existingAttendance = await Attendance.findOne({
//       employee: employeeId,
//       date: {
//         $gte: startOfDay,
//         $lte: endOfDay,
//       },
//     });

//     if (existingAttendance) {
//       return res.status(400).json({
//         message: `Attendance already exists for ${employeeExists.name} on this date`,
//       });
//     }

//     // Create absent record
//     const attendance = await Attendance.create({
//       employee: employeeId,
//       date: startOfDay,
//       status: "absent",
//       checkIn: null,
//       checkOut: null,
//       remarks: "Marked absent by admin",
//     });

//     const populatedAttendance =
//       await Attendance.findById(attendance._id).populate(
//         "employee",
//         "employeeId name email department designation"
//       );

//     res.status(201).json({
//       message: "Employee marked absent successfully",
//       attendance: populatedAttendance,
//     });
//   } catch (error) {
//     console.error("Mark absent error:", error);

//     res.status(500).json({
//       message: "Server error",
//     });
//   }
// };

// // ===============================
// // Admin: Get All Attendance
// // ===============================
// const getAllAttendance = async (req, res) => {
//   try {
//     const attendance = await Attendance.find()
//       .populate(
//         "employee",
//         "employeeId name email department designation"
//       )
//       .sort({ date: -1 });

//     res.status(200).json({
//       message: "Attendance fetched successfully",
//       count: attendance.length,
//       attendance,
//     });
//   } catch (error) {
//     console.error("Get attendance error:", error);

//     res.status(500).json({
//       message: "Server error",
//     });
//   }
// };

// // ===============================
// // Admin: Get Employee Attendance
// // ===============================
// const getEmployeeAttendance = async (req, res) => {
//   try {
//     const { employeeId } = req.params;

//     const attendance = await Attendance.find({
//       employee: employeeId,
//     })
//       .populate(
//         "employee",
//         "employeeId name email department designation"
//       )
//       .sort({ date: -1 });

//     res.status(200).json({
//       message: "Employee attendance fetched successfully",
//       count: attendance.length,
//       attendance,
//     });
//   } catch (error) {
//     console.error(
//       "Get employee attendance error:",
//       error
//     );

//     res.status(500).json({
//       message: "Server error",
//     });
//   }
// };

// // ===============================
// // Employee: Check In
// // ===============================
// const checkIn = async (req, res) => {
//   try {
//     const employeeId = req.user.id;

//     // Today's date
//     const now = new Date();

//     const year = now.getFullYear();
//     const month = String(
//       now.getMonth() + 1
//     ).padStart(2, "0");
//     const day = String(
//       now.getDate()
//     ).padStart(2, "0");

//     const todayString = `${year}-${month}-${day}`;

//     // Get today's range
//     const { startOfDay, endOfDay } =
//       getDayRange(todayString);

//     // Check if attendance already exists today
//     const existingAttendance =
//       await Attendance.findOne({
//         employee: employeeId,
//         date: {
//           $gte: startOfDay,
//           $lte: endOfDay,
//         },
//       });

//     if (existingAttendance) {
//       return res.status(400).json({
//         message: "You have already checked in today",
//       });
//     }

//     // Current time
//     const checkInTime =
//       now.toLocaleTimeString("en-IN", {
//         hour: "2-digit",
//         minute: "2-digit",
//         hour12: false,
//       });

//     // Create attendance
//     const attendance = await Attendance.create({
//       employee: employeeId,
//       date: startOfDay,
//       status: "present",
//       checkIn: checkInTime,
//       checkOut: null,
//       remarks: "",
//     });

//     const populatedAttendance =
//       await Attendance.findById(
//         attendance._id
//       ).populate(
//         "employee",
//         "employeeId name email department designation"
//       );

//     res.status(201).json({
//       message: "Check-in successful",
//       attendance: populatedAttendance,
//     });
//   } catch (error) {
//     console.error("Check-in error:", error);

//     res.status(500).json({
//       message: "Server error",
//     });
//   }
// };

// // ===============================
// // Employee: Check Out
// // ===============================
// const checkOut = async (req, res) => {
//   try {
//     const employeeId = req.user.id;

//     // Today's date
//     const now = new Date();

//     const year = now.getFullYear();
//     const month = String(
//       now.getMonth() + 1
//     ).padStart(2, "0");
//     const day = String(
//       now.getDate()
//     ).padStart(2, "0");

//     const todayString = `${year}-${month}-${day}`;

//     // Get today's range
//     const { startOfDay, endOfDay } =
//       getDayRange(todayString);

//     // Find today's attendance
//     const attendance =
//       await Attendance.findOne({
//         employee: employeeId,
//         date: {
//           $gte: startOfDay,
//           $lte: endOfDay,
//         },
//       });

//     if (!attendance) {
//       return res.status(404).json({
//         message: "You have not checked in today",
//       });
//     }

//     if (attendance.checkOut) {
//       return res.status(400).json({
//         message: "You have already checked out today",
//       });
//     }

//     // Current time
//     const checkOutTime =
//       now.toLocaleTimeString("en-IN", {
//         hour: "2-digit",
//         minute: "2-digit",
//         hour12: false,
//       });

//     // Save checkout time
//     attendance.checkOut = checkOutTime;

//     await attendance.save();

//     const populatedAttendance =
//       await Attendance.findById(
//         attendance._id
//       ).populate(
//         "employee",
//         "employeeId name email department designation"
//       );

//     res.json({
//       message: "Check-out successful",
//       attendance: populatedAttendance,
//     });
//   } catch (error) {
//     console.error("Check-out error:", error);

//     res.status(500).json({
//       message: "Server error",
//     });
//   }
// };

// // ===============================
// // Employee: Get My Attendance
// // ===============================
// const getMyAttendance = async (req, res) => {
//   try {
//     const employeeId = req.user.id;

//     const attendance = await Attendance.find({
//       employee: employeeId,
//     })
//       .populate(
//         "employee",
//         "employeeId name email department designation"
//       )
//       .sort({ date: -1 });

//     res.status(200).json({
//       message: "My attendance fetched successfully",
//       count: attendance.length,
//       attendance,
//     });
//   } catch (error) {
//     console.error(
//       "Get my attendance error:",
//       error
//     );

//     res.status(500).json({
//       message: "Server error",
//     });
//   }
// };

// // ===============================
// // Export
// // ===============================
// module.exports = {
//   markAttendance,
//   markAbsent,
//   getAllAttendance,
//   getEmployeeAttendance,
//   getMyAttendance,
//   checkIn,
//   checkOut,
// };


const Attendance = require("../models/attendance.model");
const User = require("../models/user.model");

const TIME_ZONE = "Asia/Kolkata";

// ===============================
// Helper: Get start and end of day in IST
// ===============================
const getDayRange = (dateValue) => {
  const startOfDay = new Date(
    `${dateValue}T00:00:00+05:30`
  );

  const endOfDay = new Date(
    `${dateValue}T23:59:59.999+05:30`
  );

  return {
    startOfDay,
    endOfDay,
  };
};

// ===============================
// Helper: Get today's date in IST
// ===============================
const getTodayIST = () => {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
};

// ===============================
// Helper: Get current time in IST
// ===============================
const getCurrentTimeIST = () => {
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: TIME_ZONE,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date());
};

// ===============================
// Admin: Mark Attendance
// ===============================
const markAttendance = async (req, res) => {
  try {
    const {
      employee,
      date,
      status,
      checkIn,
      checkOut,
      remarks,
    } = req.body;

    if (!employee || !date || !status) {
      return res.status(400).json({
        message: "Employee, date and status are required",
      });
    }

    const employeeExists = await User.findById(employee);

    if (!employeeExists) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    const { startOfDay, endOfDay } = getDayRange(date);

    const existingAttendance = await Attendance.findOne({
      employee,
      date: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    });

    if (existingAttendance) {
      return res.status(400).json({
        message:
          "Attendance already marked for this employee on this date",
      });
    }

    const attendance = await Attendance.create({
      employee,
      date: startOfDay,
      status,
      checkIn: checkIn || null,
      checkOut: checkOut || null,
      remarks: remarks || "",
    });

    const populatedAttendance =
      await Attendance.findById(attendance._id).populate(
        "employee",
        "employeeId name email department designation"
      );

    res.status(201).json({
      message: "Attendance marked successfully",
      attendance: populatedAttendance,
    });
  } catch (error) {
    console.error("Mark attendance error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// ===============================
// Admin: Mark Employee Absent
// ===============================
const markAbsent = async (req, res) => {
  try {
    const { employeeId, date } = req.body;

    if (!employeeId || !date) {
      return res.status(400).json({
        message: "Employee and date are required",
      });
    }

    const employeeExists = await User.findById(employeeId);

    if (!employeeExists) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    const { startOfDay, endOfDay } = getDayRange(date);

    const existingAttendance = await Attendance.findOne({
      employee: employeeId,
      date: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    });

    if (existingAttendance) {
      return res.status(400).json({
        message: `Attendance already exists for ${employeeExists.name} on this date`,
      });
    }

    const attendance = await Attendance.create({
      employee: employeeId,
      date: startOfDay,
      status: "absent",
      checkIn: null,
      checkOut: null,
      remarks: "Marked absent by admin",
    });

    const populatedAttendance =
      await Attendance.findById(attendance._id).populate(
        "employee",
        "employeeId name email department designation"
      );

    res.status(201).json({
      message: "Employee marked absent successfully",
      attendance: populatedAttendance,
    });
  } catch (error) {
    console.error("Mark absent error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// ===============================
// Admin: Get All Attendance
// ===============================
const getAllAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find()
      .populate(
        "employee",
        "employeeId name email department designation"
      )
      .sort({ date: -1 });

    res.status(200).json({
      message: "Attendance fetched successfully",
      count: attendance.length,
      attendance,
    });
  } catch (error) {
    console.error("Get attendance error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// ===============================
// Admin: Get Employee Attendance
// ===============================
const getEmployeeAttendance = async (req, res) => {
  try {
    const { employeeId } = req.params;

    const attendance = await Attendance.find({
      employee: employeeId,
    })
      .populate(
        "employee",
        "employeeId name email department designation"
      )
      .sort({ date: -1 });

    res.status(200).json({
      message: "Employee attendance fetched successfully",
      count: attendance.length,
      attendance,
    });
  } catch (error) {
    console.error(
      "Get employee attendance error:",
      error
    );

    res.status(500).json({
      message: "Server error",
    });
  }
};

// ===============================
// Employee: Check In
// ===============================
const checkIn = async (req, res) => {
  try {
    const employeeId = req.user.id;

    // Get today's date in India
    const todayString = getTodayIST();

    // Get today's IST range
    const { startOfDay, endOfDay } =
      getDayRange(todayString);

    // Check if attendance already exists today
    const existingAttendance =
      await Attendance.findOne({
        employee: employeeId,
        date: {
          $gte: startOfDay,
          $lte: endOfDay,
        },
      });

    if (existingAttendance) {
      return res.status(400).json({
        message: "You have already checked in today",
      });
    }

    // Get current time in India
    const checkInTime = getCurrentTimeIST();

    // Create attendance
    const attendance = await Attendance.create({
      employee: employeeId,
      date: startOfDay,
      status: "present",
      checkIn: checkInTime,
      checkOut: null,
      remarks: "",
    });

    const populatedAttendance =
      await Attendance.findById(
        attendance._id
      ).populate(
        "employee",
        "employeeId name email department designation"
      );

    res.status(201).json({
      message: "Check-in successful",
      attendance: populatedAttendance,
    });
  } catch (error) {
    console.error("Check-in error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// ===============================
// Employee: Check Out
// ===============================
const checkOut = async (req, res) => {
  try {
    const employeeId = req.user.id;

    // Get today's date in India
    const todayString = getTodayIST();

    // Get today's IST range
    const { startOfDay, endOfDay } =
      getDayRange(todayString);

    // Find today's attendance
    const attendance =
      await Attendance.findOne({
        employee: employeeId,
        date: {
          $gte: startOfDay,
          $lte: endOfDay,
        },
      });

    if (!attendance) {
      return res.status(404).json({
        message: "You have not checked in today",
      });
    }

    if (attendance.checkOut) {
      return res.status(400).json({
        message: "You have already checked out today",
      });
    }

    // Get current time in India
    const checkOutTime = getCurrentTimeIST();

    attendance.checkOut = checkOutTime;

    await attendance.save();

    const populatedAttendance =
      await Attendance.findById(
        attendance._id
      ).populate(
        "employee",
        "employeeId name email department designation"
      );

    res.json({
      message: "Check-out successful",
      attendance: populatedAttendance,
    });
  } catch (error) {
    console.error("Check-out error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// ===============================
// Employee: Get My Attendance
// ===============================
const getMyAttendance = async (req, res) => {
  try {
    const employeeId = req.user.id;

    const attendance = await Attendance.find({
      employee: employeeId,
    })
      .populate(
        "employee",
        "employeeId name email department designation"
      )
      .sort({ date: -1 });

    res.status(200).json({
      message: "My attendance fetched successfully",
      count: attendance.length,
      attendance,
    });
  } catch (error) {
    console.error(
      "Get my attendance error:",
      error
    );

    res.status(500).json({
      message: "Server error",
    });
  }
};

// ===============================
// Export
// ===============================
module.exports = {
  markAttendance,
  markAbsent,
  getAllAttendance,
  getEmployeeAttendance,
  getMyAttendance,
  checkIn,
  checkOut,
};