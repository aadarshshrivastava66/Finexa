const express = require("express");
const router = express.Router();

const Loan = require("../Models/loan");
const LoanApplication = require("../Models/loanApplication");
const User = require("../Models/user");
const authMiddleware = require("../middleware/authMiddleware");

/* Get all loan products */
router.get("/", async (req, res) => {
  const loans = await Loan.find({ isActive: true });
  res.json(loans);
});

/* Get single loan */
router.get("/:id/checkEligibility", async (req, res) => {
  const loan = await Loan.findById(req.params.id);
  if (!loan) return res.status(404).json({ message: "Loan not found" });
  res.json(loan);
});

/* Apply Loan */
router.post("/apply", authMiddleware, async (req, res) => {
  try {
    const { loanId, appliedAmount, employmentType, annualIncome } = req.body;

    if (!loanId) {
      return res.status(400).json({ message: "Loan product ID is required" });
    }

    const application = new LoanApplication({
      user: req.user.userId,
      loan: loanId,
      appliedAmount,
      employmentType,
      annualIncome,
    });

    await application.save();

    await User.findByIdAndUpdate(req.user.userId, {
      $push: { appliedLoans: application._id },
    });

    res.status(201).json({
      message: "Loan application submitted successfully",
      application,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/my", authMiddleware, async (req, res) => {
  try {
    const applications = await LoanApplication.find({
      user: req.user.userId,
    }).populate("loan"); // populate Loan (product) details

    res.json(applications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
})


module.exports = router;
