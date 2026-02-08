const express=require('express');
const insuranceApplication=require("../Models/InsuranceApplication");

module.exports.pendinginsuranceApplication = async (req, res) => {
  try {
    console.log("request come");

    const applications = await insuranceApplication.find().populate("insuranceId", "title type");

    console.log(applications);
    res.json(applications);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Some Error to fetch Information" });
  }
};

module.exports.approveinsuranceApplication=async(req,res)=>{
  try{
    const applications=await insuranceApplication.find({status: "approved"}).populate("insuranceId", "title type");
    // console.log(applications);
    res.json(applications);
  }catch(err){
    console.log(err);
    res.json({message:"Some Error to fetch Information"});
  }
    
}
module.exports.rejectinsuranceApplication=async(req,res)=>{
  console.log("request come")
  try{
    const applications=await insuranceApplication.find({status: "rejected"}).populate("insuranceId", "title type");
    console.log(applications);
    res.json(applications);
  }catch(err){
    console.log(err);
    res.json({message:"Some Error to fetch Information"});
  }
    
}

module.exports.insuranceDetail=async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const application = await insuranceApplication.findById(id);
    console.log(application);
    res.json(application);
  } catch (err) {
    console.log(err);
    res.json({ message: "Error to Fetch Detail" });
  }
}

module.exports.updateStatus=async (req, res) => {
    try {
      const { id } = req.params;
      const { status, adminRemark } = req.body;

      if (!["approved", "rejected"].includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
      }

      const application = await insuranceApplication.findById(id);

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
