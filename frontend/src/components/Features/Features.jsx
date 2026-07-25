import React from "react";
import "./Features.css";
import otpIcon from "../../assets/otpAuthh.png";
import cloudIcon from "../../assets/cloudImagee.png";
import instantIcon from "../../assets/InstantConfirmation.png";

const features = [
  {
    id: 1,
    icon: otpIcon,
    title: "Secure OTP Authentication",
    desc:
      "Verify your identity instantly with email-based OTP authentication for secure account access.",
  },
  {
    id: 2,
    icon: cloudIcon,
    title: "Smart reading",
    desc:
      "Upload your meter image and submit accurate electricity readings in one seamless process.",
  },
  {
    id: 3,
    icon: instantIcon,
    title: "Fast Reading Submission",
    desc:
      "Complete your reading submission easily.",
  },
];

export default function Features() {
  return (
    <section className="features">
      <div className="container">
        <h1 className="features__headline">What We to go <span>Offer</span></h1>
        <p className="features__sub">Our platform combines security, simplicity, and speed to make meter reading submission effortless.</p>

        <div className="features__grid">
          {features.map((f) => (
            <article className="feature-card" key={f.id}>
              <div className="feature-icon">
                <img src={f.icon} alt={f.title} />
              </div>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-desc">{f.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
