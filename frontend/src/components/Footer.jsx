import React from 'react';
import '../css/footer.css';
import { Link } from 'react-router-dom';
function Footer() {
    return ( 
        <div className='footer p-5 mt-5'>
            
            <div className='row '>
                <div className='col'>
                    <h3>Finexa</h3>
                    <p>Your Trusted Partner for Loans,<br></br>Insurance and Investements</p>
                </div>
                <div className='col'>
                    <h3>Products</h3>
                    <Link to ="/products" style={{textDecoration:"none", color:"white"}}>Loans</Link><br></br>
                    <Link to ="/products" style={{textDecoration:"none", color:"white"}}>Insurance</Link><br></br>
                    <Link to ="/products" style={{textDecoration:"none", color:"white"}}>Investements</Link><br></br>
                </div>
                <div className='col'>
                    <h3>Company</h3>
                    <Link to ="/about" style={{textDecoration:"none", color:"white"}}>About Us</Link><br></br>
                    <Link to ="/contact" style={{textDecoration:"none", color:"white"}}>Contact Us</Link><br></br>
                    <Link to ="#" style={{textDecoration:"none", color:"white"}}>Privacy Policy</Link><br></br>
                </div>
                <div className='col'>
                    <h3>Contact</h3>
                    <p className='fs-6'>123 Finance Street,Indore City, India</p>
                    <p className='fs-6'>Email: Finexa@support.in </p>
                </div>
            </div>
        </div>
     );
}

export default Footer;