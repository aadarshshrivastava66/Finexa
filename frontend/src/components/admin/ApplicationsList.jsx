import { useState } from "react";
import adminApi from "../../services/adminApi";

const ApplicationDetails = ({ application, refresh }) => {
  const [remark, setRemark] = useState("");
  const [loading, setLoading] = useState(false);

  const updateStatus = async (status) => {
    try {
      setLoading(true);
      await adminApi.patch(
        `/applications/${application._id}/status`,
        { status, adminRemark: remark }
      );
      alert(`Application ${status}`);
      refresh();
    } catch {
      alert("Action failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card p-3 shadow">
      <h5>Application Details</h5>

      <p><b>User:</b> {application.user?.name}</p>
      <p><b>Email:</b> {application.user?.email}</p>
      <p><b>Loan:</b> {application.loan?.name}</p>
      <p><b>Amount:</b> ₹{application.appliedAmount}</p>
      <p><b>Income:</b> ₹{application.annualIncome}</p>
      <p><b>Status:</b> {application.status}</p>

      {application.status === "pending" && (
        <>
          <textarea
            className="form-control my-2"
            placeholder="Admin remark"
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
          />

          <button
            className="btn btn-success me-2"
            disabled={loading}
            onClick={() => updateStatus("approved")}
          >
            Approve
          </button>

          <button
            className="btn btn-danger"
            disabled={loading}
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
