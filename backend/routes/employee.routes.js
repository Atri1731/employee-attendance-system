const express = require("express");

const {
  createEmployee,
  getAllEmployees,
  updateEmployee,
  deleteEmployee,
  getMyProfile,
  updateMyProfile,
} = require("../controllers/employee.controller");

const protect = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");

const router = express.Router();

// Get all employees
router.get("/", protect, authorize("admin"), getAllEmployees);

router.post("/", protect, authorize("admin"), createEmployee);

router.get("/me", protect, getMyProfile);

router.put("/me", protect, updateMyProfile);

router.put("/:id", protect, authorize("admin"), updateEmployee);

router.delete("/:id", protect, authorize("admin"), deleteEmployee);

module.exports = router;