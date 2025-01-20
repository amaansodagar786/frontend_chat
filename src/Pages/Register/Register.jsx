import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { AccountCircle, Email, Lock } from "@mui/icons-material";

import "./Register.scss";

const Register = () => {
  const navigate = useNavigate(); // To navigate to the login page
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Snackbar state
  const [loading, setLoading] = useState(false); // Loading state

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, "Username must be at least 3 characters")
        .required("Username is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      setLoading(true); // Start loading
      try {
        await axios.post(
          `https://backend-chat-app-qoti.onrender.com/auth/register`,
          values
        );
        setSnackbarOpen(true); // Show success snackbar
        resetForm();

        // Navigate to login page after a delay
        setTimeout(() => {
          setLoading(false); // Stop loading
          navigate("/login");
        }, 2000); // Adjust the delay as needed
      } catch (error) {
        console.error("Registration Error:", error);
        setLoading(false); // Stop loading
        alert(error.response?.data?.message || "Registration failed!");
      }
    },
  });

  // Close Snackbar handler
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="register-container">
      <h1>Create an Account</h1>
      <form onSubmit={formik.handleSubmit} className="register-form">
        {/* Username Field */}
        <TextField
          fullWidth
          id="username"
          name="username"
          label="Username"
          variant="outlined"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
        />

        {/* Email Field */}
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

        {/* Password Field */}
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

        {/* Confirm Password Field */}
        <TextField
          fullWidth
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          variant="outlined"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.confirmPassword &&
            Boolean(formik.errors.confirmPassword)
          }
          helperText={
            formik.touched.confirmPassword && formik.errors.confirmPassword
          }
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
          className="register-button"
          disabled={loading} // Disable button when loading
          variant="contained"
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Register"}
        </Button>

        {/* Navigation to login page */}
        <div className="login-redirect">
          Already have an account?{" "}
          <Link to="/login" className="login-link">
            Login here
          </Link>
        </div>
      </form>

      {/* Snackbar for Success */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: "100%" }}>
          Registration Success! Redirecting to Login...
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Register;
