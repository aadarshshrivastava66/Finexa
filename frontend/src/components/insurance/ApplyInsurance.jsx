import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ApplyInsurance = () => {
  const { id } = useParams(); // MUST come from route

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    dateOfBirth: "",
    annualIncome: "",
    nomineeName: "",
    nomineeRelation: "",
  });

  const [requiredDocs, setRequiredDocs] = useState([]);
  const [uploadedDocs, setUploadedDocs] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch insurance details
  useEffect(() => {
    axios
      .get(`http://localhost:8080/lifeInsurance/Childinsurance/${id}`)
      .then((res) => {
        setRequiredDocs(res.data.documentsRequired || []);
      })
      .catch(() => setError("Failed to load insurance"));
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (doc, file) => {
    setUploadedDocs((prev) => ({ ...prev, [doc]: file }));
  };

  const isFormValid =
    Object.values(formData).every(Boolean) &&
    requiredDocs.every((doc) => uploadedDocs[doc]);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError("");

      const fd = new FormData();

      Object.entries(formData).forEach(([k, v]) => fd.append(k, v));
      fd.append("documentsMeta", JSON.stringify(requiredDocs));

      requiredDocs.forEach((doc) => {
        fd.append("files", uploadedDocs[doc]);
      });

      // 🔥 THIS IS THE MOST IMPORTANT LINE
      await axios.post(
        `http://localhost:8080/lifeInsurance/Childinsurance/apply-insurance/${id}`,
        fd
      );

      alert("Insurance application submitted successfully");
    } catch (err) {
      console.error(err);
      setError("Submission failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h3>Apply for Insurance</h3>

      {error && <p className="text-danger">{error}</p>}

      {Object.keys(formData).map((field) => (
        <input
          key={field}
          name={field}
          placeholder={field}
          className="form-control my-2"
          onChange={handleChange}
        />
      ))}

      <h5 className="mt-3">Documents</h5>
      {requiredDocs.map((doc) => (
        <input
          key={doc}
          type="file"
          className="form-control my-2"
          onChange={(e) => handleFileChange(doc, e.target.files[0])}
        />
      ))}

      <button
        className="btn btn-primary mt-3"
        disabled={!isFormValid || loading}
        onClick={handleSubmit}
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
    </div>
  );
};

export default ApplyInsurance;
