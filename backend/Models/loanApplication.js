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
    
    salary:{
      type: Number,
      required:true,
    },

    creditScore:{
      type:Number,
      required:true,
    },
    dependents:{
      type:Number,
      required:true
    },
    age:{
      type:Number,
      required:true
    },

    documents: [
      {
        documentType: String,
        fileId: Schema.Types.ObjectId,
      },
    ],

    status: {
      type: String,
      enum: ["pending", "approved", "rejected","processing"],
      default: "pending",
    },

    adminRemark: String,
    reviewedBy: { type: Schema.Types.ObjectId, ref: "Admin" },
    reviewedAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("LoanApplication", LoanApplicationSchema);
