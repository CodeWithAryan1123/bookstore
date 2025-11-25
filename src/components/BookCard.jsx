import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import './BookCard.css';

const BookCard = ({ book, onCompareToggle, isInCompare }) => {
  const { addToCart, addToWishlist, isInWishlist } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(book);
    showToast('Added to cart!');
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
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
    <div className="book-card" onClick={() => navigate(`/book/${book.id}`)}>
      {book.bestseller && <div className="badge-bestseller"><i className="fa-solid fa-trophy"></i> Bestseller</div>}
      {discount > 0 && <div className="badge-discount">-{discount}%</div>}
      
      <div className="book-image-wrapper">
        <img src={book.image} alt={book.title} className="book-image" />
        <div className="book-overlay">
          <button className="overlay-btn" onClick={handleAddToCart}>
            <i className="fa-solid fa-cart-shopping"></i> Add to Cart
          </button>
          <button 
            className={`overlay-btn wishlist-btn ${isInWishlist(book.id) ? 'active' : ''}`}
            onClick={handleWishlist}
          >
            <i className="fa-solid fa-heart"></i> {isInWishlist(book.id) ? 'In Wishlist' : 'Wishlist'}
          </button>
        </div>
      </div>

      <div className="book-info">
        <div className="book-title-row">
          <h3 className="book-title">{book.title}</h3>
          {onCompareToggle && (
            <button
              className={`add-to-compare-btn ${isInCompare ? 'active' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                onCompareToggle(book);
              }}
              title={isInCompare ? "Remove from compare" : "Add to compare"}
            >
              <i className={`fa-solid ${isInCompare ? 'fa-check-circle' : 'fa-plus-circle'}`}></i>
            </button>
          )}
        </div>
        <p className="book-author">by {book.author}</p>
        
        <div className="book-rating">
          <span className="stars">⭐ {book.rating}</span>
          <span className="reviews">({book.reviews})</span>
        </div>

        <div className="book-footer">
          <div className="book-price">
            <span className="current-price">₹{book.price}</span>
            {book.originalPrice > book.price && (
              <span className="original-price">₹{book.originalPrice}</span>
            )}
          </div>
          <span className="book-category">{book.category}</span>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
