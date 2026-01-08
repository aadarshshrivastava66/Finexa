const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LoanApplicationSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    loan: {
      type: Schema.Types.ObjectId,
      ref: "Loan", 
      required: true,
    },

    appliedAmount: {
      type: Number,
      required: true,
    },

    employmentType: {
      type: String,
      required: true,
    },

    annualIncome: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    adminRemark: {
      type: String,
    },

    reviewedBy: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
    },

    reviewedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("LoanApplication", LoanApplicationSchema);
