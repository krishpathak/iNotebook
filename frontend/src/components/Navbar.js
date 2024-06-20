import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
export default function Navbar() {
  const navigate=useNavigate();
  const handledelete=()=>{
    localStorage.removeItem('token');
    navigate('/')
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">iNotebook</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/about">About</a>
              </li>
            </ul>
          </div>
          
          {!localStorage.getItem('token')? <><button type="button" className="btn btn-primary mx-3" data-toggle="button" aria-pressed="false" autocomplete="off">
            <a href="/login" style={{textDecoration:'none',color:'white'}}>Login</a>
          </button>
          
          <button type="button" className="btn btn-primary" data-toggle="button" aria-pressed="false" autocomplete="off">
          <a href="/signup" style={{textDecoration:'none',color:'white'}}>Sign Up</a>
          </button> </>:<button className='btn btn-primary mx-3' onClick={handledelete}>Logout</button>}
          
        </div>
      </nav>
    </div>
  )
}
