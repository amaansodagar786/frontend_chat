import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { TextField, Button, InputAdornment, Snackbar, Alert } from "@mui/material";
import { Email, Lock } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";  // Update here for useNavigate
import "./Login.scss";

const Login = () => {
    const [error, setError] = useState("");
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const navigate = useNavigate();  // Use useNavigate instead of useHistory

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Invalid email address")
                .required("Email is required"),
            password: Yup.string()
                .min(6, "Password must be at least 6 characters")
                .required("Password is required"),
        }),
        onSubmit: async (values) => {
            try {
                const response = await axios.post(
                    `http://localhost:4000/auth/login`,
                    values
                );
                
                localStorage.setItem("token", response.data.token);
                console.log(localStorage.getItem("token"));

                navigate("/");  // Navigate to /chat page after successful login
            } catch (error) {
                setError(error.response?.data?.message || "Login failed!");
                setOpenSnackbar(true);
            }
        },
    });

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <div className="login-container">
            <h1>Login to Your Account</h1>
            <form onSubmit={formik.handleSubmit} className="login-form">
                <TextField
                    fullWidth
                    id="email"
                    name="email"
                    label="Email"
                    variant="outlined"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Email />
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    fullWidth
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    variant="outlined"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Lock />
                            </InputAdornment>
                        ),
                    }}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className="login-button"
                >
                    Login
                </Button>
                <div className="register-link">
                    Don't have an account?{" "}
                    <Link to="/reg" className="link">
                        Register here
                    </Link>
                </div>
            </form>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >
                <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: "100%" }}>
                    {error}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default Login;
