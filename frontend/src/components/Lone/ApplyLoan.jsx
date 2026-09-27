
import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";


function ApplyLoan() {
  const { loanId } = useParams();

  const requiredDocs = ["Aadhaar", "PAN", "Salary Slip"];

  const [formData, setFormData] = useState({
    loanId: loanId,
    appliedAmount: "",
    employmentType: "",
    annualIncome: "",
    salary: "",
    creditScore: "",
    dependents: "",
    age: "",
  });

  const [uploadedDocs, setUploadedDocs] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "creditScore" && Number(value) > 950) {
      return;
    }

    if (name === "age" && Number(value) > 80) {
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (doc, file) => {
    setUploadedDocs((prev) => ({
      ...prev,
      [doc]: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      Number(formData.creditScore) < 300 ||
      Number(formData.creditScore) > 950
    ) {
      return alert(
        "Credit Score must be between 300 and 950"
      );
    }

    if (
      Number(formData.age) < 18 ||
      Number(formData.age) > 80
    ) {
      return alert("Age must be between 18 and 80");
    }

    if (Number(formData.dependents) < 0) {
      return alert(
        "Dependents cannot be negative"
      );
    }

    if (Number(formData.appliedAmount) <= 0) {
      return alert(
        "Loan amount must be greater than 0"
      );
    }

    if (Number(formData.annualIncome) <= 0) {
      return alert(
        "Annual income must be greater than 0"
      );
    }

    if (Number(formData.salary) <= 0) {
      return alert(
        "Salary must be greater than 0"
      );
    }

    const submitData = new FormData();

    Object.entries(formData).forEach(
      ([key, value]) => {
        submitData.append(key, value);
      }
    );

    submitData.append(
      "documentsMeta",
      JSON.stringify(requiredDocs)
    );

    requiredDocs.forEach((doc) => {
      if (uploadedDocs[doc]) {
        submitData.append(
          "files",
          uploadedDocs[doc]
        );
      }
    });

    try {
      setLoading(true);

      const res = await axios.post(
        "https://finexa-backend-7d2r.onrender.com/loans/apply",
        submitData,
        {
          withCredentials: true,
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      alert(
        res.data.message ||
          "Loan application submitted successfully"
      );
    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
          "Failed to apply for loan"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow">
        <h3 className="text-center mb-4">
          Apply for Loan
        </h3>

        <form onSubmit={handleSubmit}>
          <label className="form-label">
            Loan Amount
          </label>
          <input
            type="number"
            name="appliedAmount"
            className="form-control mb-3"
            value={formData.appliedAmount}
            onChange={handleChange}
            min="1"
            required
          />

          <label className="form-label">
            Employment Type
          </label>
          <select
            name="employmentType"
            className="form-select mb-3"
            value={formData.employmentType}
            onChange={handleChange}
            required
          >
            <option value="">
              Select Employment Type
            </option>
            <option value="salaried">
              Salaried
            </option>
            <option value="self-employed">
              Self Employed
            </option>
          </select>

          <label className="form-label">
            Annual Income
          </label>
          <input
            type="number"
            name="annualIncome"
            className="form-control mb-3"
            value={formData.annualIncome}
            onChange={handleChange}
            min="1"
            required
          />

          <label className="form-label">
            Monthly Salary
          </label>
          <input
            type="number"
            name="salary"
            className="form-control mb-3"
            value={formData.salary}
            onChange={handleChange}
            min="1"
            required
          />

          <label className="form-label">
            Credit Score
          </label>
          <input
            type="number"
            name="creditScore"
            className="form-control mb-3"
            value={formData.creditScore}
            onChange={handleChange}
            min="300"
            max="950"
            required
          />

          <label className="form-label">
            Number of Dependents
          </label>
          <input
            type="number"
            name="dependents"
            className="form-control mb-3"
            value={formData.dependents}
            onChange={handleChange}
            min="0"
            required
          />

          <label className="form-label">
            Age
          </label>
          <input
            type="number"
            name="age"
            className="form-control mb-3"
            value={formData.age}
            onChange={handleChange}
            min="18"
            max="80"
            required
          />

          <h5 className="mt-4">
            Required Documents
          </h5>

          {requiredDocs.map((doc) => (
            <div key={doc} className="mb-3">
              <label className="form-label">
                {doc}{" "}
                {uploadedDocs[doc]
                  ? "✔ Uploaded"
                  : "* Required"}
              </label>

              <input
                type="file"
                className="form-control"
                onChange={(e) =>
                  handleFileChange(
                    doc,
                    e.target.files[0]
                  )
                }
                required
              />
            </div>
          ))}

          <button
            type="submit"
            className="btn btn-primary w-100 mt-3"
            disabled={loading}
          >
            {loading
              ? "Submitting..."
              : "Submit Loan Application"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ApplyLoan;

