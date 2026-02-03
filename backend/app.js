const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser"); // new
const session = require("express-session");
const app = express();
const InsuranceModal=require('./Models/insurance')
const dotenv=require('dotenv')
dotenv.config();

app.use(express.json());
app.use(cookieParser()); // parse cookies
app.use(
  cors({
    origin: "http://localhost:3000", 
    credentials: true, 
  })
);
app.use(
  session({
    
    secret: "verify-session-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "lax", 
      secure: false,  
      maxAge: 10 * 60 * 1000,
    },
  })
);


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const userRoute = require("./routes/user");
app.use("/user", userRoute);

const loanRoute = require("./routes/loan");
app.use("/loans", loanRoute);

const adminRoute=require('./routes/admin');
app.use('/admin',adminRoute)

const insuranceRoute=require('./routes/insurance');
app.use('/lifeInsurance',insuranceRoute)

const fileRoutes = require("./routes/files");

app.use("/files", fileRoutes);


app.get('/lifeInsurance',(req,res)=>{
  res.json({message:"Module Under Workings"})
})

app.get('/investment',(req,res)=>{
  res.json({message:"Module Under Workings"})
})




app.listen(8080, () => {
  console.log("Server running on port 8080");
});
