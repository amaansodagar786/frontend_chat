import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null); // State to store user details
    const [loading, setLoading] = useState(true); // Track loading state

    useEffect(() => {
        const validateToken = async () => {
            const token = localStorage.getItem("token");
            const storedUser = localStorage.getItem("user");

            if (token && storedUser) {
                try {
                    const parsedUser = JSON.parse(storedUser);
                    const response = await axios.get("https://backend-chat-app-qoti.onrender.com/protected", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    // Token is valid, set user and authentication state
                    setUser(parsedUser);
                    setIsAuthenticated(true);
                } catch (error) {
                    console.error("Token validation failed:", error);
                    // Clear invalid data from localStorage
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    setIsAuthenticated(false);
                    setUser(null);
                }
            } else {
                console.log("Token or user not found in localStorage.");
            }
            setLoading(false); // Stop loading regardless of outcome
        };

        validateToken();
    }, []);

    const login = (token, userData) => {
        // Store token and user in localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
        setIsAuthenticated(true);
    };

    const logout = () => {
        // Clear localStorage and reset states
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
