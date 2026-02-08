import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../css/insurancetype.css";
import { useNavigate } from "react-router-dom";
import adminApi from "../../services/adminApi";
import { useAuth } from "../../context/AuthContext";

function RetirementInsurance() {
  const navigate = useNavigate();
  const [allInsurance, setAllInsurance] = useState([]);
  const [error, setError] = useState("");
  const { user } = useAuth();
  const role = user?.role || "user";

  useEffect(() => {
    axios
      .get("http://localhost:8080/lifeInsurance/RetirementInsurance")
      .then((res) => {
        setAllInsurance(res.data);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load insurance data");
      });
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this insurance?"))
      return;

    try {
      await adminApi.delete(`/insurance/${id}`);

      // Remove from UI after delete
      setAllInsurance(allInsurance.filter((item) => item._id !== id));

      alert("Deleted successfully");
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  if (error) return <p>{error}</p>;

  return (
    <div className="container mt-3">
      <h1 className="text-center mt-3">Retiremen Plan</h1>
      {allInsurance.map((item) => (
        <div
          key={item._id}
          className="row border mb-3 rounded detail-card p-3 mt-5"
        >
          <div className="col-5 p-3">
            <h1 className="fs-3 mainheading">Finexa - {item.title}</h1>
            <p className="fs-6 mb-0">{item.description}</p>
          </div>

          <div className="col-3 p-3">
            <h2 className="fs-5 mainheading">Key Features</h2>
            <p className="fs-6 mb-0 heading">Annual Premium Range</p>
            <p className="fs-6 mb-0">{item.preminumRange} onwards</p>
            <br></br>
            <p className="fs-6 mb-0 heading">Entry Age</p>
            <p className="fs-6 mb-0">{item.entryAge} Years</p>
          </div>

          <div className="col-4 p-3">
            <h2 className="fs-5 mainheading">Key Benefits</h2>
            {item.keyBenefits.map((benefit, index) => (
              <p key={index} className="fs-6 mb-0">
                • {benefit}
              </p>
            ))}
            <br></br>
            <button
              className="btn btn-outline-primary btn-sm ms-2"
              style={{ color: "black" }}
              onClick={() => navigate(`/lifeInsurance/${item._id}`)}
            >
              View Documents
            </button>

            <button
              className="btn btn-outline-primary btn-sm ms-2"
              style={{ color: "black" }}
              onClick={() =>
                navigate(`/lifeInsurance/apply-insurance/${item._id}`)
              }
            >
              Apply Now
            </button>
             {(role === "admin" || role === "superadmin") && (
              <button
                className="btn btn-outline-danger btn-sm ms-2"
                onClick={() => handleDelete(item._id)}
              >
                Delete
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default RetirementInsurance;
