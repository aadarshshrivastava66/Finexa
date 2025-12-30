const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    phone: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    // Profile Completion (Later)
    address: {
      street: String,
      city: String,
      state: String,
      pincode: String,
    },

    employmentType: {
      type: String,
      enum: ["salaried", "self-employed", "business", "student", "farmer"],
    },

    annualIncome: Number,

    documents: {
      aadhaar: String,
      pan: String,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
    appliedLoans: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "LoanApplication"
  }
]
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
