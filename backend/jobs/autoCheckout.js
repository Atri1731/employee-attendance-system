const cron = require("node-cron");
const Attendance = require("../models/attendance.model");

const autoCheckout = () => {
  // Runs every day at 6:00 PM IST
  cron.schedule(
    "0 18 * * *",
    async () => {
      try {
        console.log("Running automatic checkout...");

        const today = new Intl.DateTimeFormat("en-CA", {
          timeZone: "Asia/Kolkata",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }).format(new Date());

        const startOfDay = new Date(
          `${today}T00:00:00+05:30`
        );

        const endOfDay = new Date(
          `${today}T23:59:59.999+05:30`
        );

        // Find employees who checked in but forgot to check out
        const result = await Attendance.updateMany(
          {
            date: {
              $gte: startOfDay,
              $lte: endOfDay,
            },
            checkIn: {
              $ne: null,
            },
            checkOut: null,
          },
          {
            $set: {
              checkOut: "18:00",
              remarks: "Automatic checkout at 6:00 PM",
            },
          }
        );

        console.log(
          `Automatic checkout completed. Updated ${result.modifiedCount} attendance records.`
        );
      } catch (error) {
        console.error(
          "Automatic checkout error:",
          error
        );
      }
    },
    {
      timezone: "Asia/Kolkata",
    }
  );

  console.log("Automatic checkout scheduler started.");
};

module.exports = autoCheckout;