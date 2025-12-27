import React from 'react';
import Hero from '../components/Home/Hero';
import ProductPage from './ProductPage';
import Imporant from '../components/Home/Importance';



function HomePage() {
    return ( 
        <>
        
        <Hero/>
        <ProductPage/>
        <Imporant/>
        </>
     );
}

export default HomePage;