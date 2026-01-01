import { useState } from "react";
import adminApi from "../../services/adminApi";

const ApplicationDetails = ({ application, refresh }) => {
  const [remark, setRemark] = useState("");

  const updateStatus = async (status) => {
    await adminApi.patch(
      `/applications/${application._id}/status`,
      { status, adminRemark: remark }
    );
    refresh();
    alert(`Application ${status}`);
  };

  return (
    <div className="card p-3 shadow">
      <h5>Application Details</h5>

      <p><b>User:</b> {application.user?.name}</p>
      <p><b>Email:</b> {application.user?.email}</p>
      <p><b>Phone:</b> {application.user?.phone}</p>

      <hr />

      <p><b>Loan:</b> {application.loan?.name}</p>
      <p><b>Interest:</b> {application.loan?.interestRate}%</p>
      <p><b>Tenure:</b> {application.loan?.tenure} yrs</p>

      <hr />

      <p><b>Applied Amount:</b> ₹{application.appliedAmount}</p>
      <p><b>Annual Income:</b> ₹{application.annualIncome}</p>
      <p><b>Status:</b> {application.status}</p>

      {application.status === "pending" && (
        <>
          <textarea
            className="form-control my-2"
            placeholder="Admin Remark"
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
          />

          <button
            className="btn btn-success me-2"
            onClick={() => updateStatus("approved")}
          >
            Approve
          </button>

          <button
            className="btn btn-danger"
            onClick={() => updateStatus("rejected")}
          >
            Reject
          </button>
        </>
      )}
    </div>
  );
};

export default ApplicationDetails;
