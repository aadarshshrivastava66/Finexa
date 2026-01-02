import react  from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function InvestementPage(){
      const navigate=useNavigate();
    useEffect(()=>{
        axios.get("http://localhost:8080/investment")
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

export default InvestementPage;