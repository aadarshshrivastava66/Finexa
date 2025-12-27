
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Loan = require("./Models/loan");

const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://127.0.0.1:27017/finexaDB")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.get("/loans", async (req, res) => {
  const loans = await Loan.find({});
  res.json(loans);
});

app.get("/loans/:id/checkEligibility", async (req, res) => {
  console.log("Eligibility API hit");

  const loan = await Loan.findById(req.params.id);
  if (!loan) return res.status(404).json({ message: "Loan not found" });

  res.json(loan);
});


app.listen(8080, () => {
  console.log("Server running on port 8080");
});
