import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './Header.css';

const Header = () => {
  const { user, logout } = useAuth();
  const { getCartCount } = useCart();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/books?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  React.useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setShowUserMenu(false);
  };

  return (
    <header className="header">
      <nav className="navbar">
        <div className="container">
          <div className="navbar-content">
            <Link to="/" className="logo">
              <span className="logo-icon"><i className="fa-solid fa-book"></i></span>
              <div className="logo-content">
                <span className="logo-text">Once Upon A Bookshelf</span>
                <span className="logo-tagline">Books for Curious Minds</span>
              </div>
            </Link>

            <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
              <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link to="/books" onClick={() => setIsMenuOpen(false)}>Books</Link>
              <Link to="/bestsellers" onClick={() => setIsMenuOpen(false)}>Bestsellers</Link>
            </div>

            <div className="navbar-right">
              <form onSubmit={handleSearch} className="search-box">
                <input 
                  type="text" 
                  placeholder="Search books..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="search-btn">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </form>

              <Link to="/wishlist" className="icon-btn" title="Wishlist">
                <i className="fa-regular fa-heart"></i>
              </Link>

              <Link to="/cart" className="icon-btn cart-btn" title="Cart">
                <i className="fa-solid fa-cart-shopping"></i>
                {getCartCount() > 0 && (
                  <span className="badge">{getCartCount()}</span>
                )}
              </Link>

              <button 
                className="icon-btn theme-toggle" 
                onClick={toggleTheme}
                title="Toggle theme"
              >
                {theme === 'light' ? <i className="fa-solid fa-moon"></i> : <i className="fa-solid fa-sun"></i>}
              </button>

              {user ? (
                <div className="user-menu">
                  <button 
                    className="user-btn"
                    onClick={() => setShowUserMenu(!showUserMenu)}
                  >
                    <span className="user-avatar">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                    <span className="user-name">{user.name}</span>
                  </button>
                  {showUserMenu && (
                    <div className="user-dropdown">
                      <Link to="/profile?tab=profile" onClick={() => setShowUserMenu(false)}>
                        <i className="fa-solid fa-user"></i> Profile
                      </Link>
                      <Link to="/profile?tab=orders" onClick={() => setShowUserMenu(false)}>
                        <i className="fa-solid fa-box"></i> Orders
                      </Link>
                      <button onClick={handleLogout}>
                        <i className="fa-solid fa-right-from-bracket"></i> Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/login" className="btn btn-primary login-btn">
                  Login
                </Link>
              )}

              <button 
                className="menu-toggle"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <i className="fa-solid fa-xmark"></i> : <i className="fa-solid fa-bars"></i>}
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
