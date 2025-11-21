import React, { useState } from 'react';
import BookCard from '../components/BookCard';
import { booksData } from '../data/books';
import './Bestsellers.css';

const Bestsellers = () => {
  const [sortBy, setSortBy] = useState('rating');

  const bestsellerBooks = booksData.filter(book => book.bestseller);

  const sortedBooks = [...bestsellerBooks].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'name':
        return a.title.localeCompare(b.title);
      case 'reviews':
        return b.reviews - a.reviews;
      default:
        return 0;
    }
  });

  return (
    <div className="bestsellers-page">
      <div className="bestsellers-hero">
        <div className="container">
          <div className="hero-badge">🏆 Bestsellers</div>
          <h1 className="page-title">Top Bestselling Books</h1>
          <p className="page-subtitle">
            Discover the most popular and highly-rated books loved by thousands of readers
          </p>
        </div>
      </div>

      <div className="container">
        <div className="bestsellers-stats">
          <div className="stat-card">
            <div className="stat-icon"><i className="fa-solid fa-book"></i></div>
            <div className="stat-info">
              <h3>{sortedBooks.length}</h3>
              <p>Bestselling Books</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon"><i className="fa-solid fa-star"></i></div>
            <div className="stat-info">
              <h3>{(sortedBooks.reduce((acc, book) => acc + book.rating, 0) / sortedBooks.length).toFixed(1)}</h3>
              <p>Average Rating</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon"><i className="fa-solid fa-comment"></i></div>
            <div className="stat-info">
              <h3>{(sortedBooks.reduce((acc, book) => acc + book.reviews, 0) / 1000).toFixed(0)}K+</h3>
              <p>Total Reviews</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon"><i className="fa-solid fa-sack-dollar"></i></div>
            <div className="stat-info">
              <h3>20%</h3>
              <p>Avg. Discount</p>
            </div>
          </div>
        </div>

        <div className="bestsellers-toolbar">
          <h2>Featured Bestsellers</h2>
          <div className="sort-controls">
            <label>Sort by:</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="rating">Highest Rated</option>
              <option value="reviews">Most Reviewed</option>
              <option value="name">Name (A-Z)</option>
              <option value="price-low">Price (Low to High)</option>
              <option value="price-high">Price (High to Low)</option>
            </select>
          </div>
        </div>

        <div className="bestsellers-grid">
          {sortedBooks.map(book => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>

        <div className="bestsellers-cta">
          <h2>Looking for More?</h2>
          <p>Explore our complete collection of books across all categories</p>
          <a href="/books" className="btn btn-primary">
            Browse All Books
          </a>
        </div>
      </div>
    </div>
  );
};

export default Bestsellers;
