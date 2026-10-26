
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const readline = require("readline");
require("dotenv").config();

const User = require("../models/user.model");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const ask = (question) =>
  new Promise((resolve) => rl.question(question, resolve));

async function createFirstAdmin() {
  try {
    const name = (await ask("Admin name: ")).trim();
    const email = (await ask("Admin email: ")).trim().toLowerCase();
    const password = await ask("Admin password (min 8 characters): ");

    if (!name || !email || password.length < 8) {
      throw new Error("Enter a name, valid email, and password of at least 8 characters.");
    }

    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing from your backend .env file.");
    }

    await mongoose.connect(process.env.MONGO_URI);

    const existing = await User.findOne({ email });

    if (existing) {
      throw new Error("This email is already registered.");
    }

    const adminCount = await User.countDocuments({ role: "admin" });

    if (adminCount > 0) {
      throw new Error("An Admin already exists. Use Admin Management to add another.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "admin",
      status: "active",
    });

    console.log(`First Admin created successfully: ${admin.email}`);
  } catch (error) {
    console.error("Setup failed:", error.message);
    process.exitCode = 1;
  } finally {
    rl.close();
    await mongoose.disconnect().catch(() => {});
  }
}

createFirstAdmin();
