const express = require("express");

const {
  getEmployeePayroll,
  getAllPayroll,
} = require("../controllers/payroll.controller");

const protect = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");

const router = express.Router();

// Employee can view their own payroll
router.get("/me", protect, getEmployeePayroll);

// Admin can view payroll of all employees
router.get("/", protect, authorize("admin"), getAllPayroll);

// Admin can view a specific employee's payroll
router.get("/:id", protect, authorize("admin"), getEmployeePayroll);

module.exports = router;