import { useEffect, useState } from "react";
import adminApi from "../../services/adminApi";
import { useNavigate } from "react-router-dom";

function ApproveLoan(){
   const [applications, setApplications] = useState([]);
     const navigate = useNavigate();
   
     useEffect(() => {
       fetchApplications();
     }, []);
   
     const fetchApplications = async () => {
       const res = await adminApi.get("/approve/applications");
   
       setApplications(res.data);
     };
   
     return (
       <div className="container m-5">
       <table className="table table-bordered">
         <thead className="table-dark">
           <tr>
             <th>User</th>
             <th>Loan</th>
             <th>Amount</th>
             <th>Status</th>
             <th>Action</th>
           </tr>
         </thead>
   
         <tbody>
           {applications.map((app) => (
             <tr key={app._id}>
               <td>{app.user?.name}</td>
               <td>{app.loan?.name}</td>
               <td>₹{app.appliedAmount}</td>
               <td>{app.status}</td>
               <td>
                 <button
                   className="btn btn-primary btn-sm"
                   onClick={() => navigate(`/admin/applications/${app._id}`)}
                 >
                   View
                 </button>
               </td>
             </tr>
           ))}
         </tbody>
       </table>
       </div>
     );
}
export default ApproveLoan