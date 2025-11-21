import React from 'react';
import { Link } from 'react-router-dom';
import BookCard from '../components/BookCard';
import { featuredBooks, booksData } from '../data/books';
import './Home.css';

const Home = () => {
  const newArrivals = booksData.slice(0, 4);
  const categories = [
    { name: 'Fiction', icon: 'fa-solid fa-book-open', color: '#FF6B6B' },
    { name: 'Self-Help', icon: 'fa-solid fa-lightbulb', color: '#4ECDC4' },
    { name: 'Business', icon: 'fa-solid fa-briefcase', color: '#FFD93D' },
    { name: 'Science Fiction', icon: 'fa-solid fa-rocket', color: '#A8E6CF' },
    { name: 'History', icon: 'fa-solid fa-landmark', color: '#FF8B94' },
    { name: 'Biography', icon: 'fa-solid fa-user', color: '#C7CEEA' },
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title fade-in">
                Discover Your Next
                <span className="gradient-text"> Great Read</span>
              </h1>
              <p className="hero-subtitle">
                Explore thousands of books from bestsellers to hidden gems. 
                Your literary journey starts here at Once Upon A Bookshelf.
              </p>
              <div className="hero-buttons fade-in">
                <Link to="/books" className="btn btn-primary">
                  Explore Books
                </Link>
                <Link to="/bestsellers" className="btn btn-outline">
                  View Bestsellers
                </Link>
              </div>
              <div className="hero-stats">
                <div className="stat">
                  <div className="stat-icon"><i className="fa-solid fa-book"></i></div>
                  <span className="stat-number">10,000+</span>
                  <span className="stat-label">Books</span>
                </div>
                <div className="stat">
                  <div className="stat-icon"><i className="fa-solid fa-users"></i></div>
                  <span className="stat-number">50,000+</span>
                  <span className="stat-label">Happy Readers</span>
                </div>
                <div className="stat">
                  <div className="stat-icon"><i className="fa-solid fa-star"></i></div>
                  <span className="stat-number">4.9</span>
                  <span className="stat-label">Rating</span>
                </div>
              </div>
            </div>
            <div className="hero-image">
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="container">
          <h2 className="section-title">Browse by Category</h2>
          <div className="categories-grid">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/books?category=${category.name}`}
                className="category-card"
                style={{ '--category-color': category.color }}
              >
                <i className={`category-icon ${category.icon}`}></i>
                <span className="category-name">{category.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Books Section */}
      <section className="featured-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Featured Bestsellers</h2>
            <Link to="/bestsellers" className="view-all">
              View All →
            </Link>
          </div>
          <div className="books-grid">
            {featuredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="new-arrivals-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">New Arrivals</h2>
            <Link to="/books" className="view-all">
              View All →
            </Link>
          </div>
          <div className="books-grid">
            {newArrivals.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-us">
        <div className="container">
          <h2 className="section-title">Why Choose Once Upon A Bookshelf?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon"><i className="fa-solid fa-truck-fast"></i></div>
              <h3>Free Shipping</h3>
              <p>Free shipping on orders over ₹999</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><i className="fa-solid fa-certificate"></i></div>
              <h3>Quality Guarantee</h3>
              <p>100% authentic books guaranteed</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><i className="fa-solid fa-lock"></i></div>
              <h3>Secure Payment</h3>
              <p>Safe and secure checkout process</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><i className="fa-solid fa-gift"></i></div>
              <h3>Special Offers</h3>
              <p>Regular discounts and promotions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-content">
            <h2>Stay Updated!</h2>
            <p>Subscribe to our newsletter for exclusive deals and new releases.</p>
            <div className="newsletter-form-large">
              <input type="email" placeholder="Enter your email" />
              <button className="btn btn-accent">Subscribe Now</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
