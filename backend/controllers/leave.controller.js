const Leave = require("../models/leave.model");

// Employee applies for leave
const applyLeave = async (req, res) => {
  try {
    const { leaveType, fromDate, toDate, reason } = req.body;

    if (!leaveType || !fromDate || !toDate || !reason) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    if (new Date(toDate) < new Date(fromDate)) {
      return res.status(400).json({
        message: "To date cannot be before from date",
      });
    }

    const leave = await Leave.create({
      employee: req.user.id,
      leaveType,
      fromDate,
      toDate,
      reason,
    });

    res.status(201).json({
      message: "Leave request submitted successfully",
      leave,
    });
  } catch (error) {
    console.error("Apply leave error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};


// Employee views their own leaves
const getMyLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find({
      employee: req.user.id,
    })
      .populate(
        "employee",
        "employeeId name email department designation"
      )
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "My leaves fetched successfully",
      count: leaves.length,
      leaves,
    });
  } catch (error) {
    console.error("Get my leaves error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};


// Admin views all leave requests
const getAllLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find()
      .populate(
        "employee",
        "employeeId name email department designation"
      )
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "All leaves fetched successfully",
      count: leaves.length,
      leaves,
    });
  } catch (error) {
    console.error("Get all leaves error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};


// Admin approves/rejects leave
const updateLeaveStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({
        message: "Invalid leave status",
      });
    }

    const leave = await Leave.findById(req.params.id);

    if (!leave) {
      return res.status(404).json({
        message: "Leave request not found",
      });
    }

    leave.status = status;

    await leave.save();

    res.status(200).json({
      message: `Leave request ${status} successfully`,
      leave,
    });
  } catch (error) {
    console.error("Update leave status error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};


module.exports = {
  applyLeave,
  getMyLeaves,
  getAllLeaves,
  updateLeaveStatus,
};