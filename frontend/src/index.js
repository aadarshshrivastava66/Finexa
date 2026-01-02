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
import ApplicationDetails from ".//components/admin/ApplicationDetails";
import AdminVerify from "./components/admin/AdminVerify"
import AdminProtectedRoute from './route/AdminProtectedRoute'
import InsurancaPage from './pages/InsurancePage'
import InvestementPage from './pages/InvestementPage'

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
        <Route path="/investment" element={<InvestementPage />} />
        <Route
          path="/apply-loan/:loanId"
          element={
            <PrivateRoute>
              <ApplyLoan />
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
      </Routes>

      <Footer />
    </BrowserRouter>
  </AuthProvider>
);
