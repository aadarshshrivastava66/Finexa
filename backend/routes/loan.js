const express = require("express");
const router = express.Router();

const Loan = require("../Models/loan");
const LoanApplication = require("../Models/loanApplication");
const User = require("../Models/user");
const loanController = require("../controller/lone");
const { upload, uploadMultipleToGridFS } = require("../middleware/upload");
const isLoggedIn = require("../middleware/isLoggedIn");

router.get("/", loanController.AllLoan);

router.get("/:id/checkEligibility", loanController.loanDetail);

router.post(
  "/apply",
  isLoggedIn,
  upload.array("files", 5), // Multer handles multiple files
  uploadMultipleToGridFS, // GridFS upload
  loanController.ApplyLoan,
);

router.get("/my", isLoggedIn, loanController.LoanApplication);

router.post("/:loanId/calculate-emi", loanController.emiCalculator);

module.exports = router;
