// // const express = require("express");

// // const {
// //   register,
// //   login,
// //   forgotPassword,
// //   resetPassword,
// // } = require("../controllers/auth.controller");

// // const router = express.Router();

// // // Register Admin
// // router.post("/register", register);

// // // Login
// // router.post("/login", login);

// // // Forgot Password
// // router.post("/forgot-password", forgotPassword);

// // // Reset Password
// // router.post("/reset-password/:token", resetPassword);

// // module.exports = router;





// const express = require("express");

// const {
//   register,
//   createAdmin,
//   login,
//   forgotPassword,
//   resetPassword,
// } = require("../controllers/auth.controller");

// const authMiddleware = require("../middleware/auth.middleware");
// const roleMiddleware = require("../middleware/role.middleware");

// const router = express.Router();

// // Public registration is disabled in the controller
// router.post("/register", register);

// // Login
// router.post("/login", login);

// // Create another Admin — authenticated Admins only
// router.post(
//   "/admins",
//   authMiddleware,
//   roleMiddleware("admin"),
//   createAdmin
// );

// // Forgot Password
// router.post("/forgot-password", forgotPassword);

// // Reset Password
// router.post("/reset-password/:token", resetPassword);

// module.exports = router;




const express = require("express");

const {
  register,
  createAdmin,
  login,
  forgotPassword,
  resetPassword,
} = require("../controllers/auth.controller");

const protect = require("../middleware/auth.middleware");

const router = express.Router();

// Public registration disabled
router.post("/register", register);

// Login
router.post("/login", login);

// Create Admin — authenticated Admin only
router.post("/admins", protect, createAdmin);

// Forgot Password
router.post("/forgot-password", forgotPassword);

// Reset Password
router.post("/reset-password/:token", resetPassword);

module.exports = router;
