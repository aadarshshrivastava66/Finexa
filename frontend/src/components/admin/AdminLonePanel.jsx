import React from "react";
import { useNavigate } from "react-router-dom";
import "../../css/adminpanal.css";

function AdminLoanPanel() {
  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path);
  };

  return (
    <div className="m-5">
      <h2 className="text-center mb-4">Admin Loan Panel</h2>
      <div className="row">

        <div className="m-5 loan-card col">
          <h1 className="fs-3">Add New Loan</h1>
          <br />
          <button 
            className="btn btn-primary"
            onClick={() => handleClick("/loan/new")}
          >
            Add
          </button>
        </div>

        <div className="m-5 loan-card col">
          <h1 className="fs-3">Pending Applications</h1>
          <br />
          <button 
            className="btn btn-primary"
            onClick={() => handleClick("/loan/pending/applications")}
          >
            View
          </button>
        </div>

        <div className="m-5 loan-card col">
          <h1 className="fs-3">Approved Applications</h1>
          <br />
          <button 
            className="btn btn-primary"
            onClick={() => handleClick("/loan/approve/application")}
          >
            View
          </button>
        </div>
        <div className="m-5 loan-card col">
          <h1 className="fs-3">Reject Applications</h1>
          <br />
          <button 
            className="btn btn-primary"
            onClick={() => handleClick("/loan/reject/application")}
          >
            view
          </button>
        </div>

      </div>
    </div>
  );
}

export default AdminLoanPanel;
