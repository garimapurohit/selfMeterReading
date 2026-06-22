import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header__brand">
        <span className="header__logo" aria-hidden="true">⚡</span>
        <span className="header__company">Tata Power</span>
      </div>
      <h1 className="header__title">Self Meter Reading System</h1>
    </header>
  );
};

export default Header;