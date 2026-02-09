const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const InsuranceModel = require("../Models/insurance");
const InsuranceApplication = require("../Models/InsuranceApplication");
const insuranceController = require("../controller/insurance");
const { upload, uploadMultipleToGridFS } = require("../middleware/upload");
const isLoggedIn = require("../middleware/isLoggedIn");
const User=require("../Models/user")
router.get("/Childinsurance", insuranceController.AllChildInsurance);

router.get("/RetirementInsurance", insuranceController.AllRetirementInsurance);

router.get("/SecurityInsurance", insuranceController.AllSecurityInsurance);

router.get("/FamilyInsurance", insuranceController.AllFamilyInsurance);

router.get("/WealthInsurance", insuranceController.AllwealthInsurance);

router.get("/my", isLoggedIn, async (req, res) => {
  console.log("👉 Request reached /lifeInsurance/my");

  try {
   
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("User email used for filter:", user.email);

    const applications = await InsuranceApplication.find({
      email: user.email
    }).populate("insuranceId");

    console.log("Filtered applications:", applications);

    res.json(applications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

);
router.get("/:id", insuranceController.AllDocuments);



router.post(
  "/apply-insurance/:id",
  upload.array("files", 10),
  uploadMultipleToGridFS,
  insuranceController.ApplyInsurance,
);

module.exports = router;
