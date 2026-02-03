const express = require("express");
const router = express.Router();

const Loan = require("../Models/loan");
const LoanApplication = require("../Models/loanApplication");
const User = require("../Models/user");

const { upload, uploadMultipleToGridFS } = require("../middleware/upload");
const isLoggedIn = require("../middleware/isLoggedIn");

/* GET ALL ACTIVE LOANS */
router.get("/", async (req, res) => {
  try {
    const loans = await Loan.find({ isActive: true });
    res.json(loans);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/* GET SINGLE LOAN */
router.get("/:id/checkEligibility", async (req, res) => {
  try {
    const loan = await Loan.findById(req.params.id);
    if (!loan) return res.status(404).json({ message: "Loan not found" });
    res.json(loan);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/* APPLY LOAN WITH DOCUMENTS */
router.post(
  "/apply",
  isLoggedIn,
  upload.array("files", 5),       // Multer handles multiple files
  uploadMultipleToGridFS,         // GridFS upload
  async (req, res) => {
    try {
      const { loanId, appliedAmount, employmentType, annualIncome, documentsMeta } = req.body;

      if (!loanId) return res.status(400).json({ message: "Loan ID is required" });

      const docNames = JSON.parse(documentsMeta || "[]");

      const documents = req.files.map((file, index) => ({
        documentType: docNames[index],
        fileId: file.id,
      }));

      const application = new LoanApplication({
        user: req.user.userId,
        loan: loanId,
        appliedAmount,
        employmentType,
        annualIncome,
        documents,
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
      res.status(500).json({ message: "Server error" });
    }
  }
);

/* USER'S LOAN APPLICATIONS */
router.get("/my", isLoggedIn, async (req, res) => {
  try {
    const applications = await LoanApplication.find({ user: req.user.userId }).populate("loan");
    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/* EMI CALCULATION */
const calculateEMI = (principal, annualRate, tenureYears) => {
  const r = annualRate / 12 / 100;
  const n = tenureYears * 12;
  return Math.round((principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
};

/* EMI PREVIEW */
router.post("/:loanId/calculate-emi", isLoggedIn, async (req, res) => {
  try {
    const { loanId } = req.params;
    const { amount } = req.body;

    const loan = await Loan.findById(loanId);
    if (!loan) return res.status(404).json({ message: "Loan not found" });

    if (amount < loan.minAmount || amount > loan.maxAmount) {
      return res.status(400).json({ message: `Amount must be between ${loan.minAmount} and ${loan.maxAmount}` });
    }

    const emi = calculateEMI(amount, parseFloat(loan.interestRate), loan.tenure);

    res.json({
      loanName: loan.name,
      interestRate: loan.interestRate,
      tenure: loan.tenure,
      emi,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
