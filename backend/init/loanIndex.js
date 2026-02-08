const mongoose = require("mongoose");
const Loan = require("../Models/loan");
const loanData = require("./loanData");
const mongoUrl = process.env.MONGO_URI;
async function initDB() {
  try {
    await mongoose.connect(mongoUrl);
    console.log("MongoDB connected");

    await Loan.deleteMany({});
    console.log("Old loans removed");

    await Loan.insertMany(loanData.initData);
    console.log("Loan data inserted successfully");

    await mongoose.connection.close();
    console.log("🔌 MongoDB connection closed");
  } catch (err) {
    console.error(" Error inserting loan data:", err);
    process.exit(1);
  }
}

initDB();
