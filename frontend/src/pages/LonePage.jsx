import React from "react";
import LoneCard from "../components/Lone/LoneCard";
import {useState,useEffect} from "react";
import axios from "axios";

function LonePage() {

  const [allLoans,setAllLoans]=useState([]);

  useEffect(()=>{
    axios.get("http://localhost:8080/loans")
    .then((res)=>{
      console.log(res.data)
      setAllLoans(res.data);
    }).catch((e)=>{
      console.log(e);
    })
  },[])


  return (
    <div className="container mt-4">
        <h1 className="text-center" style={{color:"navy"}}>Dicover Our Loan Plans</h1>
        <p className="text-center loanpara text-muted ">Flexible Loans That Match Your Needs</p>
      <div className="row g-4">
      {allLoans.map((loan) => (
  <div className="col-lg-4 col-md-6 col-sm-12" key={loan._id}>
    <LoneCard
      title={loan.name}
      imageurl={loan.image}
      
      interest={loan.interestRate}
      tenure={loan.tenure}
      amount={loan.maxAmount}
      id={loan._id}
    />
  </div>
))}



      </div>
    </div>
  );
}

export default LonePage;
