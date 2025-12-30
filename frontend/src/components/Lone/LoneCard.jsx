import React from "react";
import "../../css/loneCard.css";
import { useNavigate } from "react-router-dom";

function LoanCard({ imageurl, title, desc, interest, tenure, amount, id }) {
  const navigate = useNavigate();

  return (
    <div className="loan-card mt-4">
      <div className="row align-items-center">
        <div className="col-7">
          <h4 className="loan-title">{title}</h4>

          <ul className="loan-info">
            <li>Interest: {interest}</li>
            <li>Tenure: Up to {tenure} Years</li>
            <li>Loan Amount: Up to ₹ {(amount / 100000).toFixed(0)} Lakhs</li>
          </ul>
        </div>

        <div className="col-5 text-end">
          <img src={imageurl} alt={title} className="loan-img" />
        </div>
      </div>

      <div className="loan-actions mt-3">
        <button
          className="btn btn-outline-primary btn-sm"
          onClick={() => navigate(`/check-eligibility/${id}`)}
        >
          Check Eligibility
        </button>

        {/* ✅ FIXED */}
        <button
          className="btn btn-outline-primary btn-sm ms-2"
          onClick={() => navigate(`/apply-loan/${id}`)}
        >
          Apply Now
        </button>
      </div>
    </div>
  );
}

export default LoanCard;
