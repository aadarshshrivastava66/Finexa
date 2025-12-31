import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ApplyLoan() {
  const { loanId } = useParams();

  const [formData, setFormData] = useState({
    loanId: loanId,
    appliedAmount: "",
    employmentType: "",
    annualIncome: "",
  });

  const [emiData, setEmiData] = useState(null);
  const [loadingEmi, setLoadingEmi] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 EMI CALCULATION
  const calculateEmi = async () => {
    if (!formData.appliedAmount) {
      alert("Enter loan amount first");
      return;
    }

    try {
      setLoadingEmi(true);
      const res = await axios.post(
        `http://localhost:8080/loans/${loanId}/calculate-emi`,
        { amount: formData.appliedAmount }
      );
      setEmiData(res.data);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to calculate EMI");
    } finally {
      setLoadingEmi(false);
    }
  };

  // 🔹 APPLY LOAN
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

          <button
            type="button"
            className="btn btn-outline-secondary mb-3"
            onClick={calculateEmi}
          >
            {loadingEmi ? "Calculating..." : "Calculate EMI"}
          </button>

          {/* EMI RESULT */}
          {emiData && (
            <div className="alert alert-info" >
              <p style={{color:"black"}}><strong>Loan:</strong> {emiData.loanName}</p>
              <p style={{color:"black"}}><strong>Interest:</strong> {emiData.interestRate}%</p>
              <p style={{color:"black"}}><strong>Tenure:</strong> {emiData.tenure} years</p>
              <h5 style={{color:"black"}}>Monthly EMI: ₹{emiData.emi}</h5>
            </div>
          )}

          <div className="mb-3">
            <label className="form-label">Employment Type</label>
            <select
              name="employmentType"
              className="form-select"
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="salaried">Salaried</option>
              <option value="self-employed">Self Employed</option>
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
            <div className="col-12">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" required />
              <label className="form-check-label">
                I agree with the Terms & Conditions
              </label>
            </div>
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
