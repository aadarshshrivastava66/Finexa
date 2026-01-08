const mongoose=require('mongoose');
const insuranceData=require('./insuranceData');
const InsuranceModal=require('../Models/insurance')
const mongoUrl="mongodb://127.0.0.1:27017/finexaDB";


async function main(){
    await mongoose.connect(mongoUrl);
}

main().then(()=>{
    console.log('connect to Db');
}).catch((e)=>{
    console.log(e);
    console.log('error to connect');
})


const InitDb=async()=>{
    await InsuranceModal.insertMany(insuranceData.initData);
    console.log("data Is Inserted !");
}

InitDb();