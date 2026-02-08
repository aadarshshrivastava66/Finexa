
import "../css/adminPage.css"
import { Link,} from 'react-router-dom';
import { useAuth } from "../context/AuthContext";
const AdminDashboard = () => {
  const { user } = useAuth(); 
  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Admin Dashboard</h2>
     
           <div className="row cardrow">
            <div className="m-5 Admin-card">
              <h1 className="fs-3">Loan-Section</h1>
              <img src="/images/lone.png" className="image"></img>
              <br></br>
              <Link to={"admin/lone"} style={{textDecoration:"none"}} >Explore More <i class="fa-solid fa-arrow-right-long"></i></Link>
            </div>
            <div className=" m-5 Admin-card">
              <h1 className="fs-3">Insurance-Section</h1>
              <img src="/images/insurance.png" className="image"></img>
               <br></br>
              <Link to={'admin/insurance'} style={{textDecoration:"none"}}>Explore More <i class="fa-solid fa-arrow-right-long"></i></Link>
            </div>
            {
             ( user.role==="superadmin")&&( <div className=" m-5 Admin-card">
              <h1 className="fs-3">Register New Admin</h1>
              <img src="/images/admin.png" className="image"></img>
               <br></br>
              <Link to={'/admin/signup'} style={{textDecoration:"none"}}>Register Admin <i class="fa-solid fa-arrow-right-long"></i></Link>
            </div>)
            }
      </div>
      
    </div>
  );
};

export default AdminDashboard;
