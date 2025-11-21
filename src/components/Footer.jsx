import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col">
              <h3 className="footer-title">
                <span className="logo-icon"><i className="fa-solid fa-book"></i></span> Once Upon A Bookshelf
              </h3>
              <p className="footer-desc">
                Your literary paradise. Discover, explore, and immerse yourself in the world of books.
              </p>
              <div className="social-links">
                <a href="#" className="social-link"><i className="fa-brands fa-facebook"></i></a>
                <a href="#" className="social-link"><i className="fa-brands fa-twitter"></i></a>
                <a href="#" className="social-link"><i className="fa-brands fa-instagram"></i></a>
                <a href="#" className="social-link"><i className="fa-brands fa-linkedin"></i></a>
              </div>
            </div>

            <div className="footer-col">
              <h4>Quick Links</h4>
              <ul className="footer-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/books">Books</Link></li>
                <li><Link to="/bestsellers">Bestsellers</Link></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Categories</h4>
              <ul className="footer-links">
                <li><Link to="/books?category=Fiction">Fiction</Link></li>
                <li><Link to="/books?category=Self-Help">Self-Help</Link></li>
                <li><Link to="/books?category=Business">Business</Link></li>
                <li><Link to="/books?category=Science">Science Fiction</Link></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Customer Service</h4>
              <ul className="footer-links">
                <li><Link to="/contact">Contact Us</Link></li>
                <li><Link to="/faq">FAQ</Link></li>
                <li><Link to="/shipping">Shipping Info</Link></li>
                <li><Link to="/returns">Returns</Link></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Newsletter</h4>
              <p className="newsletter-text">Subscribe to get special offers and updates!</p>
              <div className="newsletter-form">
                <input type="email" placeholder="Your email" />
                <button className="btn btn-accent">Subscribe</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content">
            <p>&copy; 2024 Once Upon A Bookshelf. All rights reserved.</p>
            <div className="footer-bottom-links">
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms of Service</Link>
              <Link to="/cookies">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
