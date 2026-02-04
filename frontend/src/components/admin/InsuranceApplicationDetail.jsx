import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import adminApi from "../../services/adminApi";

function InsuranceApplicationDetail() {
  const { id } = useParams();
  const [application, setApplication] = useState(null);
  const [remark, setRemark] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const res = await adminApi.get(`/insurance/applications/${id}`);
        setApplication(res.data);
      } catch (err) {
        console.error("Error fetching application:", err);
      }
    };

    fetchApplication();
  }, [id]);

  const updateStatus = async (status) => {
    try {
      await adminApi.patch(`/insurance/applications/${id}/status`, {
        status,
        adminRemark: remark,
      });

      alert(`Application ${status}`);
      navigate("/admin/dashboard");
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    }
  };

  if (!application) return <p>Loading...</p>;

  return (
    <div className="container mt-4 p-4">
      <h3 className="mt-3 mb-3">Application Details</h3>

      <p><b>Name:</b> {application.fullName}</p>
      <p><b>Email:</b> {application.email}</p>
      <p><b>Phone:</b> {application.mobile}</p>
      <p><b>Date of Birth:</b> {application.dateOfBirth}</p>
      <p><b>Annual Income:</b> ₹{application.annualIncome}</p>
      <p><b>Nominee:</b> {application.nomineeName}</p>
      <p><b>Relation:</b> {application.nomineeRelation}</p>
      <p><b>Status:</b> {application.status}</p>
      <p><b>Insurance ID:</b> {application.insuranceId}</p>

      <h5 className="mt-4">Uploaded Documents</h5>

      {application.documents?.length > 0 ? (
        <ul className="list-group mb-3">
          {application.documents.map((doc) => (
            <li
              key={doc._id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <span>{doc.documentType}</span>

              <a
                href={`http://localhost:8080/files/${doc.fileId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm btn-primary"
              >
                View / Download
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No documents uploaded</p>
      )}

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
}

export default InsuranceApplicationDetail;
