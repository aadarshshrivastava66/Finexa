const express=require('express')
const router=express.Router();
const bcrypt=require("bcrypt");
const Admin=require ('../Models/Admin');
const jwt = require("jsonwebtoken");
router.post("/signup", async (req, res) => {
  const { firstName, lastName, email, phone, password ,role} = req.body;

  try {
    const existingAdmin = await Admin.findOne({
      $or: [{ email: email.toLowerCase() }, { phone }],
    });

    if (existingAdmin) {
      return res
        .status(409)
        .json({ message: "Admin already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      name: `${firstName} ${lastName}`,
      email: email.toLowerCase(),
      phone,
      password: hashedPassword,
      role
    });

    await newAdmin.save();

    res.status(201).json({
      message: "Admin registered successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


// Login
router.post("/login", async (req, res) => {
  const { identifier, password } = req.body;

  try {
    const admin = await Admin.findOne({
      $or: [{ email: identifier }, { phone: identifier }],
    });
    if (!admin) return res.status(400).json({ message: "Admin not found" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid Password" });
    console.log(admin);

    // Generate JWT
    const token = jwt.sign(
      { userId: admin._id, role: admin.role },
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
      .json({ message: "Login successful", userId: admin._id, role: admin.role });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports=router;