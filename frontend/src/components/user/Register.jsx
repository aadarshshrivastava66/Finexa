import React, { useState } from "react";
import "../../css/register.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
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
    setError(""); // clear error on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("http://localhost:8080/user/singup", formData, {
        withCredentials: true, // maintain consistency if cookies needed
      });
      alert("Registration successful! Please login.");
      navigate("/login"); // redirect to login page
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Registration failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4 register-card">
        <h3 className="text-center mb-4">Join Finexa</h3>

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

          {/* Error Message */}
          {error && (
            <div className="col-12">
              <p className="text-danger">{error}</p>
            </div>
          )}

          {/* Terms */}
          <div className="col-12">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" required />
              <label className="form-check-label">
                I agree to the Terms & Conditions
              </label>
            </div>
          </div>

          {/* Register Button */}
          <div className="col-12 text-center">
            <button type="submit" className="btn btn-primary px-5" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </button>
          </div>

          {/* Login Link */}
          <div className="text-center mt-2" >
            <Link to="/login" className="nav-link" style={{textDecoration:"none"}}>
              Already a user? → Login 
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
