import React from "react";
import "./HowItWorks.css";
import otpIcon from "../../assets/howitworksotp.png";
import registerIcon from "../../assets/HowItworkregister.png";
import uploadIcon from "../../assets/HowItWorksImgUpload.png";
import submitIcon from "../../assets/howItWorkssubmitsucess.png";

const steps = [
  {
    title: "Register",
    description: "Register with your email address to securely access the Self Meter Reading Portal.",
    icon: registerIcon,
    circle: "1",
  },
  {
    title: "Login with OTP",
    description: "Log in securely using the OTP sent to your registered email.",
    icon: otpIcon,
    circle: "2",
  },
  {
    title: "Upload Meter Reading",
    description: " Upload your meter image and enter the required meter reading details for verification.",
    icon: uploadIcon,
    circle: "3",
  },
  {
    title: "Submission Successful",
    description: "Your meter reading has been securely recorded and submitted successfully.",
    icon: submitIcon,
    circle: "4",
  },
];

export default function HowItWorks(){
  return (
    <section className="how">
      <div className="container how__container">
        <div className="how__header">
          <h2 className="section__title">
            How It <span>Works</span>
          </h2>
          <p className="how__subtitle">Four simple steps required to submit your meter readings.</p>
        </div>

        <div className="how__timeline">
          {steps.map((step) => (
            <div className="how__step" key={step.title}>
              <div className="how__icon-wrap">
                <img src={step.icon} alt={step.title} className="how__icon" />
                <span className="how__step-number">{step.circle}</span>
              </div>
              <div className="how__card">
                <div className="how__card-number">0{step.circle}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
