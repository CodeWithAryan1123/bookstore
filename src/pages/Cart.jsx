import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const subtotal = getCartTotal();
  const shipping = subtotal > 999 ? 0 : 49;
  const tax = subtotal * 0.18;
  const total = subtotal + shipping + tax - discount;

  const applyCoupon = () => {
    if (couponCode.toLowerCase() === 'book20') {
      setDiscount(subtotal * 0.2);
      showToast('Coupon applied! 20% off');
    } else if (couponCode.toLowerCase() === 'welcome10') {
      setDiscount(subtotal * 0.1);
      showToast('Coupon applied! 10% off');
    } else {
      showToast('Invalid coupon code', 'error');
    }
  };

  const handleCheckout = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    showToast('Checkout feature coming soon!');
  };

  const showToast = (message, type = 'success') => {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="empty-cart">
            <div className="empty-cart-icon"><i className="fa-solid fa-cart-shopping"></i></div>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added any books yet</p>
            <Link to="/books" className="btn btn-primary">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <div className="cart-header">
          <h1>Shopping Cart</h1>
          <button className="btn btn-light" onClick={clearCart}>
            Clear Cart
          </button>
        </div>

        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-image">
                  <img src={item.image} alt={item.title} />
                </div>
                <div className="cart-item-details">
                  <h3 className="cart-item-title">{item.title}</h3>
                  <p className="cart-item-author">by {item.author}</p>
                  <div className="cart-item-meta">
                    <span className="cart-item-category">{item.category}</span>
                    <span className="cart-item-rating">⭐ {item.rating}</span>
                  </div>
                </div>
                <div className="cart-item-quantity">
                  <button 
                    className="qty-btn"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    −
                  </button>
                  <span className="qty-display">{item.quantity}</span>
                  <button 
                    className="qty-btn"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <div className="cart-item-price">
                  <span className="item-price">₹{(item.price * item.quantity)}</span>
                  <span className="item-price-unit">₹{item.price} each</span>
                </div>
                <button 
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div className="cart-sidebar">
            <div className="cart-summary">
              <h2>Order Summary</h2>
              
              <div className="coupon-section">
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                <button className="btn btn-outline" onClick={applyCoupon}>
                  Apply
                </button>
              </div>

              <div className="summary-row">
                <span>Subtotal ({cartItems.length} items)</span>
                <span>₹{subtotal.toFixed(0)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
              </div>
              <div className="summary-row">
                <span>GST (18%)</span>
                <span>₹{tax.toFixed(0)}</span>
              </div>
              {discount > 0 && (
                <div className="summary-row discount-row">
                  <span>Discount</span>
                  <span>-₹{discount.toFixed(0)}</span>
                </div>
              )}
              <div className="summary-total">
                <span>Total</span>
                <span>₹{total.toFixed(0)}</span>
              </div>

              <button className="btn btn-primary checkout-btn" onClick={handleCheckout}>
                Proceed to Checkout
              </button>

              <Link to="/books" className="continue-shopping">
                ← Continue Shopping
              </Link>
            </div>

            <div className="cart-features">
              <div className="feature-item">
                <span className="feature-icon">🚚</span>
                <div>
                  <strong>Free Shipping</strong>
                  <p>On orders over ₹999</p>
                </div>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🔒</span>
                <div>
                  <strong>Secure Payment</strong>
                  <p>100% secure checkout</p>
                </div>
              </div>
              <div className="feature-item">
                <span className="feature-icon">↩️</span>
                <div>
                  <strong>Easy Returns</strong>
                  <p>30-day return policy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
