import React from 'react';
import { Link } from 'react-router-dom';
import './ErrorBoundary.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo
    });
    
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error caught by boundary:', error, errorInfo);
    }
    
    // In production, you would send this to an error reporting service
    // logErrorToService(error, errorInfo);
  }

  handleReset = () => {
    this.setState({ 
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary-page">
          <div className="container">
            <div className="error-boundary-content">
              <div className="error-icon">
                <i className="fa-solid fa-triangle-exclamation"></i>
              </div>
              <h1>Oops! Something went wrong</h1>
              <p className="error-message">
                We're sorry, but something unexpected happened. 
                Don't worry, our team has been notified and we're working on it.
              </p>
              
              <div className="error-actions">
                <button 
                  onClick={this.handleReset} 
                  className="btn btn-primary"
                >
                  <i className="fa-solid fa-rotate-right"></i> Try Again
                </button>
                <Link to="/" className="btn btn-outline">
                  <i className="fa-solid fa-home"></i> Go Home
                </Link>
              </div>

              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="error-details">
                  <summary>Error Details (Development Only)</summary>
                  <div className="error-stack">
                    <h3>Error Message:</h3>
                    <pre>{this.state.error.toString()}</pre>
                    <h3>Component Stack:</h3>
                    <pre>{this.state.errorInfo?.componentStack}</pre>
                  </div>
                </details>
              )}

              <div className="helpful-links">
                <h3>You might want to:</h3>
                <div className="link-grid">
                  <Link to="/books">
                    <i className="fa-solid fa-book"></i>
                    Browse Books
                  </Link>
                  <Link to="/bestsellers">
                    <i className="fa-solid fa-star"></i>
                    Bestsellers
                  </Link>
                  <Link to="/contact">
                    <i className="fa-solid fa-envelope"></i>
                    Contact Us
                  </Link>
                  <Link to="/faq">
                    <i className="fa-solid fa-circle-question"></i>
                    FAQ
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
