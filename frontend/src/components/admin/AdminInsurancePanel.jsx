import React from "react";
import { useNavigate } from "react-router-dom";
import "../../css/adminpanal.css";

function AdminInsurancePanel(){
     const navigate = useNavigate();
    
      const handleClick = (path) => {
        navigate(path);
      };
    return (
    <div className="m-5">
      <h2 className="text-center mb-4">Admin Insurance Panel</h2>
      <div className="row">

        <div className="m-5 loanpanel-card col">
          <h1 className="fs-3">Add New Insurance</h1>
          <br />
          <button 
            className="btn btn-primary"
            onClick={() => handleClick("/insurance/new")}
          >
            Add
          </button>
        </div>

        <div className="m-5 loanpanel-card col">
          <h1 className="fs-3">Pending Applications</h1>
          <br />
          <button 
            className="btn btn-primary"
            onClick={() => handleClick("/insurance/pending/applications")}
          >
            View
          </button>
        </div>
        <div className="m-5 loanpanel-card col">
          <h1 className="fs-3">Approved Applications</h1>
          <br />
          <button 
            className="btn btn-primary"
            onClick={() => handleClick("/insurance/approve/applications")}
          >
            View
          </button>
        </div>
        <div className="m-5 loanpanel-card col">
          <h1 className="fs-3">Reject Applications</h1>
          <br />
          <button 
            className="btn btn-primary"
            onClick={() => handleClick("/insurance/reject/applications")}
          >
            View
          </button>
        </div>

        

      </div>
    </div>
  );
}

export default AdminInsurancePanel;