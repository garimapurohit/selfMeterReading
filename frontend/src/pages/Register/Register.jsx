import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import TataPowerLogo from "../../assets/TataPowerLogo.png";
import api from "../../services/api";

const Register = () => {
  // Form state
  const [caNumber, setCaNumber] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  // UI state
  const [otpSent, setOtpSent] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  // CA Number it will accept..digits only
  const handleCaNumberChange = (e) => {
    const value = e.target.value;

    if (/^\d*$/.test(value)) {
      setCaNumber(value);
      setErrors((prev) => ({
        ...prev,
        caNumber: "",
      }));
    }
  };
// it handles the email change and clears ay error related to the email
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

    if (!caNumber.trim()) {
      newErrors.caNumber = "CA Number is required.";
    }

    if (!email.trim()) {
      newErrors.email = "Email Address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Enter a valid email address.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    try {
      const response = await api.post("/auth/register", {
        caNumber,
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

  // Verify OTP
  const handleVerifyOtp = async (e) => {
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
      const response = await api.post("/auth/verify-otp", {
        caNumber,
        email,
        otp,
      });

      alert(response.data.message);

      navigate("/");

    } catch (err) {
      alert(
        err.response?.data?.message ||
          "OTP Verification Failed."
      );
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">

        {/* Brand Header */}
        <div className="register-card__brand">
          <img src={TataPowerLogo} alt="Tata Power" className="register-card__logo" />
          <h3>Self Meter Reading</h3>
        </div>

        {/* Title */}
        <div className="register-card__intro">
          <h2 className="register-card__title">
            Create Your Account
          </h2>

          <p className="register-card__subtitle">
            Register to submit your monthly electricity meter reading.
          </p>
        </div>

        {/* Registration Form */}
        <form
          className="register-form"
          onSubmit={handleSendOtp}
          noValidate
        >
          {/* CA Number */}
          <div className="register-form__group">
            <label
              className="register-form__label"
              htmlFor="caNumber"
            >
              CA Number
            </label>

            <input
              className={`register-form__input ${
                errors.caNumber
                  ? "register-form__input--error"
                  : ""
              }`}
              type="text"
              id="caNumber"
              placeholder="Enter CA Number"
              value={caNumber}
              onChange={handleCaNumberChange}
              disabled={otpSent}
            />

            {errors.caNumber && (
              <span className="register-form__error">
                {errors.caNumber}
              </span>
            )}
          </div>

          {/* Email */}
          <div className="register-form__group">
            <label
              className="register-form__label"
              htmlFor="email"
            >
              Email Address
            </label>

            <input
              className={`register-form__input ${
                errors.email
                  ? "register-form__input--error"
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
              <span className="register-form__error">
                {errors.email}
              </span>
            )}
          </div>

          {!otpSent && (
            <button
              type="submit"
              className="register-form__btn"
            >
              Send OTP →
            </button>
          )}
        </form>

        {/* OTP Section */}
        {otpSent && (
          <form
            className="otp-section"
            onSubmit={handleVerifyOtp}
            noValidate
          >
            <div className="register-form__group">
              <label
                className="register-form__label"
                htmlFor="otp"
              >
                OTP Verification
              </label>

              <input
                className={`register-form__input ${
                  errors.otp
                    ? "register-form__input--error"
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
                <span className="register-form__error">
                  {errors.otp}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="register-form__btn"
            >
              Verify OTP →
            </button>
          </form>
        )}

        <div className="register-divider">
          <span>Secure Authentication</span>
        </div>

        {/* Footer */}
        <p className="register-card__footer-text">
          Already have an account?{" "}
          <Link
            to="/Login"
            className="register-card__login-link"
          >
            Login
          </Link>
        </p>

        </div>
      </div>
  );
};

export default Register;
