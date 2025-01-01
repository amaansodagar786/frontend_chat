import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Componants/Navbar/Navbar'; 
import Home from './Pages/Home/Home'; 
import Register from './Pages/Register/Register';
import Login from './Pages/Login/Login';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/nav" element={<Navbar />} />
        <Route path="/reg" element={<Register/>} />
        <Route path="/login" element={<Login/>} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
