import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import api from "../../services/api";

// Login Page
// Self Meter Reading Portal — Account Login

const Login = () => {
  // Form state
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  // UI state
  const [otpSent, setOtpSent] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  // Email
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrors((prev) => ({
      ...prev,
      email: "",
    }));
  };

  // OTP
  const handleOtpChange = (e) => {
    const value = e.target.value;

    if (/^\d{0,6}$/.test(value)) {
      setOtp(value);

      setErrors((prev) => ({
        ...prev,
        otp: "",
      }));
    }
  };

  // Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email Address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Enter a valid email address.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    try {
      const response = await api.post("/auth/login", {
        email,
      });

      alert(response.data.message);

      setOtpSent(true);

    } catch (err) {
      alert(
        err.response?.data?.message ||
        "Failed to send OTP."
      );
    }
  };

  // Verify Login
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!otp.trim()) {
      setErrors((prev) => ({
        ...prev,
        otp: "OTP is required.",
      }));
      return;
    }

    if (otp.length !== 6) {
      setErrors((prev) => ({
        ...prev,
        otp: "OTP must be 6 digits.",
      }));
      return;
    }

    try {
      const response = await api.post("/auth/verify-login", {
        email,
        otp,
      });

      alert(response.data.message);

      console.log("Logged in User:", response.data.data);

      // Navigate to Meter Reading page
      navigate("/reading");

    } catch (err) {
      alert(
        err.response?.data?.message ||
        "Login Failed."
      );
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">

        {/* Brand */}
        <div className="login-card__brand">
          <p className="login-card__portal-name">
            Self Meter Reading Portal
          </p>
        </div>

        {/* Title */}
        <div className="login-card__intro">
          <h2 className="login-card__title">
            Login
          </h2>

          <p className="login-card__subtitle">
            Login to submit your monthly electricity meter reading.
          </p>
        </div>

        {/* Login Form */}
        <form
          className="login-form"
          onSubmit={handleSendOtp}
          noValidate
        >
          <div className="login-form__group">
            <label
              className="login-form__label"
              htmlFor="email"
            >
              Email Address
            </label>

            <input
              className={`login-form__input ${
                errors.email
                  ? "login-form__input--error"
                  : ""
              }`}
              type="email"
              id="email"
              placeholder="Enter Email Address"
              value={email}
              onChange={handleEmailChange}
              disabled={otpSent}
            />

            {errors.email && (
              <span className="login-form__error">
                {errors.email}
              </span>
            )}
          </div>

          {!otpSent && (
            <button
              type="submit"
              className="login-form__btn"
            >
              Send OTP
            </button>
          )}
        </form>

        {/* OTP Section */}
        {otpSent && (
          <form
            className="otp-section"
            onSubmit={handleLogin}
            noValidate
          >
            <div className="login-form__group">
              <label
                className="login-form__label"
                htmlFor="otp"
              >
                OTP Verification
              </label>

              <input
                className={`login-form__input ${
                  errors.otp
                    ? "login-form__input--error"
                    : ""
                }`}
                type="text"
                id="otp"
                placeholder="Enter OTP"
                value={otp}
                onChange={handleOtpChange}
                maxLength={6}
                autoFocus
              />

              {errors.otp && (
                <span className="login-form__error">
                  {errors.otp}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="login-form__btn"
            >
              Login
            </button>
          </form>
        )}

        {/* Footer */}
        <p className="login-card__footer-text">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="login-card__register-link"
          >
            Register
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;