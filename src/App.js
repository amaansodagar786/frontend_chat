import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Componants/Navbar/Navbar';
import Home from './Pages/Home/Home';
import Register from './Pages/Register/Register';
import Login from './Pages/Login/Login';
import Chatpage from './Pages/Chatpage/Chatpage';
import AuthProvider from '../src/Context/AuthContext';
import PrivateRoute from '../src/Utils/PrivateRoute';

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    {/* Protect ChatPage */}
                    <Route
                        path="/chat"
                        element={
                            <PrivateRoute>
                                <Chatpage />
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
