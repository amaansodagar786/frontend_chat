import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true); // Track loading state

    useEffect(() => {
        const validateToken = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    await axios.get("http://localhost:4000/protected", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setIsAuthenticated(true);
                } catch (error) {
                    console.error("Token validation failed:", error);
                    localStorage.removeItem("token");
                    setIsAuthenticated(false);
                }
            }
            setLoading(false); // Set loading to false once validation is complete
        };

        validateToken();
    }, []);

    const login = (token) => {
        localStorage.setItem("token", token);
        setIsAuthenticated(true); // Update authentication state
    };

    const logout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false); // Update authentication state on logout
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
