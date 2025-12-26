import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';

import Navbar from './components/Navbar';
import ProductPage from './pages/ProductPage';
import Footer from './components/Footer';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar />
      <HomePage />
      <Footer/>
    </BrowserRouter>
  </React.StrictMode>
);

