import React, { useState } from 'react';
import './Returns.css';

const Returns = () => {
  const [returnForm, setReturnForm] = useState({
    orderNumber: '',
    email: '',
    reason: '',
    comments: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Return request submitted successfully!');
    setReturnForm({ orderNumber: '', email: '', reason: '', comments: '' });
  };

  return (
    <div className="returns-page">
      <div className="returns-hero">
        <div className="container">
          <h1>Returns & Refunds</h1>
          <p>Easy returns within 30 days. Your satisfaction is our priority.</p>
        </div>
      </div>

      <div className="returns-content">
        <div className="container">
          <div className="policy-section">
            <h2>Our Return Policy</h2>
            <div className="policy-grid">
              <div className="policy-card">
                <div className="policy-icon">
                  <i className="fa-solid fa-calendar-check"></i>
                </div>
                <h3>30-Day Returns</h3>
                <p>Return any unopened book within 30 days of purchase for a full refund.</p>
              </div>

              <div className="policy-card">
                <div className="policy-icon">
                  <i className="fa-solid fa-box-open"></i>
                </div>
                <h3>Original Condition</h3>
                <p>Books must be in original, unopened condition with all packaging intact.</p>
              </div>

              <div className="policy-card">
                <div className="policy-icon">
                  <i className="fa-solid fa-money-bill-wave"></i>
                </div>
                <h3>Full Refund</h3>
                <p>Receive a full refund to your original payment method within 5-7 business days.</p>
              </div>

              <div className="policy-card">
                <div className="policy-icon">
                  <i className="fa-solid fa-truck"></i>
                </div>
                <h3>Free Return Shipping</h3>
                <p>We provide prepaid return labels for eligible returns at no cost to you.</p>
              </div>
            </div>
          </div>

          <div className="content-columns">
            <div className="info-column">
              <div className="info-section">
                <h2>How to Return</h2>
                <div className="steps">
                  <div className="step">
                    <div className="step-number">1</div>
                    <div className="step-content">
                      <h3>Request Return</h3>
                      <p>Fill out the return form below or contact our support team.</p>
                    </div>
                  </div>

                  <div className="step">
                    <div className="step-number">2</div>
                    <div className="step-content">
                      <h3>Receive Label</h3>
                      <p>We'll email you a prepaid return shipping label within 24 hours.</p>
                    </div>
                  </div>

                  <div className="step">
                    <div className="step-number">3</div>
                    <div className="step-content">
                      <h3>Pack & Ship</h3>
                      <p>Pack the book securely and attach the return label. Drop it off at any carrier location.</p>
                    </div>
                  </div>

                  <div className="step">
                    <div className="step-number">4</div>
                    <div className="step-content">
                      <h3>Get Refund</h3>
                      <p>Once we receive your return, we'll process your refund within 5-7 business days.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="info-section">
                <h2>What Can Be Returned?</h2>
                <div className="eligible-items">
                  <div className="item-status returnable">
                    <i className="fa-solid fa-check-circle"></i>
                    <div>
                      <h4>Returnable Items</h4>
                      <ul>
                        <li>Unopened physical books</li>
                        <li>Books in original packaging</li>
                        <li>Items with defects or damage</li>
                        <li>Incorrect items received</li>
                      </ul>
                    </div>
                  </div>

                  <div className="item-status non-returnable">
                    <i className="fa-solid fa-times-circle"></i>
                    <div>
                      <h4>Non-Returnable Items</h4>
                      <ul>
                        <li>E-books and digital content</li>
                        <li>Opened or used books</li>
                        <li>Gift cards</li>
                        <li>Items without original packaging</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="info-section">
                <h2>Exchange Policy</h2>
                <p>Want to exchange instead of return? We make it easy!</p>
                <ul className="exchange-benefits">
                  <li><i className="fa-solid fa-repeat"></i> Free exchanges within 30 days</li>
                  <li><i className="fa-solid fa-shipping-fast"></i> No additional shipping charges</li>
                  <li><i className="fa-solid fa-hand-holding-heart"></i> Exchange for any book of equal or greater value</li>
                  <li><i className="fa-solid fa-headset"></i> Dedicated exchange support team</li>
                </ul>
              </div>
            </div>

            <div className="form-column">
              <div className="return-form-wrapper">
                <h2>Request a Return</h2>
                <p className="form-description">Fill out this form to initiate your return</p>
                
                <form onSubmit={handleSubmit} className="return-form">
                  <div className="form-group">
                    <label htmlFor="orderNumber">Order Number *</label>
                    <input
                      type="text"
                      id="orderNumber"
                      value={returnForm.orderNumber}
                      onChange={(e) => setReturnForm({...returnForm, orderNumber: e.target.value})}
                      placeholder="e.g., ORD-12345"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      value={returnForm.email}
                      onChange={(e) => setReturnForm({...returnForm, email: e.target.value})}
                      placeholder="your@email.com"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="reason">Reason for Return *</label>
                    <select
                      id="reason"
                      value={returnForm.reason}
                      onChange={(e) => setReturnForm({...returnForm, reason: e.target.value})}
                      required
                    >
                      <option value="">Select a reason</option>
                      <option value="changed-mind">Changed my mind</option>
                      <option value="wrong-item">Received wrong item</option>
                      <option value="damaged">Item damaged</option>
                      <option value="not-as-described">Not as described</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="comments">Additional Comments</label>
                    <textarea
                      id="comments"
                      value={returnForm.comments}
                      onChange={(e) => setReturnForm({...returnForm, comments: e.target.value})}
                      rows="4"
                      placeholder="Tell us more about your return..."
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary">
                    <i className="fa-solid fa-paper-plane"></i> Submit Return Request
                  </button>
                </form>

                <div className="form-help">
                  <i className="fa-solid fa-info-circle"></i>
                  <p>Need help? Contact our support team at <a href="mailto:returns@onceuponabookshelf.com">returns@onceuponabookshelf.com</a></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Returns;
