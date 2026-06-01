import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h2>Dot & Key</h2>
          <p>
            Your trusted skincare store for beauty, glow, and daily self-care.
          </p>
        </div>

        <div className="footer-section">
          <h3>Shop</h3>
          <Link to="/userhome">Home</Link>
          <Link to="/cart-info">Cart</Link>
          <Link to="/faq">FAQ</Link>
        </div>

        <div className="footer-section">
          <h3>Company</h3>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/support">Support</Link>
        </div>

        <div className="footer-section">
          <h3>Help</h3>
          <Link to="/shipping">Shipping</Link>
          <Link to="/returns">Returns</Link>
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Terms</Link>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 Dot & Key. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;