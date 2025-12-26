import React from "react";
import "../../css/insuranceCard.css";

function InsuranceCard() {
  return (
    <div className="insurance-card">
      <div className="card-header">
        <div className="icon-circle">
          <i class="fa-solid fa-shield"></i>
        </div>

        <div className="card-text">
          <h4>Term Life Insurance</h4>
          <p>Coverage up to ₹1 Cr</p>
        </div>
      </div>

      <div className="progress-bar">
        <div className="progress-fill"></div>
      </div>

      <p className="status-text">Approved in 24 hours</p>
    </div>
  );
}

export default InsuranceCard;
