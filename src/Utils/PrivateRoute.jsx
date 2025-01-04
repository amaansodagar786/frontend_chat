import React from "react";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

const PrivateRoute = ({ children }) => {
    const { isAuthenticated, loading } = useContext(AuthContext);

    if (loading) {
        return <div>Loading...</div>; // Show a loading indicator while validation is ongoing
    }

    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
