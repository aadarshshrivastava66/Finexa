import React, { useEffect, useState } from "react";
import axios from "axios";

function UserDashboard() {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/loans/my",
          { withCredentials: true }
        );
        setLoans(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLoans();
  }, []);

  if (loading) {
    return <h3 className="text-center mt-5">Loading...</h3>;
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">My Loan Applications</h2>

      {loans.length === 0 ? (
        <p>You have not applied for any loans yet.</p>
      ) : (
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Loan Name</th>
              <th>Applied Amount</th>
              <th>Employment Type</th>
              <th>Status</th>
              <th>Applied On</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.loan?.name}</td>
                <td>₹{item.appliedAmount}</td>
                <td>{item.employmentType}</td>
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

export default UserDashboard;
