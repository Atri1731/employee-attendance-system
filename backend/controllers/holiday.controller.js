const Holiday = require("../models/holiday.model");

// =========================
// GET ALL HOLIDAYS
// =========================

const getAllHolidays = async (req, res) => {
  try {
    const holidays = await Holiday.find().sort({
      date: 1,
    });

    res.status(200).json({
      message: "Holidays fetched successfully",
      holidays,
    });
  } catch (error) {
    console.error("Get holidays error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// =========================
// CREATE HOLIDAY
// =========================

const createHoliday = async (req, res) => {
  try {
    const {
      holidayId,
      name,
      date,
      description,
    } = req.body;

    if (!holidayId || !name || !date) {
      return res.status(400).json({
        message: "Holiday ID, name and date are required",
      });
    }

    const existingHoliday = await Holiday.findOne({
      $or: [
        { holidayId },
        { name },
      ],
    });

    if (existingHoliday) {
      return res.status(400).json({
        message: "Holiday already exists",
      });
    }

    const holiday = await Holiday.create({
      holidayId,
      name,
      date,
      description,
    });

    res.status(201).json({
      message: "Holiday created successfully",
      holiday,
    });
  } catch (error) {
    console.error("Create holiday error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// =========================
// UPDATE HOLIDAY
// =========================

const updateHoliday = async (req, res) => {
  try {
    const {
      name,
      date,
      description,
      status,
    } = req.body;

    const holiday = await Holiday.findById(
      req.params.id
    );

    if (!holiday) {
      return res.status(404).json({
        message: "Holiday not found",
      });
    }

    if (name !== undefined) {
      holiday.name = name;
    }

    if (date !== undefined) {
      holiday.date = date;
    }

    if (description !== undefined) {
      holiday.description = description;
    }

    if (status !== undefined) {
      holiday.status = status;
    }

    await holiday.save();

    res.status(200).json({
      message: "Holiday updated successfully",
      holiday,
    });
  } catch (error) {
    console.error("Update holiday error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// =========================
// DELETE HOLIDAY
// =========================

const deleteHoliday = async (req, res) => {
  try {
    const holiday = await Holiday.findById(
      req.params.id
    );

    if (!holiday) {
      return res.status(404).json({
        message: "Holiday not found",
      });
    }

    await holiday.deleteOne();

    res.status(200).json({
      message: "Holiday deleted successfully",
    });
  } catch (error) {
    console.error("Delete holiday error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  getAllHolidays,
  createHoliday,
  updateHoliday,
  deleteHoliday,
};