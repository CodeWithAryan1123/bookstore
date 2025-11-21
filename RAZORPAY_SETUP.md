# Razorpay Integration Setup Guide

## 🚀 Quick Setup

### 1. Get Your Razorpay API Keys

1. **Sign up** for Razorpay account: https://dashboard.razorpay.com/signup
2. **Login** to Razorpay Dashboard: https://dashboard.razorpay.com/
3. Navigate to **Settings** → **API Keys**
4. Generate your **Test/Live Keys**:
   - **Key ID** (starts with `rzp_test_` or `rzp_live_`)
   - **Key Secret** (keep this secure!)

### 2. Update Your Code

Open `src/pages/Checkout.jsx` and replace this line (around line 109):

```javascript
key: 'rzp_test_YOUR_KEY_HERE', // Replace with your Razorpay test/live key
```

With your actual Razorpay Key ID:

```javascript
key: 'rzp_test_ABC123XYZ456', // Your actual key
```

### 3. Test Mode vs Live Mode

#### Test Mode (for development)
- Use keys starting with `rzp_test_`
- Use test cards from: https://razorpay.com/docs/payments/payments/test-card-details/
- No real money is charged

**Test Card Details:**
- Card Number: `4111 1111 1111 1111`
- CVV: Any 3 digits
- Expiry: Any future date
- Name: Any name

**Test UPI:**
- UPI ID: `success@razorpay`

#### Live Mode (for production)
- Use keys starting with `rzp_live_`
- Complete KYC verification in Razorpay Dashboard
- Real transactions will be processed

## 🔧 Features Implemented

✅ **Razorpay Checkout Integration**
- Online payment gateway
- Supports: UPI, Cards, Net Banking, Wallets
- Test and Live mode ready

✅ **Payment Methods Available**
1. **Pay Online (Razorpay)** - UPI, Cards, Net Banking, Wallets
2. **Cash on Delivery** - Pay when you receive

✅ **Payment Flow**
1. User selects "Pay Online (Razorpay)"
2. Reviews order
3. Clicks "Proceed to Payment"
4. Razorpay popup opens with payment options
5. User completes payment
6. Order is placed automatically on success

✅ **Payment Security**
- Payment ID captured
- Order ID captured
- Signature verification ready

## 📝 Payment Options in Razorpay Popup

When users click "Proceed to Payment", they'll see:
- **UPI**: GPay, PhonePe, Paytm, BHIM
- **Cards**: Credit/Debit (Visa, Mastercard, Rupay, Amex)
- **Net Banking**: All major banks
- **Wallets**: Paytm, PhonePe, Freecharge, etc.

## 🔐 Important Notes

1. **Never commit API keys to GitHub**
   - Add them to `.env` file (recommended for production)
   - Add `.env` to `.gitignore`

2. **For Production:**
   ```javascript
   // Create .env file
   VITE_RAZORPAY_KEY_ID=rzp_live_YOUR_LIVE_KEY
   
   // In Checkout.jsx
   key: import.meta.env.VITE_RAZORPAY_KEY_ID,
   ```

3. **Webhook Setup (Optional - for advanced users)**
   - Configure webhooks in Razorpay Dashboard
   - Verify payment status on server-side
   - Handle payment failures

## 🎨 Customization

You can customize the Razorpay popup in `Checkout.jsx`:

```javascript
const options = {
  name: 'Your Store Name', // Line 111
  description: 'Your description', // Line 112
  image: '/your-logo.png', // Line 113
  theme: {
    color: '#YOUR_COLOR' // Line 125
  }
};
```

## 📞 Support

- **Razorpay Docs**: https://razorpay.com/docs/
- **Razorpay Support**: https://razorpay.com/support/
- **Test Environment**: https://dashboard.razorpay.com/test/payments

## 🧪 Testing Your Integration

1. Start your dev server: `npm run dev`
2. Add books to cart
3. Go to checkout
4. Fill address details
5. Select "Pay Online (Razorpay)"
6. Review order
7. Click "Proceed to Payment"
8. Use test card details (mentioned above)
9. Complete payment
10. Check order in Profile → Orders

## ✅ Checklist

- [ ] Created Razorpay account
- [ ] Got API Key ID
- [ ] Replaced 'rzp_test_YOUR_KEY_HERE' in Checkout.jsx
- [ ] Tested with test card
- [ ] Verified order creation
- [ ] Ready for production (completed KYC for live mode)

---

**Made with ❤️ for Once Upon A Bookshelf**
