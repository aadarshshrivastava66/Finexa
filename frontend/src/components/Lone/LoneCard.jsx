import React from "react";
import "../../css/loneCard.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import adminApi from "../../services/adminApi"

function LoanCard({ imageurl, title, interest, tenure, amount, id ,role  }) {
  const navigate = useNavigate();

  const handleDelete = async () => {
    const confirm = window.confirm("Are you sure you want to delete this loan?");
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:8080/admin/loans/${id}`,{withCredentials: true});
      alert("Loan deleted successfully");
      window.location.reload(); // refresh list
    } catch (error) {
      console.error(error);
      alert("Error deleting loan");
    }
  };

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
          style={{ color: "black" }}
          onClick={() => navigate(`/check-eligibility/${id}`)}
        >
          Check Eligibility
        </button>

        <button
          className="btn btn-outline-primary btn-sm ms-2"
          style={{ color: "black" }}
          onClick={() => navigate(`/apply-loan/${id}`)}
        >
          Apply Now
        </button>

       
        {(role === "admin" || role === "superadmin") && (
  <button
    className="btn btn-outline-danger btn-sm ms-2"
    onClick={handleDelete}
  >
    Delete
  </button>
)}

      </div>
    </div>
  );
}

export default LoanCard;
