const express = require("express");

const {
  markAttendance,
  markAbsent,
  getAllAttendance,
  getEmployeeAttendance,
   getMyAttendance,
  checkIn,
  checkOut,
} = require("../controllers/attendance.controller");

const protect = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");

const router = express.Router();
router.post("/check-in", protect, checkIn);

router.put("/check-out", protect, checkOut);

router.get("/my", protect, getMyAttendance);

router.post(
  "/",
  protect,
  authorize("admin"),
  markAttendance
);


router.post(
  "/absent",
  protect,
  authorize("admin"),
  markAbsent
);

router.get(
  "/",
  protect,
  authorize("admin"),
  getAllAttendance
);

router.get(
  "/employee/:employeeId",
  protect,
  authorize("admin"),
  getEmployeeAttendance
);
module.exports = router;