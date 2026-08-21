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
router.get(
  "/",
  protect,
  authorize("admin"),
  getAllHolidays
);

// Create holiday
router.post(
  "/",
  protect,
  authorize("admin"),
  createHoliday
);

// Update holiday
router.put(
  "/:id",
  protect,
  authorize("admin"),
  updateHoliday
);

// Delete holiday
router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteHoliday
);

module.exports = router;