import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ApplyLoan() {
  const { loanId } = useParams();

  const requiredDocs = ["Aadhaar", "PAN", "Salary Slip"];

  const [formData, setFormData] = useState({
    loanId,
    appliedAmount: "",
    employmentType: "",
    annualIncome: "",
  });

  const [uploadedDocs, setUploadedDocs] = useState({});
  const [emiData, setEmiData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (doc, file) => {
    setUploadedDocs((prev) => ({
      ...prev,
      [doc]: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submitData = new FormData();

    Object.entries(formData).forEach(([k, v]) =>
      submitData.append(k, v)
    );

    submitData.append(
      "documentsMeta",
      JSON.stringify(requiredDocs)
    );

    requiredDocs.forEach((doc) => {
      submitData.append("files", uploadedDocs[doc]);
    });

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:8080/loans/apply",
        submitData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      alert(res.data.message);
    } catch (err) {
      alert("Failed to apply loan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow">
        <h3 className="text-center mb-4">Apply for Loan</h3>

        <form onSubmit={handleSubmit}>
          <label className="form-label">Loan Amount</label>
          <input
            type="number"
            name="appliedAmount"
            className="form-control mb-3"
            onChange={handleChange}
            required
          />

          <label className="form-label">Employment Type</label>
          <select
            name="employmentType"
            className="form-select mb-3"
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="salaried">Salaried</option>
            <option value="self-employed">Self Employed</option>
          </select>

          <label className="form-label">Annual Income</label>
          <input
            type="number"
            name="annualIncome"
            className="form-control mb-3"
            onChange={handleChange}
            required
          />

          <h5 className="mt-4">Required Documents</h5>

          {requiredDocs.map((doc) => (
            <div key={doc} className="mb-3">
              <label className="form-label">
                {doc}{" "}
                {uploadedDocs[doc] ? "✔" : "*"}
              </label>
              <input
                type="file"
                className="form-control"
                onChange={(e) =>
                  handleFileChange(doc, e.target.files[0])
                }
                required
              />
            </div>
          ))}

          <button
            className="btn btn-primary w-100 mt-3"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Loan Application"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ApplyLoan;
