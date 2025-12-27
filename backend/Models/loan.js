const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LoanSchema=new Schema(
    {
        name:{
            type :String,
            required:true
        },
        image:{
            type:String,
            required:true
        },
        description:{
            type :String,
            required :true
        },
        type :{
            type :String,
            enums:["secured","unsecured"],
            required:true
        },
        minAmount:{
            type :Number,
            required:true
        },
        maxAmount:{
            type:Number,
            required:true
        },
        interestRate:{
            type :String,
            required:true 
        },
        tenure:{
            type:Number,
            required:true
        },
        eligibilityRules: {
      minAge: Number,
      maxAge: Number,
      minIncome: Number,
      employmentType: [String], // salaried, self-employed
      creditScore: Number,
    },
    documentsRequired: {
      type: [String],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    }
)

module.exports= mongoose.model('Loan',LoanSchema);