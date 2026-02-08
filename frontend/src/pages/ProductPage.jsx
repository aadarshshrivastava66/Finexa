import LifeInsurance from "../components/Product/LifeInsurance";
import Loan from "../components/Product/Lone";

function ProductPage() {
  return (
    <div className="container py-5">
      <h1 className="text-center fw-bold mb-4">
        Our Core Offerings
      </h1>

      <p className="text-center text-muted mb-5">
        Choose the best financial product that suits your needs
      </p>

      <div className="row g-4 justify-content-center">   {/* <-- IMPORTANT LINE */}

        <div className="col-lg-5 col-md-8 col-sm-12">
        
            <LifeInsurance />
         
        </div>

        <div className="col-lg-5 col-md-8 col-sm-12">
          
            <Loan />
         
        </div>

      </div>
    </div>
  );
}

export default ProductPage;
