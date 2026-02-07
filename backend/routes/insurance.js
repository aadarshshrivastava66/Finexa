const express = require("express");
const router = express.Router();
const mongoose=require('mongoose')

const InsuranceModel = require("../Models/insurance");
const InsuranceApplication = require("../Models/InsuranceApplication");

const { upload, uploadMultipleToGridFS } = require("../middleware/upload");

/* GET ALL CHILD INSURANCE */
router.get("/Childinsurance", async (req, res) => {
  try {
    const allData = await InsuranceModel.find({ type: "Child-Education" });
    res.json(allData);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/RetirementInsurance", async (req, res) => {
  try {
    const allData = await InsuranceModel.find({ type: "Retiremen-Plan" });
    res.json(allData);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/SecurityInsurance", async (req, res) => {
  try {
    const allData = await InsuranceModel.find({ type: "Saving" });
    res.json(allData);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/FamilyInsurance", async (req, res) => {
  try {
    const allData = await InsuranceModel.find({ type: "family-Protection" });
    res.json(allData);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/WealthInsurance", async (req, res) => {
  try {
    const allData = await InsuranceModel.find({ type: "Weath-Creation" });
    res.json(allData);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const insurance = await InsuranceModel.findById(req.params.id).select("documentsRequired");
    if (!insurance) return res.status(404).json({ message: "Insurance not found" });
    res.json(insurance);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/* APPLY INSURANCE (WITH DOCUMENTS) */
router.post(
  "/apply-insurance/:id",
  upload.array("files", 10),
  uploadMultipleToGridFS,
  async (req, res) => {
    try {
      const insuranceId = req.params.id;

      
      if (!mongoose.Types.ObjectId.isValid(insuranceId)) {
        return res.status(400).json({ message: "Invalid insurance ID" });
      }

      const {
        fullName,
        email,
        mobile,
        dateOfBirth,
        annualIncome,
        nomineeName,
        nomineeRelation,
        documentsMeta,
      } = req.body;

      const docNames = JSON.parse(documentsMeta || "[]");

      const documents = req.files.map((file, index) => ({
        documentType: docNames[index],
        fileId: file.id,
      }));

      const application = new InsuranceApplication({
        insuranceId,
        fullName,
        email,
        mobile,
        dateOfBirth,
        annualIncome,
        nomineeName,
        nomineeRelation,
        documents,
        status: "pending",
      });

      await application.save();

      res.status(201).json({ message: "Application submitted" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
);


module.exports = router;
