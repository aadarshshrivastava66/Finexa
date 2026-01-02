import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "../../css/register.css";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const from = location.state?.from?.pathname || "/";

  const [formData, setFormData] = useState({ identifier: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:8080/user/login",
        formData,
        { withCredentials: true }
      );

      login({ userId: res.data.userId, role: res.data.role });

      navigate(from, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4 login-card">
        <h3 className="text-center mb-4">Welcome Back</h3>
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-12">
            <label>Email or Mobile Number</label>
            <input
              type="text"
              name="identifier"
              className="form-control"
              required
              value={formData.identifier}
              onChange={handleChange}
            />
          </div>
          <div className="col-12">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              required
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {error && <p className="text-danger">{error}</p>}

          <div className="col-12 text-center">
            <button className="btn btn-primary" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>

          <div className="text-center mt-2">
            <Link to="/register" style={{ textDecoration: "none" }}>
              New to Finexa? → Create Account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
