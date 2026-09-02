const mongoose = require("mongoose");

const payrollSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    month: {
      type: Number,
      required: true,
      min: 1,
      max: 12,
    },

    year: {
      type: Number,
      required: true,
    },

    monthlySalary: {
      type: Number,
      required: true,
      min: 0,
    },

    totalDays: {
      type: Number,
      required: true,
    },

    presentDays: {
      type: Number,
      default: 0,
    },

    absentDays: {
      type: Number,
      default: 0,
    },

    halfDays: {
      type: Number,
      default: 0,
    },

    leaveDays: {
      type: Number,
      default: 0,
    },

    perDaySalary: {
      type: Number,
      default: 0,
    },

    calculatedSalary: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["pending", "processed", "paid"],
      default: "processed",
    },
  },
  {
    timestamps: true,
  },
);

// One payroll record per employee per month
payrollSchema.index(
  {employee: 1, month: 1, year: 1},
  {unique: true},
);

module.exports = mongoose.model("Payroll", payrollSchema);