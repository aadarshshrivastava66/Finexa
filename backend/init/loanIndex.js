const mongoose=require('mongoose');
const loanModal=require('../Models/loan');
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
    await loanModal.deleteMany({});
    await loanModal.insertMany(LoanData);
    console.log("Loan Data Initialized");
}

initDb();