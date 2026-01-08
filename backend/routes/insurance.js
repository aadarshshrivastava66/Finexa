const express=require('express');
const router=express.Router();
const InsuranceModal=require('../Models/insurance')


router.get('/Childinsurance', async (req, res) => {
  try {
    let allData = await InsuranceModal.find({ type: "Child-Education" });
    console.log(allData);
    res.json(allData);
  } catch (err) {
    console.log(err);
   
    res.json({message:'some error'})
  }
});

router.get('/Childinsurance/:id',async(req,res)=>{
    const {id}=req.params;
    try{
        let Documents=await InsuranceModal.findById(id).select("documentsRequired");
        console.log(Documents);
        res.json(Documents)
    }catch(err){
        console.log(err);
        res.json(err);
    }

})

router.post('/lifeInsurance/Childinsurance/apply-insurance/:id',async(req,res)=>{
    
})

module.exports=router;