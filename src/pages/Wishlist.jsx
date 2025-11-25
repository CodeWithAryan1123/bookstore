import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import './Wishlist.css';

const Wishlist = () => {
  const { wishlist, removeFromWishlist, addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (book) => {
    addToCart(book);
    showToast(`${book.title} added to cart!`, 'success');
  };

  if (wishlist.length === 0) {
    return (
      <div className="wishlist-page">
        <div className="container">
          <div className="empty-wishlist">
            <div className="empty-icon"><i className="fa-solid fa-heart"></i></div>
            <h2>Your wishlist is empty</h2>
            <p>Save books you love to buy them later</p>
            <button onClick={() => navigate('/books')} className="btn btn-primary">
              Browse Books
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <div className="container">
        <div className="wishlist-header">
          <h1>My Wishlist</h1>
          <p>{wishlist.length} items</p>
        </div>

        <div className="wishlist-grid">
          {wishlist.map(book => (
            <div key={book.id} className="wishlist-card">
              <button 
                className="remove-wishlist-btn"
                onClick={() => removeFromWishlist(book.id)}
              >
                ✕
              </button>
              <div 
                className="wishlist-image"
                onClick={() => navigate(`/book/${book.id}`)}
              >
                <img src={book.image} alt={book.title} />
              </div>
              <div className="wishlist-info">
                <h3>{book.title}</h3>
                <p className="wishlist-author">by {book.author}</p>
                <div className="wishlist-rating">
                  <span>⭐ {book.rating}</span>
                  <span className="reviews-count">({book.reviews})</span>
                </div>
                <div className="wishlist-price">
                  <span className="current">₹{book.price}</span>
                  {book.originalPrice > book.price && (
                    <span className="original">₹{book.originalPrice}</span>
                  )}
                </div>
                <button 
                  className="btn btn-primary"
                  onClick={() => handleAddToCart(book)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
