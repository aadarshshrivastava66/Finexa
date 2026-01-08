import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams,useNavigate } from "react-router-dom";

function RequiredDocument() {
  const navigate=useNavigate();
  const { id } = useParams();   
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8080/lifeInsurance/Childinsurance/${id}`)
      .then((res) => {
        console.log(res.data);
        setDocuments(res.data.documentsRequired); 
      })
      .catch((err) => {
        console.log(err);
        setError("Some error occurred");
      });
  }, [id]); 
  if (error) return <p>{error}</p>;

  return (
    <div className="container mt-4">
      <h1>Required Documents</h1>

      <ul className="list-group">
        {documents.map((doc, index) => (
          <p key={index} className="list-group-item mt-3 col-lg-2" style={{backgroundColor:"#f5f6f8"}}>
            {doc}
          </p>
        ))}
      </ul>
      <button
              className="btn btn-outline-primary btn-sm ms-2"
              style={{ color: "black" }}
              onClick={() => navigate(`/lifeInsurance/Childinsurance/apply-insurance/${id}`)}
            >
              Apply Now
            </button>
    </div>
  );
}

export default RequiredDocument;
