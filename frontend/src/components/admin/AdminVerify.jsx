import React, { useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function AdminVerify(){
    const nevigate=useNavigate();
    const [formdata, setFormdata] = useState({
    code: "",
  });
    const[loading,setLoading]=useState(false);
    const [error, setError] = useState("");

    const handleChange=(e)=>{
        setFormdata({...formdata,[e.target.name]:e.target.value});
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        setLoading(true);
        try{
            await axios.post("http://localhost:8080/admin/verify",formdata,{withCredentials: true})
          

            nevigate('/admin/signup');
        }catch(err){
            
            setError(err.response?.data?.message || "You Cannot Access This");
        }finally {
      setLoading(false);
    }
    }

    return(
       < div className="container mt-5">
      <div className="card shadow-lg p-4 login-card">
        <h3 className="text-center mb-4">Verify Your Identity</h3>
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-12">
            <label>Code</label>
            <input
              type="text"
              name="code"
              className="form-control"
              required
              value={formdata.code}
              onChange={handleChange}
            />
          </div>
          {error && <p className="text-danger">{error}</p>}
          <div className="col-12 text-center">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "verifying in..." : "Verify"}
            </button>
          </div>
          
        </form>
      </div>
    </div>
    )
}

export default AdminVerify;