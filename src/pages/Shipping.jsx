import React from 'react';
import './Shipping.css';

const Shipping = () => {
  return (
    <div className="shipping-page">
      <div className="shipping-hero">
        <div className="container">
          <h1>Shipping Information</h1>
          <p>Everything you need to know about our shipping policies and delivery options</p>
        </div>
      </div>

      <div className="shipping-content">
        <div className="container">
          <div className="content-grid">
            <div className="shipping-options">
              <h2>Shipping Options</h2>
              
              <div className="option-card">
                <div className="option-header">
                  <i className="fa-solid fa-truck"></i>
                  <h3>Standard Shipping</h3>
                </div>
                <div className="option-details">
                  <p className="delivery-time">5-7 Business Days</p>
                  <p className="price">Free on orders over $50</p>
                  <p className="description">Our standard shipping option is reliable and cost-effective for most orders.</p>
                </div>
              </div>

              <div className="option-card">
                <div className="option-header">
                  <i className="fa-solid fa-truck-fast"></i>
                  <h3>Express Shipping</h3>
                </div>
                <div className="option-details">
                  <p className="delivery-time">2-3 Business Days</p>
                  <p className="price">$15.00</p>
                  <p className="description">Need your books quickly? Choose express shipping for faster delivery.</p>
                </div>
              </div>

              <div className="option-card">
                <div className="option-header">
                  <i className="fa-solid fa-plane"></i>
                  <h3>International Shipping</h3>
                </div>
                <div className="option-details">
                  <p className="delivery-time">10-15 Business Days</p>
                  <p className="price">Varies by location</p>
                  <p className="description">We ship to over 100 countries worldwide with reliable international carriers.</p>
                </div>
              </div>

              <div className="option-card">
                <div className="option-header">
                  <i className="fa-solid fa-bolt"></i>
                  <h3>Same-Day Delivery</h3>
                </div>
                <div className="option-details">
                  <p className="delivery-time">Within 24 Hours</p>
                  <p className="price">$25.00</p>
                  <p className="description">Available in select metro areas. Order before 2 PM for same-day delivery.</p>
                </div>
              </div>
            </div>

            <div className="shipping-info-section">
              <div className="info-box">
                <h2>Order Processing</h2>
                <ul>
                  <li>
                    <i className="fa-solid fa-check-circle"></i>
                    Orders are processed within 24 hours on business days
                  </li>
                  <li>
                    <i className="fa-solid fa-check-circle"></i>
                    You'll receive a confirmation email once your order ships
                  </li>
                  <li>
                    <i className="fa-solid fa-check-circle"></i>
                    Tracking information will be provided via email
                  </li>
                  <li>
                    <i className="fa-solid fa-check-circle"></i>
                    Orders placed on weekends ship the following Monday
                  </li>
                </ul>
              </div>

              <div className="info-box">
                <h2>Tracking Your Order</h2>
                <p>Once your order ships, you'll receive:</p>
                <ul>
                  <li>
                    <i className="fa-solid fa-envelope"></i>
                    Email notification with tracking number
                  </li>
                  <li>
                    <i className="fa-solid fa-box"></i>
                    Real-time tracking updates
                  </li>
                  <li>
                    <i className="fa-solid fa-user"></i>
                    Access to order status in your account
                  </li>
                  <li>
                    <i className="fa-solid fa-bell"></i>
                    Delivery notifications
                  </li>
                </ul>
              </div>

              <div className="info-box">
                <h2>International Shipping</h2>
                <p>For international orders, please note:</p>
                <ul>
                  <li>
                    <i className="fa-solid fa-globe"></i>
                    Customs fees and import duties may apply
                  </li>
                  <li>
                    <i className="fa-solid fa-file-invoice"></i>
                    Customers are responsible for any customs charges
                  </li>
                  <li>
                    <i className="fa-solid fa-clock"></i>
                    Delivery times may vary based on customs clearance
                  </li>
                  <li>
                    <i className="fa-solid fa-shield-halved"></i>
                    All packages are fully insured during transit
                  </li>
                </ul>
              </div>

              <div className="info-box highlight">
                <h2>Free Shipping</h2>
                <p>Enjoy free standard shipping on orders over $50! Applied automatically at checkout.</p>
                <div className="promo-banner">
                  <i className="fa-solid fa-gift"></i>
                  <span>Free shipping on all orders over $50</span>
                </div>
              </div>
            </div>
          </div>

          <div className="faq-section">
            <h2>Shipping FAQs</h2>
            <div className="faq-grid">
              <div className="faq-item">
                <h3>Can I change my shipping address?</h3>
                <p>Yes, you can modify your shipping address within 1 hour of placing your order. Contact support immediately for assistance.</p>
              </div>
              <div className="faq-item">
                <h3>What if my package is lost?</h3>
                <p>If your package doesn't arrive within the estimated timeframe, contact us. We'll investigate with the carrier and arrange a replacement.</p>
              </div>
              <div className="faq-item">
                <h3>Do you ship to P.O. boxes?</h3>
                <p>Yes, we ship to P.O. boxes for standard shipping. Express and same-day delivery require a physical address.</p>
              </div>
              <div className="faq-item">
                <h3>Can I track multiple orders?</h3>
                <p>Yes! Log into your account to view tracking for all your orders in one place.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
