import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrderContext';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const { user, logout, updateUser } = useAuth();
  const { wishlist } = useCart();
  const { orders, getOrderStats } = useOrders();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'profile');
  const [isEditing, setIsEditing] = useState(false);
  
  // Helper to format address
  const formatAddress = (address) => {
    if (!address) return '';
    if (typeof address === 'string') return address;
    // If address is an object (from checkout)
    const parts = [
      address.address1,
      address.address2,
      address.city,
      address.state,
      address.pincode
    ].filter(Boolean);
    return parts.join(', ');
  };
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: formatAddress(user?.address)
  });

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  if (!user) {
    navigate('/login');
    return null;
  }

  const stats = getOrderStats();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(formData);
    setIsEditing(false);
    showToast('Profile updated successfully!');
  };

  const showToast = (message) => {
    const toast = document.createElement('div');
    toast.className = 'toast success';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: '#FFA500',
      delivered: '#4CAF50',
      cancelled: '#F44336'
    };
    return colors[status] || '#666';
  };

  return (
    <div className="profile-page">
      <div className="container">
        <div className="profile-header">
          <div className="profile-avatar-large">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="profile-header-info">
            <h1>{user.name}</h1>
            <p>{user.email}</p>
            <div className="profile-stats">
              <div className="stat-item">
                <span className="stat-number">{stats.total}</span>
                <span className="stat-label">Total Orders</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{wishlist.length}</span>
                <span className="stat-label">Wishlist Items</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">5</span>
                <span className="stat-label">Wishlist Items</span>
              </div>
            </div>
          </div>
        </div>

        <div className="profile-content">
          <div className="profile-sidebar">
            <nav className="profile-nav">
              <button 
                className={`profile-nav-btn ${activeTab === 'profile' ? 'active' : ''}`}
                onClick={() => setActiveTab('profile')}
              >
                <i className="fa-solid fa-user"></i> Profile Information
              </button>
              <button 
                className={`profile-nav-btn ${activeTab === 'orders' ? 'active' : ''}`}
                onClick={() => setActiveTab('orders')}
              >
                <i className="fa-solid fa-box"></i> Order History
              </button>
              <button 
                className={`profile-nav-btn ${activeTab === 'wishlist' ? 'active' : ''}`}
                onClick={() => setActiveTab('wishlist')}
              >
                <i className="fa-solid fa-heart"></i> Wishlist
              </button>
              <button className="profile-nav-btn logout-btn" onClick={logout}>
                <i className="fa-solid fa-right-from-bracket"></i> Logout
              </button>
            </nav>
          </div>

          <div className="profile-main">
            {activeTab === 'profile' && (
              <div className="profile-section">
                <div className="section-header">
                  <h2>Profile Information</h2>
                  <button 
                    className="btn btn-outline"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                  </button>
                </div>

                {isEditing ? (
                  <form onSubmit={handleSubmit} className="profile-form">
                    <div className="form-group">
                      <label>Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div className="form-group">
                    <label>Address</label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      rows="3"
                      placeholder="Enter your address"
                    />
                  </div>

                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                </form>
              ) : (
                <div className="profile-info-display">
                  <div className="info-row">
                    <span className="info-label">Full Name:</span>
                    <span className="info-value">{user.name}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Email:</span>
                    <span className="info-value">{user.email}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Phone:</span>
                    <span className="info-value">{user.phone || 'Not provided'}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Address:</span>
                    <span className="info-value">{formatAddress(user.address) || 'Not provided'}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Member Since:</span>
                    <span className="info-value">
                      {new Date(user.createdAt).toLocaleDateString('en-US', { 
                        month: 'long', 
                        year: 'numeric' 
                      })}
                    </span>
                  </div>
                </div>
              )}
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="profile-section">
                <h2>Order History</h2>
                {orders.length === 0 ? (
                  <div className="empty-state">
                    <i className="fa-solid fa-box" style={{fontSize: '48px', color: 'var(--text-secondary)'}}></i>
                    <p>No orders yet</p>
                    <Link to="/books" className="btn btn-primary">Start Shopping</Link>
                  </div>
                ) : (
                  <div className="orders-list">
                    {orders.map(order => (
                      <div key={order.id} className="order-card">
                        <div className="order-header">
                          <div>
                            <h3>Order #{order.id.slice(-6)}</h3>
                            <p className="order-date">{formatDate(order.createdAt)}</p>
                          </div>
                          <span 
                            className="order-status"
                            style={{color: getStatusColor(order.status)}}
                          >
                            {order.status.toUpperCase()}
                          </span>
                        </div>
                        <div className="order-items-preview">
                          {order.items.slice(0, 3).map((item, index) => (
                            <div key={index} className="order-item-mini">
                              <img src={item.image} alt={item.title} />
                            </div>
                          ))}
                          {order.items.length > 3 && (
                            <div className="order-item-more">+{order.items.length - 3}</div>
                          )}
                        </div>
                        <div className="order-details">
                          <span>{order.items.length} items</span>
                          <span className="order-total">₹{order.total.toFixed(2)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'wishlist' && (
              <div className="profile-section">
                <h2>My Wishlist</h2>
                {wishlist.length === 0 ? (
                  <div className="empty-state">
                    <i className="fa-solid fa-heart" style={{fontSize: '48px', color: 'var(--text-secondary)'}}></i>
                    <p>Your wishlist is empty</p>
                    <Link to="/books" className="btn btn-primary">Browse Books</Link>
                  </div>
                ) : (
                  <div className="wishlist-grid">
                    {wishlist.map(book => (
                      <Link to={`/book/${book.id}`} key={book.id} className="wishlist-book-card">
                        <img src={book.image} alt={book.title} />
                        <div className="wishlist-book-info">
                          <h4>{book.title}</h4>
                          <p>{book.author}</p>
                          <span className="price">₹{book.price}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
