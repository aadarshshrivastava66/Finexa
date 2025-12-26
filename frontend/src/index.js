import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import HomePage from './pages/HomePage';

import Navbar from './components/Navbar';
import ProductPage from './pages/ProductPage';
import Footer from './components/Footer';
import LonePage from './pages/LonePage';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar />
     
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
      <Route path="/products" element={<ProductPage/>}/>
      <Route path="/lones" element={<LonePage/>}/>


      </Routes>
      
      <Footer/>
    </BrowserRouter>
  </React.StrictMode>
);

