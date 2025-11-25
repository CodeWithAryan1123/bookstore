import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { showToast } from '../utils/toast';
import { useLazyLoad } from '../hooks/useLazyLoad';
import './BookCard.css';

const BookCard = ({ book, onCompareToggle, isInCompare }) => {
  const { addToCart, addToWishlist, isInWishlist } = useCart();
  const navigate = useNavigate();
  const { imageSrc, imageRef } = useLazyLoad(book.image);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(book);
    showToast(`${book.title} added to cart!`, 'success');
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    addToWishlist(book);
    showToast('Added to wishlist!', 'success');
  };

  const discount = Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100);

  return (
    <div 
      className="book-card" 
      onClick={() => navigate(`/book/${book.id}`)}
      role="article"
      aria-label={`${book.title} by ${book.author}`}
      tabIndex="0"
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          navigate(`/book/${book.id}`);
        }
      }}
    >
      {book.bestseller && (
        <div className="badge-bestseller" aria-label="Bestseller book">
          <i className="fa-solid fa-trophy" aria-hidden="true"></i> Bestseller
        </div>
      )}
      {discount > 0 && (
        <div className="badge-discount" aria-label={`${discount}% discount`}>
          -{discount}%
        </div>
      )}
      
      <div className="book-image-wrapper">
        <img 
          ref={imageRef}
          src={imageSrc || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 400"%3E%3Crect fill="%23f0f0f0" width="300" height="400"/%3E%3C/svg%3E'}
          alt={`Cover of ${book.title}`} 
          className="book-image"
          loading="lazy"
          style={!imageSrc ? { backgroundColor: '#f0f0f0' } : {}}
        />
        <div className="book-overlay">
          <button 
            className="overlay-btn" 
            onClick={handleAddToCart}
            aria-label={`Add ${book.title} to cart`}
          >
            <i className="fa-solid fa-cart-shopping" aria-hidden="true"></i> Add to Cart
          </button>
          <button 
            className={`overlay-btn wishlist-btn ${isInWishlist(book.id) ? 'active' : ''}`}
            onClick={handleWishlist}
            aria-label={isInWishlist(book.id) ? `Remove ${book.title} from wishlist` : `Add ${book.title} to wishlist`}
            aria-pressed={isInWishlist(book.id)}
          >
            <i className="fa-solid fa-heart" aria-hidden="true"></i> {isInWishlist(book.id) ? 'In Wishlist' : 'Wishlist'}
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
              aria-label={isInCompare ? `Remove ${book.title} from compare` : `Add ${book.title} to compare`}
              aria-pressed={isInCompare}
              title={isInCompare ? "Remove from compare" : "Add to compare"}
            >
              <i 
                className={`fa-solid ${isInCompare ? 'fa-check-circle' : 'fa-plus-circle'}`}
                aria-hidden="true"
              ></i>
            </button>
          )}
        </div>
        <p className="book-author">by {book.author}</p>
        
        <div className="book-rating" role="img" aria-label={`Rating: ${book.rating} out of 5 stars, ${book.reviews} reviews`}>
          <span className="stars" aria-hidden="true">⭐ {book.rating}</span>
          <span className="reviews" aria-hidden="true">({book.reviews})</span>
        </div>

        <div className="book-footer">
          <div className="book-price" aria-label={`Price: ${book.price} rupees${book.originalPrice > book.price ? `, was ${book.originalPrice} rupees` : ''}`}>
            <span className="current-price" aria-hidden="true">₹{book.price}</span>
            {book.originalPrice > book.price && (
              <span className="original-price" aria-hidden="true">₹{book.originalPrice}</span>
            )}
          </div>
          <span className="book-category">{book.category}</span>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
