const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const crypto = require("crypto");

// REGISTER ADMIN
const register = async (req, res) => {
  try {
    const {name, email, password, phone} = req.body;

    // Check required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required",
      });
    }

    // Check if email already exists
    const existingUser = await User.findOne({email});

    if (existingUser) {
      return res.status(400).json({
        message: "Email already registered",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create ADMIN account
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      role: "admin",
      status: "active",
    });

    res.status(201).json({
      message: "Admin account created successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// LOGIN
const login = async (req, res) => {
  try {
    const {email, password, role} = req.body;

    // Check fields
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    // Find user
    const user = await User.findOne({email});

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Check role
    if (role && user.role !== role) {
      return res.status(403).json({
        message: `This account is not registered as ${role}`,
      });
    }

    // Compare password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Create JWT token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        employeeId: user.employeeId,
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department,
        designation: user.designation,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// FORGOT PASSWORD
const forgotPassword = async (req, res) => {
  try {
    const {email} = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    const user = await User.findOne({
      email: email.toLowerCase().trim(),
    });

    // Don't reveal whether an email exists
    if (!user) {
      return res.status(200).json({
        message:
          "If an account exists with this email, a reset link will be sent.",
      });
    }

    // Generate random reset token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Store token and expiration in database
    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;

    await user.save();

    // Temporary for development
    console.log("Password reset token:", resetToken);

    res.status(200).json({
      message: "Password reset request received.",
    });
  } catch (error) {
    console.error("Forgot password error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// RESET PASSWORD
const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!token) {
      return res.status(400).json({
        message: "Reset token is required",
      });
    }

    if (!password) {
      return res.status(400).json({
        message: "New password is required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    // Hash the token received from the reset link
    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    // Find user with matching token that has not expired
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired reset token",
      });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update password
    user.password = hashedPassword;

    // Delete reset token so it cannot be reused
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;

    await user.save();

    res.status(200).json({
      message: "Password reset successful. You can now login.",
    });
  } catch (error) {
    console.error("Reset password error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  register,
  login,
  forgotPassword,
  resetPassword,
};
