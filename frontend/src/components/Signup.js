import React, { useState } from 'react'
import { useNavigate} from 'react-router-dom';
export default function Signup() {
  const navigate=useNavigate();
  const [credential, setcredentials] = useState({ email: "", name: " ", password: "", epassword: " " })
  const onhandlechange = (e) => {
    setcredentials({ ...credential, [e.target.name]: e.target.value })
    console.log(credential);
  }
  const handleclick = async (e) => {
    if (credential.password === credential.epassword) {
      e.preventDefault();
      const url = 'http://localhost:5000/register';
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: credential.email, name: credential.name, password: credential.password })
      });
      const json = await response.json();
      if(json){
        localStorage.setItem("token",json);
        navigate('/');
      }
    }
    else {
      console.log("Password doesnt matches");
    }
  }
  return (
    <div>
      <h1 className='text-center mt-3 mb-4'>Sign up to iNotebook</h1>
      <form>
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" name="email" onChange={onhandlechange} />
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Name</label>
          <input type="text" class="form-control" id="name" aria-describedby="emailHelp" placeholder="Enter name" name="name" onChange={onhandlechange} />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input type="password" class="form-control" id="password" placeholder="Password"
            name="password" onChange={onhandlechange} />
          <label for="exampleInputPassword1">Confirm Password</label>
          <input type="password" class="form-control" id="password" placeholder="Password"
            name="epassword" onChange={onhandlechange} />
        </div>
        <div class="form-check">
        </div>
        <button type="submit" class="btn btn-primary" onClick={handleclick}>Register</button>
      </form>
    </div>
  )
}
