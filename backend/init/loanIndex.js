const mongoose=require('mongoose');
const loan=require('../Models/loan');
const LoanData=require('./loanData');

const mongoUrl="mongodb://127.0.0.1:27017/finexaDB";

async function main() {
    await mongoose.connect(mongoUrl);
    
}

main().then(()=>{
    console.log("Connected to MongoDB");
})
.catch((e)=>{
    console.log("Error To Connect");
    console.log(e);
})

const initDb=async()=>{
    await loan.deleteMany({});
    await loan.insertMany(LoanData);
    console.log("Loan Data Initialized");
}

initDb();