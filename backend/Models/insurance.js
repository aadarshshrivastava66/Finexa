const mongoose=require('mongoose')
const Schema=mongoose.Schema;

const InsuranceSchema=new Schema(
    {
       title: {
            type:String,
            required:true
        },
        type:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true

        },
        preminumRange:{
            type:Number,
            required:true
        },
        entryAge:{
            type:Number,
            required:true
        },
        keyBenefits:{
            type:[String],
            required:true
        },
        documentsRequired: {
      type: [String],
      required:true
    },
    }
)

module.exports=mongoose.model("Insurance",InsuranceSchema);