import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import TataPowerLogo from "../../assets/TataPowerLogo.png";

import api from "../../services/api";
import { setAuthenticated } from "../../services/auth";

import "./Login.css";

const Login = () => {

  /* -----------------------------
      STATES
  ------------------------------*/

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const [otpSent, setOtpSent] = useState(false);

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  /* -----------------------------
      EMAIL CHANGE
  ------------------------------*/

  const handleEmailChange = (e) => {

    setEmail(e.target.value);

    setErrors((prev) => ({
      ...prev,
      email: "",
    }));

  };

  /* -----------------------------
      OTP CHANGE
  ------------------------------*/

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

  /* -----------------------------
      SEND OTP
  ------------------------------*/

  const handleSendOtp = async (e) => {

    e.preventDefault();

    const newErrors = {};

    if (!email.trim()) {

      newErrors.email =
        "Email Address is required.";

    }

    else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {

      newErrors.email =
        "Enter a valid email address.";

    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0)
      return;

    try {

      const response = await api.post(
        "/auth/login",
        {
          email,
        }
      );

      alert(response.data.message);

      setOtpSent(true);

    } catch (err) {

      alert(
        err.response?.data?.message ||
          "Failed to send OTP."
      );

    }

  };

  /* -----------------------------
      VERIFY LOGIN
  ------------------------------*/

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

      const response = await api.post(
        "/auth/verify-login",
        {
          email,
          otp,
        }
      );

      alert(response.data.message);

      setAuthenticated();

      console.log(
        "Logged in User:",
        response.data.data
      );

      navigate("/reading");

    } catch (err) {

      alert(
        err.response?.data?.message ||
          "Login Failed."
      );

    }

  };

  /* -----------------------------
      UI
  ------------------------------*/

  return (

    <>


      <main className="login-page">

        <div className="login-container">

          {/* LEFT PANEL removed for a focused login view */}

          {/* RIGHT PANEL */}

          <section className="login-right">

            <div className="login-card">

              <div className="login-card__brand">
                <img src={TataPowerLogo} alt="Tata Power" className="register-card__logo login-card__logo" />
                <div>
                  <h3>
                    Self Meter Reading
                  </h3>

                  <p>
                    Electricity Distribution Portal
                  </p>

                </div>
              </div>

              <div className="login-card__intro">

                <h2>
                  Login with OTP
                </h2>

                <p>
                  Enter your registered email to continue.
                </p>

              </div>
              {/* EMAIL FORM */}

<form
  className="login-form"
  onSubmit={handleSendOtp}
  noValidate
>

  <div className="login-form__group">

    <label htmlFor="email">
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
      Send OTP →
    </button>

  )}

</form>

{/* OTP SECTION */}

{otpSent && (

  <form
    className="otp-section"
    onSubmit={handleLogin}
    noValidate
  >

    <div className="otp-header">

      <h3>
        OTP Verification
      </h3>

      <p>
        Enter the 6-digit OTP sent to your email.
      </p>

    </div>

    <div className="login-form__group">

      <label htmlFor="otp">
        OTP
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
      Login →
    </button>

  </form>

)}

<div className="login-divider">
  <span>
    Secure Authentication
  </span>
</div>

<p className="login-card__footer-text">

  New here?

  <Link
    to="/register"
    className="login-card__register-link"
  >
    Create Account →
  </Link>

</p>
            </div>
          </section>

        </div>

      </main>


    </>
  );

};

export default Login;