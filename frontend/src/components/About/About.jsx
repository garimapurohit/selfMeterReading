import React from "react";
import "./About.css";
import readingForm from "../../assets/readingForm.png";

export default function About(){
  return (
    <section className="about">
      <div className="about__inner container">
        <div className="about__text">
          <h2 className="section__title">About the <span> Portal</span></h2>
          <p className="lead">The Self Meter Reading Portal is a digital platform that enables consumers to submit their electricity meter readings securely and conveniently from anywhere. With OTP-based authentication and image upload verification, the portal ensures a fast, transparent, and hassle-free reading submission process. Our goal is to simplify meter reading while improving accuracy and user experience.</p>
        </div>

        <div className="about__visual">
          <div className="about__visual-card">
            <img src={readingForm} alt="Reading form illustration" />
          </div>
        </div>
      </div>
    </section>
  )
}
