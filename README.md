# 📚 Once Upon A Bookshelf - Premium Online Bookstore

A beautiful, fully-functional React.js bookstore application with modern UI/UX design and complete e-commerce features.

## ✨ Features

### 🎨 Beautiful Design
- **Premium Color Scheme**: Deep Teal (#0D7377) & Coral (#FF6B6B) combination
- **Currency**: Indian Rupees (₹)
- **Smooth Animations**: Floating elements, hover effects, and page transitions
- **Responsive Design**: Perfect on desktop, tablet, and mobile devices
- **Modern Typography**: Playfair Display & Poppins font pairing

### 🔐 Authentication System
- User signup with validation
- Login/logout functionality
- Protected routes
- User profile management
- Persistent sessions with localStorage

### 🛒 Shopping Cart
- Add/remove items
- Quantity management
- Real-time price calculations
- Coupon code system (try: BOOK20, WELCOME10)
- **Free shipping on orders over ₹4000**
- Tax calculated as 18% GST (Indian tax rate)
- Cart persistence

### ❤️ Wishlist
- Save favorite books
- Quick add to cart from wishlist
- Persistent wishlist storage

### 📖 Book Catalog
- 18+ books with detailed information
- All prices in Indian Rupees (₹)
- Multiple categories (Fiction, Self-Help, Business, etc.)
- Advanced filtering and sorting
- Search functionality
- Bestseller badges
- Discount indicators
- Detailed book pages with reviews

### 👤 User Profile
- Profile information display
- Edit profile details
- Order history
- Account statistics
- Security settings

### 🎯 Additional Features
- Toast notifications
- Loading states
- Error handling
- SEO-friendly URLs
- Category browsing
- Rating and review system

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Navigate to the project directory:**
   ```bash
   cd bookstore
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Visit `http://localhost:5173`

## 📁 Project Structure

```
bookstore/
├── src/
│   ├── components/          # Reusable components
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   └── BookCard.jsx
│   ├── context/            # Context providers
│   │   ├── AuthContext.jsx
│   │   └── CartContext.jsx
│   ├── data/               # Mock data
│   │   └── books.js
│   ├── pages/              # Page components
│   │   ├── Home.jsx
│   │   ├── Books.jsx
│   │   ├── BookDetail.jsx
│   │   ├── Cart.jsx
│   │   ├── Wishlist.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   └── Profile.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
└── vite.config.js
```

## 🎨 Color Palette

- **Primary**: #0D7377 (Deep Teal)
- **Primary Light**: #14FFEC (Bright Cyan)
- **Primary Dark**: #053B3D (Dark Teal)
- **Accent**: #FF6B6B (Coral Red)
- **Accent Light**: #FFD93D (Golden Yellow)
- **Background**: #F8F9FA (Light Gray)
- **Surface**: #FFFFFF (White)

## 💡 Usage Tips

### Test Accounts
Create your own account using the signup page!

### Coupon Codes
- `BOOK20` - 20% discount
- `WELCOME10` - 10% discount

### Features to Try
1. Browse books by category
2. Add books to cart and wishlist
3. Update quantities in cart
4. Apply coupon codes
5. View detailed book information
6. Create an account and manage profile
7. View order history

## 🛠️ Technologies Used

- **React 18** - UI library
- **React Router 6** - Routing
- **Context API** - State management
- **Vite** - Build tool
- **CSS3** - Styling with custom properties
- **LocalStorage** - Data persistence

## 📱 Responsive Breakpoints

- Desktop: 1024px+
- Tablet: 768px - 1023px
- Mobile: < 768px

## 🎯 Key Features Showcase

### Authentication Flow
1. Signup → Validation → Auto-login → Redirect to home
2. Login → Session storage → Access to profile
3. Logout → Clear session → Public view

### Shopping Flow
1. Browse → Add to cart → View cart
2. Apply coupon → Review order → Checkout
3. Save to wishlist → Quick add to cart

### User Experience
- Smooth page transitions
- Instant feedback with toasts
- Hover effects on interactive elements
- Loading states for better UX
- Error messages for form validation

## 🚀 Build for Production

```bash
npm run build
```

The optimized files will be in the `dist/` directory.

## 📄 License

This project is created for educational and demonstration purposes.

## 🤝 Contributing

Feel free to fork this project and customize it for your needs!

## 📧 Support

For questions or issues, please create an issue in the repository.

---

**Built with ❤️ using React.js**

Enjoy exploring Once Upon A Bookshelf - Your Literary Paradise! 📚✨
