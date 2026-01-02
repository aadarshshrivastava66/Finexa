import ApplicationsList from "../components/admin/ApplicationsList";

const AdminDashboard = () => {
  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Admin Dashboard</h2>
      <ApplicationsList />
    </div>
  );
};

export default AdminDashboard;
