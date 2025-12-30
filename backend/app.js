const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser"); // new

const app = express();

app.use(express.json());
app.use(cookieParser()); // parse cookies
app.use(
  cors({
    origin: "http://localhost:3000", // frontend URL
    credentials: true, // allow cookies
  })
);

mongoose
  .connect("mongodb://127.0.0.1:27017/finexaDB")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const userRoute = require("./routes/user");
app.use("/user", userRoute);

const loanRoute = require("./routes/loan");
app.use("/loans", loanRoute);



app.listen(8080, () => {
  console.log("Server running on port 8080");
});
