import React from 'react';
import {Link} from 'react-router-dom'
import "../css/navabar.css";
function Navbar() {
    return ( 
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    
    <a className='logo' href="#"><img src='logo.png' /></a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class=" navbar-collapse ms-auto" id="navbarSupportedContent">
      <ul class="navbar-nav ms-auto mb-2 mb-lg-0 me-5 ">
        <li class="nav-item mx-3">
                <Link class="nav-link active" to="/about">
                  About
                </Link>
              </li>
              
               <li class="nav-item mx-3">
                <Link class="nav-link active" to="/product">
                  Product
                </Link>
              </li>
              
              <li class="nav-item mx-3">
                <Link class="nav-link active" to="/pricing">
                  Pricing
                </Link>
              </li>
              
             
              
              <li class="nav-item mx-3">
                <Link class="nav-link active" to="/Support">
                  Support
                </Link>
              </li>
              <li class="nav-item mx-3">
                <Link class="nav-link active" to="/singup">
                  Singup
                </Link>
              </li>
        
        
      </ul>
      
    </div>
  </div>
</nav>
     );
}

export default Navbar;