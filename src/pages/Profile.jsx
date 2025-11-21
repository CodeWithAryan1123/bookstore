import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });

  if (!user) {
    navigate('/login');
    return null;
  }

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

  const orders = [
    {
      id: 'ORD-12345',
      date: '2024-11-15',
      status: 'Delivered',
      total: 5697,
      items: 3
    },
    {
      id: 'ORD-12346',
      date: '2024-11-10',
      status: 'In Transit',
      total: 3598,
      items: 2
    },
    {
      id: 'ORD-12347',
      date: '2024-11-05',
      status: 'Delivered',
      total: 7496,
      items: 4
    }
  ];

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
                <span className="stat-number">12</span>
                <span className="stat-label">Books Purchased</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">8</span>
                <span className="stat-label">Reviews Written</span>
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
              <button className="profile-nav-btn active">
                <i className="fa-solid fa-user"></i> Profile Information
              </button>
              <button className="profile-nav-btn">
                <i className="fa-solid fa-box"></i> Order History
              </button>
              <button className="profile-nav-btn">
                <i className="fa-solid fa-heart"></i> Wishlist
              </button>
              <button className="profile-nav-btn">
                <i className="fa-solid fa-star"></i> Reviews
              </button>
              <button className="profile-nav-btn">
                <i className="fa-solid fa-gear"></i> Settings
              </button>
              <button className="profile-nav-btn logout-btn" onClick={logout}>
                🚪 Logout
              </button>
            </nav>
          </div>

          <div className="profile-main">
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

            <div className="profile-section">
              <h2>Recent Orders</h2>
              <div className="orders-list">
                {orders.map(order => (
                  <div key={order.id} className="order-card">
                    <div className="order-header">
                      <div>
                        <h3>Order {order.id}</h3>
                        <p className="order-date">{new Date(order.date).toLocaleDateString()}</p>
                      </div>
                      <span className={`order-status ${order.status.toLowerCase().replace(' ', '-')}`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="order-details">
                      <span>{order.items} items</span>
                      <span className="order-total">₹{order.total}</span>
                    </div>
                    <button className="btn btn-light">View Details</button>
                  </div>
                ))}
              </div>
            </div>

            <div className="profile-section">
              <h2>Account Security</h2>
              <div className="security-section">
                <div className="security-item">
                  <div className="security-info">
                    <h3>Password</h3>
                    <p>Last changed 3 months ago</p>
                  </div>
                  <button className="btn btn-outline">Change Password</button>
                </div>
                <div className="security-item">
                  <div className="security-info">
                    <h3>Two-Factor Authentication</h3>
                    <p>Add an extra layer of security</p>
                  </div>
                  <button className="btn btn-outline">Enable</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
