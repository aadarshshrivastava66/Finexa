import React from "react";
import { Link } from "react-router-dom";
import "../css/navabar.css";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth(); // ✅ get from context

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="logo" to="/finexa">
          <img src="logo.png" alt="Finexa Logo" />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="navbar-collapse ms-auto" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 me-5">
            <li className="nav-item mx-3">
              <Link className="nav-link active" to="/finexa">
                Home
              </Link>
            </li>

            

            <li className="nav-item mx-3">
              <Link className="nav-link active" to="/product">
                Product
              </Link>
            </li>

            <li className="nav-item mx-3">
              <Link className="nav-link active" to="/lones">
                Lone
              </Link>
            </li>

            <li className="nav-item mx-3">
              <Link className="nav-link active" to="/about">
                About
              </Link>
            </li>

            {user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link active" to="/dashboard">
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item mx-3">
                  <button
                    onClick={logout}
                    className="nav-link active btn btn-link"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item mx-3">
                  <Link to="/login" className="nav-link active">
                    Login
                  </Link>
                </li>

                <li className="nav-item mx-3">
                  <Link to="/signup" className="nav-link active">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
