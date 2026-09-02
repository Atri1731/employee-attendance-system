// const cron = require("node-cron");
// const Attendance = require("../models/attendance.model");

// const autoCheckout = () => {
//   // Runs every day at 6:00 PM IST
//   cron.schedule(
//     "0 18 * * *",
//     async () => {
//       try {
//         console.log("Running automatic checkout...");

//         const today = new Intl.DateTimeFormat("en-CA", {
//           timeZone: "Asia/Kolkata",
//           year: "numeric",
//           month: "2-digit",
//           day: "2-digit",
//         }).format(new Date());

//         const startOfDay = new Date(
//           `${today}T00:00:00+05:30`
//         );

//         const endOfDay = new Date(
//           `${today}T23:59:59.999+05:30`
//         );

//         // Find employees who checked in but forgot to check out
//         const result = await Attendance.updateMany(
//           {
//             date: {
//               $gte: startOfDay,
//               $lte: endOfDay,
//             },
//             checkIn: {
//               $ne: null,
//             },
//             checkOut: null,
//           },
//           {
//             $set: {
//               checkOut: "18:00",
//               remarks: "Automatic checkout at 6:00 PM",
//             },
//           }
//         );

//         console.log(
//           `Automatic checkout completed. Updated ${result.modifiedCount} attendance records.`
//         );
//       } catch (error) {
//         console.error(
//           "Automatic checkout error:",
//           error
//         );
//       }
//     },
//     {
//       timezone: "Asia/Kolkata",
//     }
//   );

//   console.log("Automatic checkout scheduler started.");
// };

// module.exports = autoCheckout;

const cron = require("node-cron");
const Attendance = require("../models/attendance.model");

const TIME_ZONE = "Asia/Kolkata";

// Run every day at 6:00 PM IST
cron.schedule(
  "0 18 * * *",
  async () => {
    try {
      console.log("Running automatic checkout job...");

      const now = new Date();

      // Get today's date in IST
      const today = new Intl.DateTimeFormat("en-CA", {
        timeZone: TIME_ZONE,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(now);

      const startOfDay = new Date(
        `${today}T00:00:00+05:30`
      );

      const endOfDay = new Date(
        `${today}T23:59:59.999+05:30`
      );

      // Find employees who checked in
      // but did NOT check out
      const attendanceRecords = await Attendance.find({
        date: {
          $gte: startOfDay,
          $lte: endOfDay,
        },
        checkIn: {
          $ne: null,
        },
        checkOut: null,
        status: "present",
      });

      if (attendanceRecords.length === 0) {
        console.log("No pending check-outs found.");
        return;
      }

      // Set checkout time to 6:00 PM
      for (const attendance of attendanceRecords) {
        attendance.checkOut = "18:00";

        await attendance.save();
      }

      console.log(
        `Automatic checkout completed for ${attendanceRecords.length} employee(s).`
      );
    } catch (error) {
      console.error(
        "Automatic checkout job error:",
        error
      );
    }
  },
  {
    timezone: TIME_ZONE,
  }
);

console.log("Automatic checkout job scheduled.");