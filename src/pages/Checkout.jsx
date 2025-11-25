import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrderContext';
import './Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const { cart, cartTotal, clearCart } = useCart();
  const { placeOrder } = useOrders();
  
  const [step, setStep] = useState(1); // 1: Address, 2: Payment, 3: Review
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  // Address form state
  const [addressForm, setAddressForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address1: user?.address?.address1 || '',
    address2: user?.address?.address2 || '',
    city: user?.address?.city || '',
    state: user?.address?.state || '',
    pincode: user?.address?.pincode || ''
  });
  
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  
  // Redirect if cart is empty
  useEffect(() => {
    if (!cart || cart.length === 0) {
      navigate('/cart');
    }
  }, [cart, navigate]);
  
  // Calculate totals
  const subtotal = cartTotal;
  const shipping = subtotal >= 999 ? 0 : 49;
  const total = subtotal + shipping - discount;
  
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddressForm(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === 'BOOK10') {
      setDiscount(subtotal * 0.1);
      alert('Coupon applied! 10% discount');
    } else if (couponCode.toUpperCase() === 'FIRSTORDER') {
      setDiscount(100);
      alert('Coupon applied! ₹100 discount');
    } else {
      alert('Invalid coupon code');
      setDiscount(0);
    }
  };
  
  const validateAddress = () => {
    if (!addressForm.name || !addressForm.phone || !addressForm.address1 || 
        !addressForm.city || !addressForm.state || !addressForm.pincode) {
      alert('Please fill all required fields');
      return false;
    }
    
    if (addressForm.phone.length !== 10) {
      alert('Please enter a valid 10-digit phone number');
      return false;
    }
    
    if (addressForm.pincode.length !== 6) {
      alert('Please enter a valid 6-digit pincode');
      return false;
    }
    
    return true;
  };
  
  const handleContinue = () => {
    if (step === 1 && validateAddress()) {
      // Save address to user profile
      updateUser({
        name: addressForm.name,
        phone: addressForm.phone,
        address: {
          address1: addressForm.address1,
          address2: addressForm.address2,
          city: addressForm.city,
          state: addressForm.state,
          pincode: addressForm.pincode
        }
      });
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      handlePlaceOrder('success');
    }
  };

  const handlePlaceOrder = (status = 'success', paymentDetails = null) => {
    setIsProcessing(true);
    console.log('Placing order...');
    
    const orderData = {
      subtotal,
      shipping,
      discount,
      total,
      paymentMethod,
      address: addressForm,
      paymentStatus: status,
      paymentDetails
    };

    const order = placeOrder(cart, orderData);
    console.log('Order placed:', order);
    
    if (order) {
      clearCart();
      
      // Small delay before showing modal
      setTimeout(() => {
        setIsProcessing(false);
        setShowSuccessModal(true);
        console.log('Success modal should be visible now');
        
        // Navigate to orders after 3 seconds
        setTimeout(() => {
          setShowSuccessModal(false);
          navigate('/profile?tab=orders');
        }, 3000);
      }, 300);
    } else {
      setIsProcessing(false);
      alert('Failed to place order. Please try again.');
    }
  };
  
  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate('/cart');
    }
  };

  return (
    <div className="checkout-page">
      <div className="container">
        <div className="checkout-header">
          <h1>Checkout</h1>
          <div className="checkout-steps">
            <div className={`step ${step >= 1 ? 'active' : ''}`}>
              <div className="step-number">1</div>
              <span>Address</span>
            </div>
            <div className="step-line"></div>
            <div className={`step ${step >= 2 ? 'active' : ''}`}>
              <div className="step-number">2</div>
              <span>Payment</span>
            </div>
            <div className="step-line"></div>
            <div className={`step ${step >= 3 ? 'active' : ''}`}>
              <div className="step-number">3</div>
              <span>Review</span>
            </div>
          </div>
        </div>
        
        <div className="checkout-content">
          <div className="checkout-main">
            <button className="back-btn" onClick={handleBack}>
              <i className="fas fa-arrow-left"></i>
              Back
            </button>
            
            {step === 1 && (
              <div className="checkout-section">
                <h2>
                  <i className="fas fa-map-marker-alt"></i>
                  Delivery Address
                </h2>
                <form className="address-form" onSubmit={(e) => e.preventDefault()}>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={addressForm.name}
                        onChange={handleAddressChange}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={addressForm.phone}
                        onChange={handleAddressChange}
                        placeholder="10-digit phone number"
                        maxLength="10"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label>Address Line 1 *</label>
                    <input
                      type="text"
                      name="address1"
                      value={addressForm.address1}
                      onChange={handleAddressChange}
                      placeholder="House No., Building Name"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Address Line 2</label>
                    <input
                      type="text"
                      name="address2"
                      value={addressForm.address2}
                      onChange={handleAddressChange}
                      placeholder="Road Name, Area, Colony"
                    />
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label>City *</label>
                      <input
                        type="text"
                        name="city"
                        value={addressForm.city}
                        onChange={handleAddressChange}
                        placeholder="City"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>State *</label>
                      <input
                        type="text"
                        name="state"
                        value={addressForm.state}
                        onChange={handleAddressChange}
                        placeholder="State"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Pincode *</label>
                      <input
                        type="text"
                        name="pincode"
                        value={addressForm.pincode}
                        onChange={handleAddressChange}
                        placeholder="6-digit pincode"
                        maxLength="6"
                        required
                      />
                    </div>
                  </div>
                  
                  <button 
                    type="button" 
                    className="btn btn-primary"
                    onClick={handleContinue}
                    style={{ marginTop: '16px', width: '100%' }}
                  >
                    Continue to Payment
                  </button>
                </form>
              </div>
            )}
            
            {step === 2 && (
              <div className="checkout-section">
                <h2>
                  <i className="fas fa-credit-card"></i>
                  Payment Method
                </h2>
                <div className="payment-methods">
                  <label className="payment-option">
                    <input
                      type="radio"
                      name="payment"
                      value="upi"
                      checked={paymentMethod === 'upi'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <div className="payment-content">
                      <i className="fas fa-mobile-alt"></i>
                      <div>
                        <h3>UPI Payment</h3>
                        <p>Google Pay, PhonePe, Paytm, etc.</p>
                      </div>
                    </div>
                  </label>
                  
                  <label className="payment-option">
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <div className="payment-content">
                      <i className="fas fa-credit-card"></i>
                      <div>
                        <h3>Credit/Debit Card</h3>
                        <p>Visa, Mastercard, RuPay</p>
                      </div>
                    </div>
                  </label>
                  
                  <label className="payment-option">
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <div className="payment-content">
                      <i className="fas fa-money-bill-wave"></i>
                      <div>
                        <h3>Cash on Delivery</h3>
                        <p>Pay when you receive the order</p>
                      </div>
                    </div>
                  </label>
                </div>
                
                <button 
                  type="button" 
                  className="btn btn-primary"
                  onClick={handleContinue}
                  style={{ width: '100%' }}
                >
                  Review Order
                </button>
              </div>
            )}
            
            {step === 3 && (
              <div className="checkout-section review-section">
                <h2>
                  <i className="fas fa-check-circle"></i>
                  Review Order
                </h2>
                
                <h3>Delivery Address</h3>
                <div className="review-card">
                  <p><strong>{addressForm.name}</strong></p>
                  <p>{addressForm.phone}</p>
                  <p>{addressForm.address1}</p>
                  {addressForm.address2 && <p>{addressForm.address2}</p>}
                  <p>{addressForm.city}, {addressForm.state} - {addressForm.pincode}</p>
                </div>
                
                <h3>Payment Method</h3>
                <div className="review-card">
                  <p>
                    {paymentMethod === 'upi' && <><i className="fas fa-mobile-alt"></i> UPI Payment</>}
                    {paymentMethod === 'card' && <><i className="fas fa-credit-card"></i> Credit/Debit Card</>}
                    {paymentMethod === 'cod' && <><i className="fas fa-money-bill-wave"></i> Cash on Delivery</>}
                  </p>
                </div>
                
                <h3>Order Items ({cart.length})</h3>
                <div className="review-items">
                  {cart.map(item => (
                    <div key={item.id} className="review-item">
                      <img src={item.image} alt={item.title} />
                      <div className="item-details">
                        <h4>{item.title}</h4>
                        <p>{item.author}</p>
                        <p>Quantity: {item.quantity}</p>
                        <p className="item-price">₹{(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <button 
                  type="button" 
                  className="btn btn-primary"
                  onClick={handleContinue}
                  disabled={isProcessing}
                  style={{ width: '100%', marginTop: '24px' }}
                >
                  {isProcessing ? 'Processing...' : 'Place Order'}
                </button>
              </div>
            )}
          </div>
          
          <div className="checkout-sidebar">
            <div className="order-summary">
              <h3>Order Summary</h3>
              
              <div className="summary-items">
                {cart.map(item => (
                  <div key={item.id} className="summary-item">
                    <img src={item.image} alt={item.title} />
                    <div className="item-info">
                      <p>{item.title}</p>
                      <span>Qty: {item.quantity}</span>
                    </div>
                    <div className="item-price">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="coupon-section">
                <input
                  type="text"
                  placeholder="Coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                <button 
                  className="btn btn-secondary"
                  onClick={handleApplyCoupon}
                >
                  Apply
                </button>
              </div>
              
              <div className="summary-details">
                <div className="summary-row">
                  <span>Subtotal ({cart.length} items)</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : `₹${shipping.toFixed(2)}`}</span>
                </div>
                {discount > 0 && (
                  <div className="summary-row discount">
                    <span>Discount</span>
                    <span>-₹{discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="summary-row total">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Success Modal */}
      {showSuccessModal && (
        <div className="success-modal-overlay">
          <div className="success-modal">
            <div className="success-icon">
              <i className="fas fa-check-circle"></i>
            </div>
            <h2>Order Placed Successfully!</h2>
            <p>Thank you for your purchase</p>
            <p className="order-message">Your order has been confirmed and will be delivered soon.</p>
            <div className="success-animation">
              <div className="checkmark-circle">
                <div className="checkmark"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
