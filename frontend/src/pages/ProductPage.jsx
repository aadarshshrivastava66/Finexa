import React from 'react';
import Investment from "../components/Product/Investment"
import LifeInSueance from "../components/Product/LifeInsurance"
import Lone from '../components/Product/Lone';
function ProductPage() {
    return ( 
        <>
        <div className='row p-5'>
        <div className='col-4'>
            <Investment/>
        </div>
        <div className='col-4'>
            
            <LifeInSueance/>
        </div>
        <div className='col-4'>
            <Lone/>
        </div>

        </div>         
        </>
     );
}

export default ProductPage;