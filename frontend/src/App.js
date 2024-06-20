import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import React from "react";
import Home from "./components/Home";
import About from "./components/About";
import NotesState from "./components/model/NotesState"; 
import Signup from "./components/Signup";
import Login from "./components/Login";

const App = () => {
  return (
    <>
    <NotesState>
    
    
    <div className="container">
      <Router>
      <Navbar/>
        <Routes>
          <Route
            path="/"
            element={<Home/>}
          />
          <Route
            path="/about"
            element={<About />}
          />
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
        </Routes>
      </Router>
    </div>
    </NotesState>
      </>
  );
};

export default App;
