import React, { useState } from 'react'
import { useNavigate} from 'react-router-dom';
export default function Login() {
    const[credential,setcredential]=useState({email:"",password:""});
    const handleonchange=(e)=>{
        setcredential({...credential,[e.target.name]:e.target.value})
    }
    const navigate=useNavigate();
    const handlesubmit=async (e)=>{
        e.preventDefault();
        const url='http://localhost:5000/login';
        const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email:credential.email, password:credential.password})
          });
          const json= await response.json();
          if(json){
            localStorage.setItem("token",json);
            navigate('/');
          }
    }
    return (
        <div>
            <h1 className='text-center mt-3 mb-4'>Login to iNotebook</h1>
            <form onSubmit={handlesubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name="email" placeholder="Enter email"  onChange={handleonchange}/>
                        <small id="emailHelp" className="form-text text-muted" name="email" ></small>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Password" name="password" onChange={handleonchange}/>
                </div>
                <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}
