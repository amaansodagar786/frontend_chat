import React, { useState, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {
    TextField,
    Button,
    InputAdornment,
    Snackbar,
    Alert,
    CircularProgress,
} from "@mui/material";
import { Email, Lock } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import "./Login.scss";

const Login = () => {
    const { login } = useContext(AuthContext); // Access login method from AuthContext
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const navigate = useNavigate();

    // Formik for form management
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
            setLoading(true);
            try {
                const response = await axios.post(`https://backend-chat-app-qoti.onrender.com/auth/login`, values);
                const { token, user } = response.data; // Backend should return token and user details

                // Save token and user details to context and localStorage
                login(token, user);
                setLoading(false);
                navigate("/"); // Redirect to homepage
            } catch (error) {
                setError(error.response?.data?.message || "Login failed!");
                setOpenSnackbar(true);
                setLoading(false);
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
                {/* Email Input */}
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
                    sx={{ marginBottom: "20px" }}
                />

                {/* Password Input */}
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

                {/* Submit Button */}
                <Button
                    type="submit"
                    className="login-button"
                    disabled={loading}
                >
                    {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
                </Button>

                {/* Registration Link */}
                <div className="register-link">
                    Don't have an account?{" "}
                    <Link to="/register" className="link">
                        Register here
                    </Link>
                </div>
            </form>

            {/* Error Snackbar */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={3500}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: "100%" }}>
                    {error}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default Login;
