const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../Models/Admin");
const isLoggedIn = require("../middleware/isLoggedIn");
const isAdmin = require("../middleware/isAdmin");
const isSuperAdmin = require("../middleware/isSuperAdmin");
const insuranceController = require("../controller/admin_insurance");
const loanApplicationController = require("../controller/admin_loan");

router.post("/verify", (req, res) => {
  const { code } = req.body;

  if (code !== "Hello") {
    return res.status(401).json({ message: "Invalid verification code" });
  }

  req.session.verified = true;

  res.json({ message: "Verified successfully" });
});

const verify = router.get("/check-access", (req, res) => {
  if (!req.session.verified) {
    return res.status(401).json({ message: "Verification required" });
  }
  req.session.verified = false;

  res.json({ access: true });
});

//signup
router.post("/signup", isLoggedIn, isSuperAdmin, async (req, res) => {
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
      { expiresIn: "1d" },
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

//Insurance API
router.get(
  "/insurance/pending/applications",
  isLoggedIn,
  isAdmin,
  insuranceController.pendinginsuranceApplication,
);
router.get(
  "/insurance/approve/applications",
  isLoggedIn,
  isAdmin,
  insuranceController.approveinsuranceApplication,
);
router.get(
  "/insurance/reject/applications",
  isLoggedIn,
  isAdmin,
  insuranceController.rejectinsuranceApplication,
);
router.get(
  "/insurance/applications/:id",
  isLoggedIn,
  isAdmin,
  insuranceController.insuranceDetail,
);
router.patch(
  "/insurance/applications/:id/status",
  isLoggedIn,
  isAdmin,
  insuranceController.updateStatus,
);

router.post(
  "/insurance/new",
  isLoggedIn,
  isAdmin,
  insuranceController.NewInsurance,
);

router.delete(
  "/insurance/:id",
  isLoggedIn,
  isAdmin,
  insuranceController.deleteInsurance,
);

//Loan API
router.get(
  "/applications",
  isLoggedIn,
  isAdmin,
  loanApplicationController.LoanApplications,
);
router.get(
  "/reject/applications",
  isLoggedIn,
  isAdmin,
  loanApplicationController.rejectLoanApplications,
);
router.get(
  "/approve/applications",
  isLoggedIn,
  isAdmin,
  loanApplicationController.approveLoanApplications,
);

router.get(
  "/applications/:id",
  isLoggedIn,
  isAdmin,
  loanApplicationController.ApplicationDetail,
);

router.patch(
  "/applications/:id/status",
  isLoggedIn,
  isAdmin,
  loanApplicationController.updateStatus,
);

router.post(
  "/loans/new",
  isLoggedIn,
  isAdmin,
  loanApplicationController.NewLoan,
);

router.delete(
  "/loans/:id",
  isLoggedIn,
  isAdmin,
  loanApplicationController.DeleteLoan,
);

module.exports = router;
