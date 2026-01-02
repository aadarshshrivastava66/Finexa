import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import adminApi from "../../services/adminApi";
import '../../css/applicationDetail.css'

const AdminApplicationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [application, setApplication] = useState(null);
  const [remark, setRemark] = useState("");

  useEffect(() => {
    fetchApplication();
  }, []);

  const fetchApplication = async () => {
    const res = await adminApi.get(`/applications/${id}`);
    setApplication(res.data);
  };

  const updateStatus = async (status) => {
    await adminApi.patch(`/applications/${id}/status`, {
      status,
      adminRemark: remark,
    });
    alert(`Application ${status}`);
    navigate("/admin/dashboard");
  };

  if (!application) return <p>Loading...</p>;

  return (
    <div className="container mt-4 p-4 ">
      <h3 className="mt-3 mb-3">Application Details</h3>

      <p ><b>User:</b> {application.user.name}</p>
      <p><b>Email:</b> {application.user.email}</p>
      <p><b>Phone:</b> {application.user.phone}</p>
      
      <p><b>Loan:</b> {application.loan.name}</p>
      <p><b>Applied Amount:</b> ₹{application.appliedAmount}</p>
      <p><b>Employment:</b> {application.employmentType}</p>
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

export default AdminApplicationDetails;
