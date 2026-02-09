import React, { useEffect, useState } from "react";
import axios from "axios";

function UserRecord() {
  const [insurance, setInsurance] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInsurance = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/lifeInsurance/my",
          { withCredentials: true }
        );
        setInsurance(res.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchInsurance();
  }, []);

  if (loading) {
    return <h3 className="text-center mt-5">Loading...</h3>;
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">My Insurance Applications</h2>

      {insurance.length === 0 ? (
        <p>You have not applied for any insurance yet.</p>
      ) : (
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Policy Name</th>
              <th>Applicant</th>
              <th>Mobile</th>
              <th>Status</th>
              <th>Applied On</th>
            </tr>
          </thead>

          <tbody>
            {insurance.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.insuranceId?.type || "Life Insurance"}</td>
                <td>{item.fullName}</td>
                <td>{item.mobile}</td>
                <td>
                  <span
                    className={`badge ${
                      item.status === "approved"
                        ? "bg-success"
                        : item.status === "rejected"
                        ? "bg-danger"
                        : "bg-warning"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td>
                  {new Date(item.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default UserRecord;
