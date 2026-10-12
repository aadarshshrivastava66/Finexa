
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../css/insurancetype.css";
import { useNavigate } from "react-router-dom";
import adminApi from "../../services/adminApi";
import { useAuth } from "../../context/AuthContext";

function FamilyInsurance() {
  const navigate = useNavigate();
  const [allInsurance, setAllInsurance] = useState([]);
  const [error, setError] = useState("");
  const { user } = useAuth();
  const role = user?.role || "user";

  useEffect(() => {
    axios
      .get(
        "https://finexa-backend-7d2r.onrender.com/lifeInsurance/FamilyInsurance"
      )
      .then((res) => {
        setAllInsurance(res.data);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load insurance data");
      });
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this insurance?")) {
      return;
    }

    try {
      await adminApi.delete(`/insurance/${id}`);

      setAllInsurance((prev) =>
        prev.filter((item) => item._id !== id)
      );

      alert("Deleted successfully");
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  if (error) {
    return <p className="text-center mt-4">{error}</p>;
  }

  return (
    <div className="container-fluid insurance-container mt-3">
      <h1 className="text-center mt-3">Family Plan</h1>

      {allInsurance.map((item) => (
        <div key={item._id} className="detail-card mt-4 mb-4">
          <div className="row insurance-row g-0">

            {/* Product Details */}
            <div className="col-5 insurance-column">
              <h2 className="mainheading">
                Finexa - {item.title}
              </h2>

              <p className="insurance-text">
                {item.description}
              </p>
            </div>

            {/* Key Features */}
            <div className="col-3 insurance-column">
              <h3 className="mainheading section-heading">
                Key Features
              </h3>

              <p className="heading insurance-label">
                Annual Premium Range
              </p>

              <p className="insurance-text">
                {item.preminumRange} onwards
              </p>

              <p className="heading insurance-label mt-3">
                Entry Age
              </p>

              <p className="insurance-text">
                {item.entryAge} Years
              </p>
            </div>

            {/* Key Benefits */}
            <div className="col-4 insurance-column">
              <h3 className="mainheading section-heading">
                Key Benefits
              </h3>

              {item.keyBenefits?.map((benefit, index) => (
                <p
                  key={index}
                  className="insurance-text benefit-text"
                >
                  • {benefit}
                </p>
              ))}

              <div className="insurance-actions">
                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={() =>
                    navigate(`/lifeInsurance/${item._id}`)
                  }
                >
                  View Documents
                </button>

                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={() =>
                    navigate(
                      `/lifeInsurance/apply-insurance/${item._id}`
                    )
                  }
                >
                  Apply Now
                </button>

                {(role === "admin" || role === "superadmin") && (
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      ))}

      {allInsurance.length === 0 && (
        <p className="text-center mt-4">
          No family insurance plans available.
        </p>
      )}
    </div>
  );
}

export default FamilyInsurance;
