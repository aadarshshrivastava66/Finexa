import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function CheckEligibility() {
  const { id } = useParams();
  const [loan, setLoan] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/loans/${id}/checkEligibility`)
      .then((res) => {
        
        console.log(res.data)
        setLoan(res.data)})
      .catch((err) => console.log(err));
  }, [id]);

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
    </div>
  );
}

export default CheckEligibility;
