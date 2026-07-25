import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import TataPowerLogo from "../../assets/TataPowerLogo.png";
import { clearAuthentication, isAuthenticated } from "../../services/auth";
import "./Navbar.css";

const links = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "how-it-works", label: "How It Works" },
];

export default function Navbar() {
  const [active, setActive] = useState("home");
  const navigate = useNavigate();
  const location = useLocation();
  const loggedIn = isAuthenticated();
  const visibleLinks = links;

  useEffect(() => {
    const sections = visibleLinks.map((l) => document.getElementById(l.id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { root: null, rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => sections.forEach((s) => observer.unobserve(s));
  }, [loggedIn]);

  const handleLogout = () => {
    clearAuthentication();
    navigate("/");
  };

  return (
    <header className="nav">
      <div className="nav__inner">
        <div className="nav__left">
          <div className="nav__logo">
            <img className="nav__logo-icon" src={TataPowerLogo} alt="Tata Power" />
          </div>
        </div>

        <nav className="nav__center">
          <ul className="nav__list">
            {visibleLinks.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  className={`nav__link ${active === l.id ? "active" : ""}`}
                  onClick={(e) => {
                    if (l.id === "home") {
                      e.preventDefault();
                      navigate("/");
                      return;
                    }

                    // handle in-page scroll when on landing, otherwise navigate to landing then scroll
                    e.preventDefault();
                    const targetId = l.id;
                    if (location.pathname === "/") {
                      const el = document.getElementById(targetId);
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    } else {
                      navigate("/");
                      setTimeout(() => {
                        const el = document.getElementById(targetId);
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }, 200);
                    }
                  }}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav__right">
          {loggedIn ? (
            <>
              <button className="nav__btn nav__btn--primary" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <button className="nav__btn nav__btn--outline" onClick={() => navigate("/login")}>Login</button>
              <button className="nav__btn nav__btn--primary" onClick={() => navigate("/register")}>Register</button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
