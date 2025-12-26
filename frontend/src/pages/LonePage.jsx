import React from "react";
import LoneCard from "../components/Lone/LoneCard";

function LonePage() {
  return (
    <div className="container mt-4">
        <h1 className="text-center" style={{color:"navy"}}>Dicover Our Loan Plans</h1>
        <p className="text-center loanpara text-muted ">Flexible Loans That Match Your Needs</p>
      <div className="row g-4">

        <div className="col-lg-4 col-md-6">
          <LoneCard imageurl="images/home.png" title="Home Loan" desc="Affordable home loans with low interest rates and flexible tenure." interest="9.8%" tenure={30} amount={30} />
        </div>

        <div className="col-lg-4 col-md-6">
          <LoneCard imageurl="images/home.png" title="Home Loan" desc="Affordable home loans with low interest rates and flexible tenure." interest="9.8%" tenure={30} amount={30} />
        </div>

        <div className="col-lg-4 col-md-6">
          <LoneCard imageurl="images/home.png" title="Home Loan" desc="Affordable home loans with low interest rates and flexible tenure." interest="9.8%" tenure={30} amount={30} />
        </div>

        <div className="col-lg-4 col-md-6">
          <LoneCard imageurl="images/home.png" title="Home Loan" desc="Affordable home loans with low interest rates and flexible tenure." interest="9.8%" tenure={30} amount={30} />
        </div>

        <div className="col-lg-4 col-md-6">
          <LoneCard imageurl="images/home.png" title="Home Loan" desc="Affordable home loans with low interest rates and flexible tenure." interest="9.8%" tenure={30} amount={30} />
        </div>

        <div className="col-lg-4 col-md-6">
          <LoneCard imageurl="images/home.png" title="Home Loan" desc="Affordable home loans with low interest rates and flexible tenure." interest="9.8%" tenure={30} amount={30} />
        </div>

      </div>
    </div>
  );
}

export default LonePage;
