import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../css/register.css";
import axios from "axios";

function AdminRegister() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    //e means event
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("http://localhost:8080/admin/signup", formData, {
        withCredentials: true,
      });
      alert("Registration successful! Please login.");
      navigate("/admin/login"); // redirect to login page
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Registration failed!");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="container mt-5">
      {error && <div className="alert alert-danger text-center">{error}</div>}

      <div className="card shadow-lg p-4 register-card">
        <h3 className="text-center mb-4">Register</h3>

        <form className="row g-3" onSubmit={handleSubmit}>
          {/* First Name */}
          <div className="col-md-6">
            <label className="form-label">First Name</label>
            <input
              type="text"
              name="firstName"
              className="form-control"
              required
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>

          {/* Last Name */}
          <div className="col-md-6">
            <label className="form-label">Last Name</label>
            <input
              type="text"
              name="lastName"
              className="form-control"
              required
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>

          {/* Email */}
          <div className="col-md-6">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {/* Phone */}
          <div className="col-md-6">
            <label className="form-label">Mobile Number</label>
            <input
              type="tel"
              name="phone"
              className="form-control"
              required
              pattern="[0-9]{10}"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          {/* Password */}
          <div className="col-md-12">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              required
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Role</label>
            <select
              name="role"
              className="form-select"
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="admin">Admin</option>
              <option value="superadmin">Super Admin</option>
            </select>
          </div>

          {/* Register Button */}
          <div className="col-12 text-center">
            <button
              type="submit"
              className="btn btn-primary px-5"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default AdminRegister;
