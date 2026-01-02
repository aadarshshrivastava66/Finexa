const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const Admin = require("../Models/Admin");
const LoanApplication = require("../Models/loanApplication");

const isLoggedIn = require("../middleware/isLoggedIn");
const isAdmin = require("../middleware/isAdmin");
const isSuperAdmin=require('../middleware/isSuperAdmin')

router.post("/verify", (req, res) => {
  const { code } = req.body;

  if (code !== "Hello") {
    return res.status(401).json({ message: "Invalid verification code" });
  }

  req.session.verified = true;

  res.json({ message: "Verified successfully" });
});

const verify=router.get("/check-access", (req, res) => {
  if (!req.session.verified) {
    return res.status(401).json({ message: "Verification required" });
  }
  req.session.verified = false;

  res.json({ access: true });
});


//signup
router.post("/signup",verify, async (req, res) => {
  const { firstName, lastName, email, phone, password, role } = req.body;

  try {
    const existingAdmin = await Admin.findOne({
      $or: [{ email: email.toLowerCase() }, { phone }],
    });

    if (existingAdmin) {
      return res.status(409).json({ message: "Admin already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      name: `${firstName} ${lastName}`,
      email: email.toLowerCase(),
      phone,
      password: hashedPassword,
      role,
    });

    await newAdmin.save();

    res.status(201).json({ message: "Admin registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

//login

router.post("/login", async (req, res) => {
  const { identifier, password } = req.body;

  try {
    const admin = await Admin.findOne({
      $or: [{ email: identifier }, { phone: identifier }],
    });

    if (!admin) {
      return res.status(400).json({ message: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { userId: admin._id, role: admin.role },
      "your_secret_key",
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Login successful",
      userId: admin._id,
      role: admin.role,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});



router.get("/applications", isLoggedIn, isAdmin, async (req, res) => {
  try {
    const applications = await LoanApplication.find()
      .populate("user", "name email phone")
      .populate("loan")
      .sort({ createdAt: -1 });

    res.json(applications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

//all applications
router.get("/applications/:id", isLoggedIn, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Application ID missing" });
    }

    const application = await LoanApplication.findById(id)
      .populate("user", "name email phone")
      .populate("loan");

    console.log(application)

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.json(application);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

//application Detail
router.patch(
  "/applications/:id/status",
  isLoggedIn,
  isAdmin,
  async (req, res) => {
    try {
      const { id } = req.params;
      const { status, adminRemark } = req.body;

      if (!["approved", "rejected"].includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
      }

      const application = await LoanApplication.findById(id);

      if (!application) {
        return res.status(404).json({ message: "Application not found" });
      }

      application.status = status;
      application.adminRemark = adminRemark;
      application.reviewedBy = req.user._id;
      application.reviewedAt = new Date();

      await application.save();

      res.json({
        message: `Application ${status} successfully`,
        application,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
);


module.exports = router;
  