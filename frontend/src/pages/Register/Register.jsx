import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";

//  Register Page 
// Account Registration
const Register = () => {
  //  Form state ─
  const [caNumber, setCaNumber] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  //  UI state ─
  const [otpSent, setOtpSent] = useState(false);
  const [errors, setErrors] = useState({});

  // CA Number — digits only
  const handleCaNumberChange = (e) => {
    const value = e.target.value;
    // Strip any non-numeric characters as the user types
    if (/^\d*$/.test(value)) {
      setCaNumber(value);
      setErrors((prev) => ({ ...prev, caNumber: "" }));
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrors((prev) => ({ ...prev, email: "" }));
  };

  // OTP — digits only, max 6
  const handleOtpChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,6}$/.test(value)) {
      setOtp(value);
      setErrors((prev) => ({ ...prev, otp: "" }));
    }
  };

  // Validate CA Number + Email, then reveal OTP section
  const handleSendOtp = (e) => {
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

    // Stop here if validation fails
    if (Object.keys(newErrors).length > 0) return;

    // No backend yet — just reveal the OTP section
    setOtpSent(true);
  };

  // Validate OTP on Verify click
  const handleVerifyOtp = (e) => {
    e.preventDefault();

    if (!otp.trim()) {
      setErrors((prev) => ({ ...prev, otp: "OTP is required." }));
      return;
    }

    if (otp.length !== 6) {
      setErrors((prev) => ({ ...prev, otp: "OTP must be 6 digits." }));
      return;
    }

    // Placeholder  backend verification will go here later...
    console.log("Verifying OTP:", otp);
  };

  return (
    <div className="register-page">
      <div className="register-card">

        {/*  Brand Header  */}
        <div className="register-card__brand">
          <p className="register-card__portal-name">
            Self Meter Reading Portal
          </p>
        </div>

        {/*  Title Section ─ */}
        <div className="register-card__intro">
          <h2 className="register-card__title">Create Your Account</h2>
          <p className="register-card__subtitle">
            Register to submit your monthly electricity meter reading.
          </p>
        </div>

        {/*  Registration Form ─ */}
        <form className="register-form" onSubmit={handleSendOtp} noValidate>

          {/* CA Number */}
          <div className="register-form__group">
            <label className="register-form__label" htmlFor="caNumber">
              CA Number
            </label>

            <input
              className={`register-form__input ${
                errors.caNumber ? "register-form__input--error" : ""
              }`}
              type="text"
              id="caNumber"
              inputMode="numeric"
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

          {/* Email Address */}
          <div className="register-form__group">
            <label className="register-form__label" htmlFor="email">
              Email Address
            </label>

            <input
              className={`register-form__input ${
                errors.email ? "register-form__input--error" : ""
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

          {/* Send OTP button — hidden once OTP section is shown */}
          {!otpSent && (
            <button type="submit" className="register-form__btn">
              Send OTP
            </button>
          )}
        </form>

        {/*  OTP Section ─ */}
        {/* Conditionally rendered with a slide/fade animation */}
        {otpSent && (
          <form
            className="otp-section"
            onSubmit={handleVerifyOtp}
            noValidate
          >
            <div className="register-form__group">
              <label className="register-form__label" htmlFor="otp">
                OTP Verification
              </label>

              <input
                className={`register-form__input ${
                  errors.otp ? "register-form__input--error" : ""
                }`}
                type="text"
                id="otp"
                inputMode="numeric"
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

            <button type="submit" className="register-form__btn">
              Verify OTP
            </button>
          </form>
        )}

        {/*  Footer Link ─ */}
        <p className="register-card__footer-text">
          Already have an account?{" "}
          <Link
            to="/"
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