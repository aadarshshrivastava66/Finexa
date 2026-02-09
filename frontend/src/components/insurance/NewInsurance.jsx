
import React, { useState } from "react";
import adminApi from "../../services/adminApi";

function NewInsurance() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    type: "life",
    description: "",
    preminumRange: "",
    entryAge: "",
    keyBenefits: [],
    documentsRequired: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleKeyBenefits = (e) => {
    const arr = e.target.value.split(",").map(v => v.trim());
    setForm({ ...form, keyBenefits: arr });
  };

  const handleDocs = (e) => {
    const arr = e.target.value.split(",").map(v => v.trim());
    setForm({ ...form, documentsRequired: arr });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await adminApi.post("/insurance/new", form);
      alert("Insurance Created Successfully!");
      console.log(res.data);
    } catch (error) {
      console.error(error);
      alert("Error creating insurance");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container m-5">
      <h2>Create New Insurance</h2>

      <form onSubmit={handleSubmit}>
        <input className="form-control my-2" name="title" placeholder="Insurance Title" onChange={handleChange} required />

        <select className="form-control my-2" name="type" onChange={handleChange} value={form.type}>

          <option value="Child-Education">Select Insurance Type</option>
          <option value="Child-Education">Child-Education</option>
          <option value="Retiremen-Plan">Retiremen-Plan</option>
          <option value="Saving">Saving</option>
          <option value="family-Protection">family-Protection</option>
          <option value="Weath-Creation">Weath-Creation</option>
        </select>

        <textarea className="form-control my-2" name="description" placeholder="Description" onChange={handleChange} required />

        <input type="number" className="form-control my-2" name="preminumRange" placeholder="Premium Range" onChange={handleChange} required />

        <input type="number" className="form-control my-2" name="entryAge" placeholder="Entry Age" onChange={handleChange} required />

        <input className="form-control my-2" placeholder="Key Benefits (comma separated)" onChange={handleKeyBenefits} required />

        <input className="form-control my-2" placeholder="Documents Required (comma separated)" onChange={handleDocs} required />

        <button className="btn btn-primary mt-3" disabled={loading}>
          {loading ? "Submitting..." : "Create Insurance"}
        </button>
      </form>
    </div>
  );
}

export default NewInsurance;