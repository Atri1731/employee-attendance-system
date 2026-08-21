const express = require("express");

const {
  register,
  login,
  forgotPassword,
  resetPassword,
} = require("../controllers/auth.controller");

const router = express.Router();

// Register Admin
router.post("/register", register);

// Login
router.post("/login", login);

// Forgot Password
router.post("/forgot-password", forgotPassword);

// Reset Password
router.post("/reset-password/:token", resetPassword);

module.exports = router;