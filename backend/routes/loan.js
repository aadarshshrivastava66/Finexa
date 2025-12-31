const express = require("express");
const router = express.Router();

const Loan = require("../Models/loan");
const LoanApplication = require("../Models/loanApplication");
const User = require("../Models/user");

const isLoggedIn = require("../middleware/isLoggedIn");

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

/* Apply Loan (USER must be logged in) */
router.post("/apply", isLoggedIn, async (req, res) => {
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

/* Get logged-in user's applications */
router.get("/my", isLoggedIn, async (req, res) => {
  try {
    const applications = await LoanApplication.find({
      user: req.user.userId,
    }).populate("loan");

    res.json(applications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

/* EMI Calculation Logic */
const calculateEMI = (principal, annualRate, tenureYears) => {
  const r = annualRate / 12 / 100;
  const n = tenureYears * 12;

  const emi =
    (principal * r * Math.pow(1 + r, n)) /
    (Math.pow(1 + r, n) - 1);

  return Math.round(emi);
};

/* EMI Preview API */
router.post("/:loanId/calculate-emi", async (req, res) => {
  try {
    const { loanId } = req.params;
    const { amount } = req.body;

    const loan = await Loan.findById(loanId);
    if (!loan) {
      return res.status(404).json({ message: "Loan not found" });
    }

    if (amount < loan.minAmount || amount > loan.maxAmount) {
      return res.status(400).json({
        message: `Amount must be between ${loan.minAmount} and ${loan.maxAmount}`,
      });
    }

    const interestRate = parseFloat(loan.interestRate);
    const emi = calculateEMI(amount, interestRate, loan.tenure);

    res.json({
      loanName: loan.name,
      interestRate,
      tenure: loan.tenure,
      emi,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
