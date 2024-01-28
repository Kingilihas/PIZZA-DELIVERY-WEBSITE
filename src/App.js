import logo from './logo.svg';
import './App.css';
import React from 'react';
import Navbar from './MyComponents/Navbar';
import Showmenu from './MyComponents/Showmenu';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import About from './MyComponents/About';
import AdminLogin from './MyComponents/AdminLogin';
import Admin from './MyComponents/Admin';
function App() {


  return (
    <div className="App">


      <Navbar />

      <Routes>
        <Route path="/" element={<Showmenu />} />
        <Route path="/About" element={<About />} />
        <Route path="/Admin" element={<AdminLogin />} />
        <Route path="/actualadmin" element={<Admin />} />
      </Routes>


    </div>
  );
}

export default App;
