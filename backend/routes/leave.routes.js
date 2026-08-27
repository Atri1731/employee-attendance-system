const express = require("express");

const router = express.Router();

const protect = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");

const {
  applyLeave,
  getMyLeaves,
  getAllLeaves,
  updateLeaveStatus,
} = require("../controllers/leave.controller");


// Employee applies for leave
router.post("/", protect, applyLeave);


// Employee views their own leaves
router.get("/my", protect, getMyLeaves);


// Admin views all leaves
router.get(
  "/",
  protect,
  authorize("admin"),
  getAllLeaves
);


// Admin approves/rejects leave
router.put(
  "/:id/status",
  protect,
  authorize("admin"),
  updateLeaveStatus
);


module.exports = router;