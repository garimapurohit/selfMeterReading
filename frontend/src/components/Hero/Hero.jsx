import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../../services/auth";
import "./Hero.css";
import meterImg from "../../assets/meterReadingWomen.png";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="hero">
      <div className="hero__container">
        <div className="hero__content">
          <h1 className="hero__title">Submit Your <span>Electricity Meter</span> Reading Online</h1>
          <p className="hero__subtitle">A secure, fast, and paperless platform that lets consumers submit monthly electricity meter readings.</p>
          <div className="hero__actions">
            <button
              className="cta cta--primary"
              onClick={() => navigate(isAuthenticated() ? "/reading" : "/login")}
            >
               Submit Reading
            </button>
          </div>
        </div>
        <div className="hero__visual">
          <img src={meterImg} alt="Meter reading illustration" className="hero__image" />
        </div>
      </div>
    </section>
  );
}
