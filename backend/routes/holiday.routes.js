const express = require("express");

const router = express.Router();

const protect = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");

const {
  getAllHolidays,
  createHoliday,
  updateHoliday,
  deleteHoliday,
} = require("../controllers/holiday.controller");

// Get all holidays
// Admin + Employee can view holidays
router.get(
  "/",
  protect,
  authorize("admin", "employee"),
  getAllHolidays
);

// Create holiday - Admin only
router.post(
  "/",
  protect,
  authorize("admin"),
  createHoliday
);

// Update holiday - Admin only
router.put(
  "/:id",
  protect,
  authorize("admin"),
  updateHoliday
);

// Delete holiday - Admin only
router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteHoliday
);

module.exports = router;