import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import BookCard from '../components/BookCard';
import { booksData, categories } from '../data/books';
import './Books.css';

const Books = () => {
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [minRating, setMinRating] = useState(0);

  // Update search query from URL params
  useEffect(() => {
    const searchParam = searchParams.get('search');
    const categoryParam = searchParams.get('category');
    
    if (searchParam) {
      setSearchQuery(searchParam);
    }
    
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams]);

  const filteredBooks = booksData.filter(book => {
    const matchesCategory = selectedCategory === 'All' || book.category === selectedCategory;
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = book.price >= priceRange[0] && book.price <= priceRange[1];
    const matchesRating = book.rating >= minRating;
    return matchesCategory && matchesSearch && matchesPrice && matchesRating;
  });

  const sortedBooks = [...filteredBooks].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'name':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  return (
    <div className="books-page">
      <div className="books-hero">
        <div className="container">
          <h1 className="page-title">Explore Our Collection</h1>
          <p className="page-subtitle">Discover thousands of books across all genres</p>
        </div>
      </div>

      <div className="container">
        <div className="books-content">
          <aside className="books-sidebar">
            <div className="sidebar-section">
              <h3 className="sidebar-title">Search</h3>
              <div className="search-box-sidebar">
                <input
                  type="text"
                  placeholder="Search books..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="search-icon"><i className="fa-solid fa-magnifying-glass"></i></button>
              </div>
            </div>

            <div className="sidebar-section">
              <h3 className="sidebar-title">Categories</h3>
              <div className="category-filters">
                {categories.map(category => (
                  <button
                    key={category}
                    className={`category-filter-btn ${selectedCategory === category ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                    <span className="category-count">
                      ({category === 'All' ? booksData.length : booksData.filter(b => b.category === category).length})
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="sidebar-section">
              <h3 className="sidebar-title">Price Range</h3>
              <div className="price-range">
                <input 
                  type="range" 
                  min="0" 
                  max="1000" 
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                />
                <div className="price-labels">
                  <span>₹{priceRange[0]}</span>
                  <span>₹{priceRange[1]}</span>
                </div>
              </div>
            </div>

            <div className="sidebar-section">
              <h3 className="sidebar-title">Rating</h3>
              <div className="rating-filters">
                {[5, 4, 3].map(rating => (
                  <button 
                    key={rating} 
                    className={`rating-filter-btn ${minRating === rating ? 'active' : ''}`}
                    onClick={() => setMinRating(minRating === rating ? 0 : rating)}
                  >
                    <span className="stars">{'⭐'.repeat(rating)}</span>
                    <span>& Up</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="sidebar-section">
              <button 
                className="btn btn-outline" 
                style={{ width: '100%' }}
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                  setPriceRange([0, 1000]);
                  setMinRating(0);
                  setSortBy('featured');
                }}
              >
                Reset Filters
              </button>
            </div>
          </aside>

          <div className="books-main">
            <div className="books-toolbar">
              <div className="results-info">
                <h2>{selectedCategory === 'All' ? 'All Books' : `${selectedCategory} Books`}</h2>
                <p>{sortedBooks.length} books found</p>
              </div>
              <div className="sort-controls">
                <label>Sort by:</label>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <option value="featured">Featured</option>
                  <option value="name">Name (A-Z)</option>
                  <option value="price-low">Price (Low to High)</option>
                  <option value="price-high">Price (High to Low)</option>
                  <option value="rating">Rating</option>
                </select>
              </div>
            </div>

            {sortedBooks.length > 0 ? (
              <div className="books-grid">
                {sortedBooks.map(book => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            ) : (
              <div className="no-results">
                <div className="no-results-icon">📚</div>
                <h3>No books found</h3>
                <p>Try adjusting your filters or search query</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Books;
