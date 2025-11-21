import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { booksData } from '../data/books';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './BookDetail.css';

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const book = booksData.find(b => b.id === parseInt(id));
  const { addToCart, addToWishlist, isInWishlist } = useCart();
  const { user } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  if (!book) {
    return (
      <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>
        <h2>Book not found</h2>
        <button onClick={() => navigate('/books')} className="btn btn-primary">
          Back to Books
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(book, quantity);
    showToast('Added to cart!');
  };

  const handleWishlist = () => {
    addToWishlist(book);
    showToast('Added to wishlist!');
  };

  const showToast = (message) => {
    const toast = document.createElement('div');
    toast.className = 'toast success';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
  };

  const discount = Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100);

  return (
    <div className="book-detail-page">
      <div className="container">
        <button onClick={() => navigate(-1)} className="back-btn">
          ← Back
        </button>

        <div className="book-detail-grid">
          <div className="book-detail-image-section">
            <div className="book-detail-image-wrapper">
              {book.bestseller && <div className="badge-bestseller">🏆 Bestseller</div>}
              {discount > 0 && <div className="badge-discount">-{discount}%</div>}
              <img src={book.image} alt={book.title} className="book-detail-image" />
            </div>
            <div className="book-actions-mobile">
              <button 
                className={`btn ${isInWishlist(book.id) ? 'btn-accent' : 'btn-light'}`}
                onClick={handleWishlist}
              >
                <i className="fa-solid fa-heart"></i> {isInWishlist(book.id) ? 'In Wishlist' : 'Add to Wishlist'}
              </button>
            </div>
          </div>

          <div className="book-detail-info">
            <div className="book-category-badge">{book.category}</div>
            <h1 className="book-detail-title">{book.title}</h1>
            <p className="book-detail-author">by {book.author}</p>

            <div className="book-detail-rating">
              <div className="stars-large">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < Math.floor(book.rating) ? 'star filled' : 'star'}>
                    <i className="fa-solid fa-star"></i>
                  </span>
                ))}
              </div>
              <span className="rating-text">{book.rating} ({book.reviews} reviews)</span>
            </div>

            <div className="book-detail-price">
              <span className="current-price">₹{book.price}</span>
              {book.originalPrice > book.price && (
                <>
                  <span className="original-price">₹{book.originalPrice}</span>
                  <span className="save-badge">Save ₹{(book.originalPrice - book.price)}</span>
                </>
              )}
            </div>

            <div className="stock-status">
              {book.inStock ? (
                <span className="in-stock"><i className="fa-solid fa-check"></i> In Stock</span>
              ) : (
                <span className="out-of-stock"><i className="fa-solid fa-xmark"></i> Out of Stock</span>
              )}
            </div>

            <div className="quantity-section">
              <label>Quantity:</label>
              <div className="quantity-controls">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
                <span className="quantity-display">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
            </div>

            <div className="book-detail-actions">
              <button className="btn btn-primary btn-large" onClick={handleAddToCart}>
                <i className="fa-solid fa-cart-shopping"></i> Add to Cart
              </button>
              <button 
                className={`btn btn-large ${isInWishlist(book.id) ? 'btn-accent' : 'btn-outline'}`}
                onClick={handleWishlist}
              >
                <i className="fa-solid fa-heart"></i> {isInWishlist(book.id) ? 'In Wishlist' : 'Wishlist'}
              </button>
            </div>

            <div className="book-meta">
              <div className="meta-item">
                <span className="meta-label">ISBN:</span>
                <span className="meta-value">{book.isbn}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Category:</span>
                <span className="meta-value">{book.category}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Author:</span>
                <span className="meta-value">{book.author}</span>
              </div>
            </div>

            <div className="delivery-info">
              <div className="info-item">
                <span className="icon">🚚</span>
                <div>
                  <strong>Free Delivery</strong>
                  <p>On orders over ₹999</p>
                </div>
              </div>
              <div className="info-item">
                <span className="icon">↩️</span>
                <div>
                  <strong>Easy Returns</strong>
                  <p>30-day return policy</p>
                </div>
              </div>
              <div className="info-item">
                <span className="icon">💯</span>
                <div>
                  <strong>Authentic</strong>
                  <p>100% genuine books</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="book-detail-tabs">
          <div className="tabs-header">
            <button 
              className={`tab-btn ${activeTab === 'description' ? 'active' : ''}`}
              onClick={() => setActiveTab('description')}
            >
              Description
            </button>
            <button 
              className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews ({book.reviews})
            </button>
            <button 
              className={`tab-btn ${activeTab === 'details' ? 'active' : ''}`}
              onClick={() => setActiveTab('details')}
            >
              Details
            </button>
          </div>

          <div className="tabs-content">
            {activeTab === 'description' && (
              <div className="tab-panel">
                <h3>About This Book</h3>
                <p>{book.description}</p>
                <p>
                  This captivating book offers readers an immersive experience with its compelling narrative 
                  and well-developed characters. Perfect for both casual readers and enthusiasts, it provides 
                  valuable insights and entertainment in equal measure.
                </p>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="tab-panel">
                <div className="reviews-summary">
                  <div className="rating-overview">
                    <div className="rating-number">{book.rating}</div>
                    <div className="stars-large">⭐⭐⭐⭐⭐</div>
                    <div className="rating-count">{book.reviews} reviews</div>
                  </div>
                </div>
                <div className="review-item">
                  <div className="review-header">
                    <div className="reviewer-info">
                      <div className="reviewer-avatar">JS</div>
                      <div>
                        <div className="reviewer-name">John Smith</div>
                        <div className="review-date">2 weeks ago</div>
                      </div>
                    </div>
                    <div className="review-rating">⭐⭐⭐⭐⭐</div>
                  </div>
                  <p className="review-text">
                    Amazing book! Couldn't put it down. The author's writing style is captivating 
                    and the story kept me engaged from start to finish.
                  </p>
                </div>
                <div className="review-item">
                  <div className="review-header">
                    <div className="reviewer-info">
                      <div className="reviewer-avatar">EJ</div>
                      <div>
                        <div className="reviewer-name">Emma Johnson</div>
                        <div className="review-date">1 month ago</div>
                      </div>
                    </div>
                    <div className="review-rating">⭐⭐⭐⭐⭐</div>
                  </div>
                  <p className="review-text">
                    Highly recommend! This book exceeded my expectations and provided valuable insights.
                    A must-read for anyone interested in this genre.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'details' && (
              <div className="tab-panel">
                <h3>Product Details</h3>
                <div className="details-grid">
                  <div className="detail-row">
                    <span className="detail-label">ISBN:</span>
                    <span className="detail-value">{book.isbn}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Author:</span>
                    <span className="detail-value">{book.author}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Category:</span>
                    <span className="detail-value">{book.category}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Publisher:</span>
                    <span className="detail-value">BookHaven Publishing</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Language:</span>
                    <span className="detail-value">English</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Format:</span>
                    <span className="detail-value">Paperback</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
