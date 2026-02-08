import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function CheckEligibility() {
  const { id } = useParams();
  const [loan, setLoan] = useState(null);
  const [amount, setAmount] = useState("");
  const [emiResult, setEmiResult] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8080/loans/${id}/checkEligibility`)
      .then((res) => {
        console.log(res.data);
        setLoan(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const calculateEMI = async () => {
    setError("");
    setEmiResult(null);

    try {
      const res = await axios.post(
        `http://localhost:8080/loans/${id}/calculate-emi`,
        { amount }
      );
      setEmiResult(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  if (!loan) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <h2>{loan.name} – Eligibility</h2>

      <ul className="list-group mt-3">
        <li className="list-group-item">
          Min Age: {loan.eligibilityRules.minAge}
        </li>
        <li className="list-group-item">
          Max Age: {loan.eligibilityRules.maxAge}
        </li>
        <li className="list-group-item">
          Min Income: ₹{loan.eligibilityRules.minIncome}
        </li>
        <li className="list-group-item">
          Employment Type: {loan.eligibilityRules.employmentType.join(", ")}
        </li>
        <li className="list-group-item">
          Credit Score: {loan.eligibilityRules.creditScore}
        </li>
      </ul>

      <h4 className="mt-4">Documents Required</h4>
      <ul>
        {loan.documentsRequired.map((doc, index) => (
          <li key={index}>{doc}</li>
        ))}
      </ul>

    
      <h3 className="mt-5">EMI Calculator</h3>

      <div className="mb-3">
        <input
          type="number"
          className="form-control"
          placeholder="Enter Loan Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <button className="btn btn-primary" onClick={calculateEMI}>
        Calculate EMI
      </button>

      {error && <p className="text-danger mt-2">{error}</p>}

      {emiResult && (
        <div className="mt-3">
          <h5>EMI Result</h5>
          <p><strong>Loan:</strong> {emiResult.loanName}</p>
          <p><strong>Interest Rate:</strong> {emiResult.interestRate}%</p>
          <p><strong>Tenure:</strong> {emiResult.tenure} years</p>
          <p><strong>Monthly EMI:</strong> ₹{emiResult.emi}</p>
        </div>
      )}
    </div>
  );
}

export default CheckEligibility;
