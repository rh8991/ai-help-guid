import React from "react";
import "./Footer.css";
import technodaLogo from "../assets/technoda_logo.png";

export default function Footer({ children }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="app-footer">
      <p>© כל הזכויות שמורות לטכנודע חדרה {currentYear}</p>
      <a href="https://www.technoda.org.il/" target="_blank" rel="noopener noreferrer">
        <img className="logo-icon" src={technodaLogo} alt="טכנודע לוגו" />
      </a>
      {children && <div className="footer-admin">{children}</div>}
    </footer>
  );
}
