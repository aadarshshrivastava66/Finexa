import React from 'react';
import Hero from '../components/Home/Hero';
import ProductPage from './ProductPage';
import Imporant from '../components/Home/Importance';



function HomePage() {
    return ( 
        <>
        
        <Hero/>
        <h1 className='text-center mt-5'>Our Core Offerings</h1>
        <ProductPage/>
        <Imporant/>
        </>
     );
}

export default HomePage;