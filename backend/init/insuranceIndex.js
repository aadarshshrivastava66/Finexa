const mongoose = require("mongoose");
const insuranceData = require("./insuranceData");
const InsuranceModel = require("../Models/insurance");
const mongoUrl = process.env.MONGO_URI;

async function initDB() {
  try {
    await mongoose.connect(mongoUrl);
    console.log("Connected to MongoDB");

    await InsuranceModel.insertMany(insuranceData.initData);
    console.log("Insurance data inserted successfully");

    await mongoose.connection.close();
    console.log("MongoDB connection closed");
  } catch (error) {
    console.error("Error initializing DB:", error);
  }
}

initDB();
