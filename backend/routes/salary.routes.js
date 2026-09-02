const express = require("express");

const {
  updateSalary,
  getEmployeeSalary,
  getMySalary,
} = require("../controllers/salary.controller");

const protect = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");

const router = express.Router();

// ADMIN: update employee salary
router.put(
  "/:id",
  protect,
  authorize("admin"),
  updateSalary
);

// ADMIN: view any employee salary
router.get(
  "/:id",
  protect,
  authorize("admin"),
  getEmployeeSalary
);

// EMPLOYEE: view own salary
router.get(
  "/me",
  protect,
  authorize("employee"),
  getMySalary
);

module.exports = router;