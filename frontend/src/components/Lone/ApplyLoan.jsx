import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ApplyLoan() {
  const { loanId } = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    loanId: "",
    appliedAmount: "",
    employmentType: "",
    annualIncome: "",
  });

  useEffect(() => {
    if (!loanId) {
      setLoading(false);
      return;
    }

    axios
      .get(`http://localhost:8080/loans/${loanId}/checkEligibility`)
      .then(() => {
        setFormData((prev) => ({ ...prev, loanId }));
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load loan details");
        setLoading(false);
      });
  }, [loanId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8080/loans/apply",
        formData,
        { withCredentials: true }
      );

      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to apply loan");
    }
  };

  if (loading) return <p className="text-center mt-4">Loading...</p>;
  if (error) return <p className="text-danger text-center">{error}</p>;

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4">
        <h3 className="text-center mb-4">Apply for Loan</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Loan Amount (₹)</label>
            <input
              type="number"
              name="appliedAmount"
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Employment Type</label>
            <select
              name="employmentType"
              className="form-select"
              onChange={handleChange}
              required
            >
              <option value="">Select employment type</option>
              <option value="salaried">Salaried</option>
              <option value="self-employed">Self Employed</option>
              <option value="business">Business</option>
              <option value="student">Student</option>
              <option value="farmer">Farmer</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Annual Income (₹)</label>
            <input
              type="number"
              name="annualIncome"
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>

          <div className="text-center">
            <button className="btn btn-primary px-5">
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ApplyLoan;
