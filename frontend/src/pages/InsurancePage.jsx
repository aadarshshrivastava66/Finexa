import react, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function InsurancePage(){
    const navigate=useNavigate();
useEffect(()=>{
    axios.get("http://localhost:8080/lifeInsurance")
    .then(()=>{
        alert("Module Under Working");
        navigate('/product');
    }).catch((err)=>{
        console.log(err);
        alert("Some Error Occur ");
        navigate('/product');
    })
},[])
}

export default InsurancePage;