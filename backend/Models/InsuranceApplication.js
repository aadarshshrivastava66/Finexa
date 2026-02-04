const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
  documentType: String,
  fileId: mongoose.Schema.Types.ObjectId, 
});

const insuranceApplicationSchema = new mongoose.Schema(
  {
    insuranceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Insurance",
      required: true,
    },

    fullName: String,
    email: String,
    mobile: String,
    dateOfBirth: String,
    annualIncome: Number,

    nomineeName: String,
    nomineeRelation: String,

    documents: [documentSchema],

    status: {
      type: String,
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "InsuranceApplication",
  insuranceApplicationSchema
);
