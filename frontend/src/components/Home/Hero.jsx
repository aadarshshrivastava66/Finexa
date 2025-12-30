import React from "react";
import "../../css/homeHero.css";
import InsuranceCard from "./Insurancecard";
import {Link} from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";
function Hero() {
  const { user} = useAuth();
  return (
    <div className="mt-2 p-5 Hero">
      <div className="row">
        <div className="col-6 p-5">
          <h1 style={{color:"white"}}>
            Secure Your Future With 
          </h1>
          <h1  className="fs-1 title">FINEXA</h1>
          <p className="mt-3">
            Finexa provides comprehensive financial solutions<br></br> to help
            you secure your future.
          </p>
          <p >Instant Loans, Credit Cards, and Investment Plans.</p>
          { user ?( <Link to='/product'>
          <button className="btn btn-warning mt-3">
            Explore Products <i className="fa-solid fa-arrow-right ms-2"></i>
          </button>
          </Link>):(<Link to='/signup'>
          <button className="btn btn-warning mt-3">
            Get Started <i className="fa-solid fa-arrow-right ms-2"></i>
          </button>
          </Link>)

          }
          

          

        </div>
        <div className="col-6 mt-5">
          <InsuranceCard />
        </div>
      </div>
    </div>
  );
}

export default Hero;
