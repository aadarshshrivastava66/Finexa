const express = require("express");
const router = express.Router();
const User = require("../Models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register
router.post("/singup", async (req, res) => {
  const { firstName, lastName, email, phone, password } = req.body;

  try {
    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name: `${firstName} ${lastName}`,
      email,
      phone,
      password: hashedPassword,
    });

    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { identifier, password } = req.body;

  try {
    const user = await User.findOne({
      $or: [{ email: identifier }, { phone: identifier }],
    });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid Password" });

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      "your_secret_key",
      {
        expiresIn: "1d",
      }
    );

    // Send HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // true in production with HTTPS
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res
      .status(200)
      .json({ message: "Login successful", userId: user._id, role: user.role });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Logout
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
});

// Get current user
router.get("/me", (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Not authenticated" });

  try {
    const decoded = jwt.verify(token, "your_secret_key");
    res.json({ user: { userId: decoded.userId, role: decoded.role } });
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
});




module.exports = router;
