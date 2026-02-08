const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const InsuranceModel = require("../Models/insurance");
const InsuranceApplication = require("../Models/InsuranceApplication");
const insuranceController = require("../controller/insurance");
const { upload, uploadMultipleToGridFS } = require("../middleware/upload");

router.get("/Childinsurance", insuranceController.AllChildInsurance);

router.get("/RetirementInsurance", insuranceController.AllRetirementInsurance);

router.get("/SecurityInsurance", insuranceController.AllSecurityInsurance);

router.get("/FamilyInsurance", insuranceController.AllFamilyInsurance);

router.get("/WealthInsurance", insuranceController.AllwealthInsurance);

router.get("/:id", insuranceController.AllDocuments);

router.post(
  "/apply-insurance/:id",
  upload.array("files", 10),
  uploadMultipleToGridFS,
  insuranceController.ApplyInsurance,
);

module.exports = router;
