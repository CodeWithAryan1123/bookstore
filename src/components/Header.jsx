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
  const [showMobileActions, setShowMobileActions] = useState(false);
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

            <button 
              className="menu-toggle"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <i className="fa-solid fa-xmark"></i> : <i className="fa-solid fa-bars"></i>}
            </button>

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

              <div className="desktop-actions">
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
              </div>

              {/* Mobile Search and Actions */}
              <Link to="/wishlist" className="icon-btn mobile-wishlist-btn" title="Wishlist">
                <i className="fa-regular fa-heart"></i>
              </Link>

              <Link to="/cart" className="icon-btn cart-btn mobile-cart-btn" title="Cart">
                <i className="fa-solid fa-cart-shopping"></i>
                {getCartCount() > 0 && (
                  <span className="badge">{getCartCount()}</span>
                )}
              </Link>

              <div className="mobile-actions-menu">
                <button 
                  className="icon-btn mobile-dots"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowMobileActions(!showMobileActions);
                  }}
                  aria-label="More options"
                >
                  <i className="fa-solid fa-ellipsis-vertical"></i>
                </button>
                
                {showMobileActions && (
                  <div 
                    className="mobile-dropdown"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="mobile-search-wrapper">
                      <form 
                        onSubmit={(e) => { 
                          e.preventDefault();
                          handleSearch(e); 
                          setShowMobileActions(false); 
                        }} 
                        className="mobile-search-box"
                      >
                        <input 
                          type="text" 
                          placeholder="Search books..." 
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button type="submit" className="mobile-search-btn">
                          <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                      </form>
                    </div>
                    
                    <button 
                      type="button"
                      className="mobile-menu-item" 
                      onClick={() => { 
                        toggleTheme(); 
                        setTimeout(() => setShowMobileActions(false), 100);
                      }}
                    >
                      <i className={theme === 'light' ? 'fa-solid fa-moon' : 'fa-solid fa-sun'}></i>
                      <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
                    </button>
                    
                    {user ? (
                      <>
                        <Link 
                          to="/profile?tab=profile" 
                          className="mobile-menu-item" 
                          onClick={() => setShowMobileActions(false)}
                        >
                          <i className="fa-solid fa-user"></i>
                          <span>Profile</span>
                        </Link>
                        <Link 
                          to="/profile?tab=orders" 
                          className="mobile-menu-item" 
                          onClick={() => setShowMobileActions(false)}
                        >
                          <i className="fa-solid fa-box"></i>
                          <span>Orders</span>
                        </Link>
                        <button 
                          type="button"
                          className="mobile-menu-item" 
                          onClick={() => { 
                            handleLogout(); 
                            setShowMobileActions(false);
                          }}
                        >
                          <i className="fa-solid fa-right-from-bracket"></i>
                          <span>Logout</span>
                        </button>
                      </>
                    ) : (
                      <Link 
                        to="/login" 
                        className="mobile-menu-item" 
                        onClick={() => setShowMobileActions(false)}
                      >
                        <i className="fa-solid fa-right-to-bracket"></i>
                        <span>Login</span>
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div 
          className="mobile-overlay active"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
      
      {/* Mobile Actions Overlay */}
      {showMobileActions && (
        <div 
          className="mobile-overlay active"
          onClick={(e) => {
            e.stopPropagation();
            setShowMobileActions(false);
          }}
        />
      )}
    </header>
  );
};

export default Header;
