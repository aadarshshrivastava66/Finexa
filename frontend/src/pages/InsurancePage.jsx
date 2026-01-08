import react, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import InsuranceListCard from "../components/insurance/InsuranceListCard";

function InsurancePage() {
  //     const navigate=useNavigate();
  // useEffect(()=>{
  //     axios.get("http://localhost:8080/lifeInsurance")
  //     .then(()=>{
  //         alert("Module Under Working");
  //         navigate('/product');
  //     }).catch((err)=>{
  //         console.log(err);
  //         alert("Some Error Occur ");
  //         navigate('/product');
  //     })
  // },[])
  return (
    <div className="container mt-5">
      <h1 className="text-center" style={{ color: "navy" }}>
        Dicover Our Insurance Plans
      </h1>
      <p className="text-center loanpara text-muted ">
        Flexible Insurance Plans That Match Your Needs
      </p>
      <div className="row ">
        <div className="col-lg-4 col-md-6 col-sm-12">
          <InsuranceListCard
            title={"Child Education"}
            image={"/images/childinsurance.png"}
            desc={
              "Secures funds for your child’s future education and academic dreams."
            }
            url={"Childinsurance"}
          />
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12">
          <InsuranceListCard
            title={"Retirement Plans"}
            image={"/images/retermentplan.png"}
            desc={
              "Builds a reliable income for a secure and comfortable retired life."
            }
          />
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12">
          <InsuranceListCard
            title={"Financial Security"}
            image={"/images/financialSecurity.png"}
            desc={
              "Ensures long-term financial stability for you and your family."
            }
          />
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12">
          <InsuranceListCard
            title={"Family’s Protection"}
            image={"/images/familyPlan.png"}
            desc={
              "Provides financial support to your family during unexpected situations."
            }
          />
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12">
          <InsuranceListCard
            title={"Wealth creation"}
            image={"/images/wealthCreation.png"}
            desc={
              "Helps grow your savings and build long-term financial assets."
            }
          />
        </div>
      </div>
    </div>
  );
}

export default InsurancePage;
