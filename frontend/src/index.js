import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";

import Navbar from "./components/Navbar";
import ProductPage from "./pages/ProductPage";
import Footer from "./components/Footer";
import LonePage from "./pages/LonePage";
import CheckEligibility from "./components/Lone/CheckEligibility";
import Register from "./components/user/Register";
import Login from "./components/user/Login";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./route/PrivateRoute";
import ApplyLoan from "./components/Lone/ApplyLoan";
import UserDashboard from "./pages/UserDashboard";
import AdminRegister from "./components/admin/AdminRegister";
import AdminLogin from "./components/admin/AdminLogin";
import AdminRoute from "./route/AdminRoute";
import AdminDashboard from "./pages/AdminDashboard";
import ApplicationDetails from "./components/admin/ApplicationDetails";
import AdminVerify from "./components/admin/AdminVerify"
import AdminProtectedRoute from './route/AdminProtectedRoute'
import InsurancaPage from './pages/InsurancePage'

import ChildInsurance from './components/insurance/ChildInsurance'
import RequiredDocument from './components/insurance/RequiredDocument'
import ApplyInsurance from './components/insurance/ApplyInsurance'
import InsuranceApplicationDetail from './components/admin/InsuranceApplicationDetail';
import AdminLonePanel from "./components/admin/AdminLonePanel";
import AdminInsurancePanel from "./components/admin/AdminInsurancePanel";
import NewLoan from "./components/Lone/NewLoan";
import ApplicationsList from "./components/admin/ApplicationsList";
import InsuranceApplicationList from "./components/admin/InsuranceApplicationList";
import NewInsurance from "./components/insurance/NewInsurance";
import ApproveLoan from "./components/admin/ApproveLoan";
import RejectLoan from "./components/admin/RejectLoan";
import ApproveInsurance from "./components/admin/ApproveInsurance";
import RejectApplication from "./components/admin/RejectApplication";
import RetirementInsurance from "./components/insurance/RetirementInsurance";
import SecurityInsurance from "./components/insurance/SecurityInsurance";
import FamilyInsurance from "./components/insurance/FamilyInsurance";
import WealthInsurance from "./components/insurance/WealthInsurance";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/finexa" element={<HomePage />}></Route>
        <Route path="/product" element={<ProductPage />} />
        <Route path="/lones" element={<LonePage />} />
        <Route path="/check-eligibility/:id" element={<CheckEligibility />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/lifeInsurance" element={<InsurancaPage />} />
        
        <Route path="/lifeInsurance/Childinsurance" element={<ChildInsurance />} />
        <Route path="lifeInsurance/RetirementInsurance" element={<RetirementInsurance/>} />
        <Route path="lifeInsurance/SecurityInsurance" element={<SecurityInsurance/>} />
        <Route path="lifeInsurance/FamilyInsurance" element={<FamilyInsurance/>} />
        <Route path="lifeInsurance/WealthInsurance" element={<WealthInsurance/>} />
        <Route path="/lifeInsurance/:id" element={<RequiredDocument />} />
        <Route
          path="/apply-loan/:loanId"
          element={
            <PrivateRoute>
              <ApplyLoan />
            </PrivateRoute>
          }
        />
        <Route
          path="/lifeInsurance/apply-insurance/:id"
          element={
            <PrivateRoute>
              <ApplyInsurance />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <UserDashboard />
            </PrivateRoute>
          }
        />
        {/* Admin */}
         <Route path="/admin/verify" element={<AdminVerify />} />

        {/* Protected Admin Signup */}
        <Route
          path="/admin/signup"
          element={
            <AdminProtectedRoute>
              <AdminRegister />
            </AdminProtectedRoute>
          }
        />
          
        <Route path="admin/login" element={<AdminLogin />} />

        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/applications/:id"
          element={
            <AdminRoute>
              <ApplicationDetails />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/insurance/applications/:id"
          element={
            <AdminRoute>
              <InsuranceApplicationDetail/>
            </AdminRoute>
          }
        />
        <Route
          path="/admin/dashboard/admin/lone"
          element={
            <AdminRoute>
              <AdminLonePanel/>
            </AdminRoute>
          }
        />
        <Route
          path="/admin/dashboard/admin/insurance"
          element={
            <AdminRoute>
              <AdminInsurancePanel/>
            </AdminRoute>
          }
        />
        <Route
          path="/loan/new"
          element={
            <AdminRoute>
              <NewLoan/>
            </AdminRoute>
          }
        />
       
        <Route
          path="/loan/pending/applications"
          element={
            <AdminRoute>
              <ApplicationsList/>
            </AdminRoute>
          }
        />
        <Route
          path="/loan/approve/application"
          element={
            <AdminRoute>
              <ApproveLoan/>
            </AdminRoute>
          }
        />
        <Route
          path="/loan/reject/application"
          element={
            <AdminRoute>
              <RejectLoan/>
            </AdminRoute>
          }
        />
         <Route
          path="/insurance/new"
          element={
            <AdminRoute>
              <NewInsurance/>
            </AdminRoute>
          }
        />
        <Route
          path="/insurance/pending/applications"
          element={
            <AdminRoute>
              <InsuranceApplicationList/>
            </AdminRoute>
          }
        />
        <Route
          path="/insurance/approve/applications"
          element={
            <AdminRoute>
              <ApproveInsurance/>
            </AdminRoute>
          }
        />
        <Route
          path="/insurance/reject/applications"
          element={
            <AdminRoute>
              <RejectApplication/>
            </AdminRoute>
          }
        />
      </Routes>

      <Footer />
    </BrowserRouter>
  </AuthProvider>
);
