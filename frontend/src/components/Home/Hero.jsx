
import React from "react";
import "../../css/homeHero.css";
import InsuranceCard from "./Insurancecard";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Hero() {
  const { user } = useAuth();

  return (
    <section className="Hero mt-2">
      <div className="container-fluid px-3 px-md-4 px-lg-5">
        <div className="row align-items-center g-4 g-lg-5">

          {/* Left Section: Hero Content */}
          <div className="col-12 col-lg-6 hero-content">
            <h1 className="hero-heading">
              Secure Your Future With
            </h1>

            <h1 className="hero-title">FINEXA</h1>

            <p className="hero-description mt-3">
              Finexa provides comprehensive financial solutions
              to help you secure your future.
            </p>

            <p className="hero-subtitle">
              Get instant loans and secure your future
              with insurance plans.
            </p>

            {user ? (
              <Link to="/product" className="hero-link">
                <button className="btn btn-warning hero-btn mt-3">
                  Explore Products
                  <i className="fa-solid fa-arrow-right ms-2"></i>
                </button>
              </Link>
            ) : (
              <Link to="/signup" className="hero-link">
                <button className="btn btn-warning hero-btn mt-3">
                  Get Started
                  <i className="fa-solid fa-arrow-right ms-2"></i>
                </button>
              </Link>
            )}
          </div>

          {/* Right Section: Insurance Card */}
          <div className="col-12 col-lg-6 hero-card">
            <InsuranceCard />
          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;
