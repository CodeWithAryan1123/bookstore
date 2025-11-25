import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="notfound-page">
      <div className="container">
        <div className="notfound-content">
          <div className="notfound-icon">
            <i className="fa-solid fa-book-open-reader"></i>
          </div>
          <h1 className="notfound-title">404</h1>
          <h2 className="notfound-subtitle">Page Not Found</h2>
          <p className="notfound-message">
            Oops! Looks like this page has been checked out. 
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="notfound-actions">
            <Link to="/" className="btn btn-primary">
              <i className="fa-solid fa-home"></i> Go Home
            </Link>
            <Link to="/books" className="btn btn-outline">
              <i className="fa-solid fa-book"></i> Browse Books
            </Link>
          </div>
          <div className="notfound-suggestions">
            <h3>You might also like:</h3>
            <div className="suggestion-links">
              <Link to="/bestsellers">Bestsellers</Link>
              <Link to="/about">About Us</Link>
              <Link to="/contact">Contact</Link>
              <Link to="/faq">FAQ</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
