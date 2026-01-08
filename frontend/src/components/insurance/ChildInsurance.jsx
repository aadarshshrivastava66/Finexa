import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../css/insurancetype.css";
import { useNavigate } from "react-router-dom";

function ChildInsurance() {
  const navigate = useNavigate();
  const [allInsurance, setAllInsurance] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/lifeInsurance/Childinsurance")
      .then((res) => {
        setAllInsurance(res.data);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load insurance data");
      });
  }, []);

  if (error) return <p>{error}</p>;

  return (
    <div className="container mt-3">
      <h1 className="text-center mt-3">Child Education</h1>
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
  onClick={() =>
    navigate(`/lifeInsurance/Childinsurance/${item._id}`)
  }
>
  View Documents
</button>

            <button
              className="btn btn-outline-primary btn-sm ms-2"
              style={{ color: "black" }}
              onClick={() => navigate(`/lifeInsurance/Childinsurance/apply-insurance/${item._id}`)}
            >
              Apply Now
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ChildInsurance;
