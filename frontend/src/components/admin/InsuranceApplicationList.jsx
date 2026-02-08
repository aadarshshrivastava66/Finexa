import React, { useEffect, useState } from "react";
import adminApi from "../../services/adminApi";

import { useNavigate } from "react-router-dom";
function InsuranceApplicationList(){
    const [applications,setApplications]=useState([]);
    const [error,setError]=useState("");
    const navigate=useNavigate();
     useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    const res = await adminApi.get("/insurance/pending/applications");

    setApplications(res.data);
  };
     
    return(
        <div className="container m-5">
        <table className="table table-bordered">
       <thead className="table-dark">
        <tr>
          <th>User</th>
          <th>Insurance</th>
          <th>Income</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {applications.map((app) => (
          <tr key={app._id}>
            <td>{app.fullName}</td>
            <td>{app.insuranceId?.type}</td>
            <td>₹{app.annualIncome}</td>
            <td>{app.status}</td>
            <td>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => navigate(`/admin/insurance/applications/${app._id}`)}
              >
                View
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table> 
        </div>
    )
}

export default InsuranceApplicationList;