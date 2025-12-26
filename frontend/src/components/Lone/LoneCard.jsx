import React from "react";
import "../../css/loneCard.css"

function LoanCard({imageurl,title,desc,interest,tenure,amount}) {
  return (
    <div className="loan-card mt-5 container ">
      <div className="row align-items-center">
        
        {/* LEFT CONTENT */}
        <div className="col-7">
          <h4 className="loan-title">{title}</h4>
          <p className="loan-desc">
            {desc}
    
          </p>

          <ul className="loan-info">
            <li>Interest: {interest} onwards</li>
            <li>Tenure: Up to {tenure} Years</li>
            <li>Loan Amount: Up to ₹ {amount} Lakhs</li>
          </ul>
        </div>

        {/* RIGHT IMAGE */}
        <div className="col-5 text-end">
          <img
            src="images/home.png"
            alt="Home Loan"
            className="loan-img"
          />
        </div>

      </div>
       <div className="loan-actions">
            <button className="btn btn-outline-primary btn-sm">
              Check Eligibility
            </button>
            <button className="btn btn-outline-primary btn-sm ms-2">
              Apply Now
            </button>
          </div>
    </div>
  );
}

export default LoanCard;
