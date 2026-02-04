import ApplicationsList from "../components/admin/ApplicationsList";
import InsuranceApplicationList from "../components/admin/InsuranceApplicationList";

const AdminDashboard = () => {
  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Admin Dashboard</h2>
      <ApplicationsList />
      <InsuranceApplicationList/>
    </div>
  );
};

export default AdminDashboard;
