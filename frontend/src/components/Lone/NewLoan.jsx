import React, { useState } from "react";
import axios from "axios";
import adminApi from "../../services/adminApi"

function NewLoan() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    image: "",
    description: "",
    type: "secured",
    minAmount: "",
    maxAmount: "",
    interestRate: "",
    tenure: "",
    eligibilityRules: {
      minAge: "",
      maxAge: "",
      minIncome: "",
      employmentType: [],
      creditScore: "",
    },
    documentsRequired: "",
    isActive: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleEligibilityChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      eligibilityRules: {
        ...form.eligibilityRules,
        [name]: value,
      },
    });
  };

  const handleEmploymentType = (e) => {
    const { value, checked } = e.target;
    let updated = [...form.eligibilityRules.employmentType];

    if (checked) updated.push(value);
    else updated = updated.filter((v) => v !== value);

    setForm({
      ...form,
      eligibilityRules: {
        ...form.eligibilityRules,
        employmentType: updated,
      },
    });
  };

  const handleDocs = (e) => {
    const docsArray = e.target.value.split(",");
    setForm({ ...form, documentsRequired: docsArray });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);   
    try {
      const res = await adminApi.post(
        "/loans/new",
        form,
      );

      alert("Loan Created Successfully!");
      console.log(res.data);
    } catch (error) {
      console.error(error);
      alert("Error creating loan");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="container m-5">
      <h2>Create New Loan</h2>

      <form onSubmit={handleSubmit}>
        <input className="form-control my-2" name="name" placeholder="Loan Name" onChange={handleChange} required />
        <input className="form-control my-2" name="image" placeholder="Image URL" onChange={handleChange} required />
        <textarea className="form-control my-2" name="description" placeholder="Description" onChange={handleChange} required />

        <select className="form-control my-2" name="type" onChange={handleChange}>
          <option value="secured">Secured</option>
          <option value="unsecured">Unsecured</option>
        </select>

        <input type="number" className="form-control my-2" name="minAmount" placeholder="Min Amount" onChange={handleChange} required />
        <input type="number" className="form-control my-2" name="maxAmount" placeholder="Max Amount" onChange={handleChange} required />
        <input className="form-control my-2" name="interestRate" placeholder="Interest Rate" onChange={handleChange} required />
        <input type="number" className="form-control my-2" name="tenure" placeholder="Tenure (months)" onChange={handleChange} required />

        <h4>Eligibility Rules</h4>
        <input type="number" className="form-control my-2" name="minAge" placeholder="Min Age" onChange={handleEligibilityChange} />
        <input type="number" className="form-control my-2" name="maxAge" placeholder="Max Age" onChange={handleEligibilityChange} />
        <input type="number" className="form-control my-2" name="minIncome" placeholder="Min Income" onChange={handleEligibilityChange} />
        <input type="number" className="form-control my-2" name="creditScore" placeholder="Credit Score" onChange={handleEligibilityChange} />

        <div className="my-2">
          <p>Type Of Employment</p>
          <label>
            <input type="checkbox" value="salaried" onChange={handleEmploymentType} /> Salaried
          </label>
          &nbsp;&nbsp;
          <label>
            <input type="checkbox" value="self-employed" onChange={handleEmploymentType} /> Self Employed
          </label>
        </div>

        <input className="form-control my-2" placeholder="Documents (comma separated)" onChange={handleDocs} />

        <button className="btn btn-primary mt-3" disabled={loading}>
          {loading ? "Submitting..." : "Create Loan"}
        </button>
      </form>
    </div>
  );
}

export default NewLoan;
