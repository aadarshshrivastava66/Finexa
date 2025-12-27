import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import HomePage from './pages/HomePage';

import Navbar from './components/Navbar';
import ProductPage from './pages/ProductPage';
import Footer from './components/Footer';
import LonePage from './pages/LonePage';
import CheckEligibility from './components/Lone/CheckEligibility'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 
    <BrowserRouter>
      <Navbar />
     
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
      <Route path="/product" element={<ProductPage/>}/>
      <Route path="/lones" element={<LonePage/>}/>
      <Route path="/check-eligibility/:id" element={<CheckEligibility />} />

      </Routes>
      
      <Footer/>
    </BrowserRouter>
  
);

