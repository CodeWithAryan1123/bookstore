import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';
import { showToast } from '../utils/toast';
import './Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const { createOrder } = useOrders();
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [selectedShipping, setSelectedShipping] = useState('standard');

  const shippingOptions = [
    {
      id: 'standard',
      name: 'Standard Shipping',
      time: '5-7 Business Days',
      price: 49,
      icon: 'fa-truck',
      condition: 'Free on orders over ₹999'
    },
    {
      id: 'express',
      name: 'Express Shipping',
      time: '2-3 Business Days',
      price: 299,
      icon: 'fa-truck-fast'
    },
    {
      id: 'same-day',
      name: 'Same-Day Delivery',
      time: 'Within 24 Hours',
      price: 499,
      icon: 'fa-bolt',
      condition: 'Available in select metro areas'
    }
  ];

  const subtotal = getCartTotal();
  const getShippingCost = () => {
    const option = shippingOptions.find(opt => opt.id === selectedShipping);
    if (selectedShipping === 'standard' && subtotal > 999) {
      return 0;
    }
    return option.price;
  };
  const shipping = getShippingCost();
  const total = subtotal + shipping - discount;

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

    navigate('/checkout');
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
              
              <div className="delivery-options-section">
                <h3>Select Delivery Option</h3>
                <div className="delivery-options">
                  {shippingOptions.map(option => (
                    <div 
                      key={option.id}
                      className={`delivery-option ${selectedShipping === option.id ? 'selected' : ''}`}
                      onClick={() => setSelectedShipping(option.id)}
                    >
                      <div className="delivery-option-header">
                        <i className={`fa-solid ${option.icon}`}></i>
                        <div className="delivery-option-info">
                          <h4>{option.name}</h4>
                          <p className="delivery-time">{option.time}</p>
                        </div>
                      </div>
                      <div className="delivery-option-price">
                        {option.id === 'standard' && subtotal > 999 ? (
                          <span className="free-badge">FREE</span>
                        ) : option.id === 'standard' ? (
                          <span className="price-badge">₹{option.price}</span>
                        ) : (
                          <span className="price-badge">₹{option.price}</span>
                        )}
                      </div>
                      {option.condition && (
                        <p className="delivery-condition">{option.condition}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

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
