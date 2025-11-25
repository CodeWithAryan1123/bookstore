import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
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
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState({
    author: '',
    yearFrom: '',
    yearTo: '',
    language: 'all',
    inStock: false
  });
  const [compareList, setCompareList] = useState([]);
  const [showCompareModal, setShowCompareModal] = useState(false);

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
    
    // Advanced filters
    const matchesAuthor = !advancedFilters.author || 
                         book.author.toLowerCase().includes(advancedFilters.author.toLowerCase());
    const matchesLanguage = advancedFilters.language === 'all' || 
                           (book.language || 'English') === advancedFilters.language;
    
    return matchesCategory && matchesSearch && matchesPrice && matchesRating && 
           matchesAuthor && matchesLanguage;
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

  const handleCompareToggle = (book) => {
    if (compareList.find(b => b.id === book.id)) {
      setCompareList(compareList.filter(b => b.id !== book.id));
    } else if (compareList.length < 4) {
      setCompareList([...compareList, book]);
    } else {
      alert('You can compare up to 4 books at a time');
    }
  };

  const clearCompare = () => {
    setCompareList([]);
    setShowCompareModal(false);
  };

  const resetAdvancedFilters = () => {
    setAdvancedFilters({
      author: '',
      yearFrom: '',
      yearTo: '',
      language: 'all',
      inStock: false
    });
  };

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
              <button 
                className="advanced-search-toggle"
                onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
              >
                <i className="fa-solid fa-sliders"></i>
                {showAdvancedSearch ? 'Hide' : 'Show'} Advanced Filters
              </button>

              {showAdvancedSearch && (
                <div className="advanced-search-panel">
                  <div className="advanced-filter-group">
                    <label>Author Name</label>
                    <input
                      type="text"
                      placeholder="Search by author..."
                      value={advancedFilters.author}
                      onChange={(e) => setAdvancedFilters({...advancedFilters, author: e.target.value})}
                    />
                  </div>

                  <div className="advanced-filter-group">
                    <label>Language</label>
                    <select
                      value={advancedFilters.language}
                      onChange={(e) => setAdvancedFilters({...advancedFilters, language: e.target.value})}
                    >
                      <option value="all">All Languages</option>
                      <option value="English">English</option>
                      <option value="Hindi">Hindi</option>
                      <option value="Spanish">Spanish</option>
                      <option value="French">French</option>
                    </select>
                  </div>

                  <button 
                    className="reset-filters-btn"
                    onClick={resetAdvancedFilters}
                  >
                    <i className="fa-solid fa-rotate-right"></i> Reset Filters
                  </button>
                </div>
              )}
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
                <div className="price-preset-buttons">
                  <button 
                    className={`price-preset-btn ${priceRange[0] === 0 && priceRange[1] === 1000 ? 'active' : ''}`}
                    onClick={() => setPriceRange([0, 1000])}
                  >
                    All Prices
                  </button>
                  <button 
                    className={`price-preset-btn ${priceRange[0] === 0 && priceRange[1] === 200 ? 'active' : ''}`}
                    onClick={() => setPriceRange([0, 200])}
                  >
                    Under ₹200
                  </button>
                  <button 
                    className={`price-preset-btn ${priceRange[0] === 0 && priceRange[1] === 500 ? 'active' : ''}`}
                    onClick={() => setPriceRange([0, 500])}
                  >
                    Under ₹500
                  </button>
                  <button 
                    className={`price-preset-btn ${priceRange[0] === 500 && priceRange[1] === 1000 ? 'active' : ''}`}
                    onClick={() => setPriceRange([500, 1000])}
                  >
                    ₹500 - ₹1000
                  </button>
                </div>
                
                <div className="dual-range-slider">
                  <input 
                    type="range" 
                    min="0" 
                    max="1000" 
                    step="50"
                    value={priceRange[0]}
                    onChange={(e) => {
                      const newMin = parseInt(e.target.value);
                      if (newMin < priceRange[1]) {
                        setPriceRange([newMin, priceRange[1]]);
                      }
                    }}
                    className="range-min"
                  />
                  <input 
                    type="range" 
                    min="0" 
                    max="1000" 
                    step="50"
                    value={priceRange[1]}
                    onChange={(e) => {
                      const newMax = parseInt(e.target.value);
                      if (newMax > priceRange[0]) {
                        setPriceRange([priceRange[0], newMax]);
                      }
                    }}
                    className="range-max"
                  />
                  <div className="slider-track">
                    <div 
                      className="slider-range" 
                      style={{
                        left: `${(priceRange[0] / 1000) * 100}%`,
                        width: `${((priceRange[1] - priceRange[0]) / 1000) * 100}%`
                      }}
                    ></div>
                  </div>
                </div>
                
                <div className="price-labels">
                  <div className="price-input-group">
                    <label>Min</label>
                    <input 
                      type="number" 
                      min="0" 
                      max={priceRange[1]}
                      value={priceRange[0]}
                      onChange={(e) => {
                        const newMin = parseInt(e.target.value) || 0;
                        if (newMin < priceRange[1]) {
                          setPriceRange([newMin, priceRange[1]]);
                        }
                      }}
                      className="price-input"
                    />
                  </div>
                  <span className="price-separator">—</span>
                  <div className="price-input-group">
                    <label>Max</label>
                    <input 
                      type="number" 
                      min={priceRange[0]} 
                      max="1000"
                      value={priceRange[1]}
                      onChange={(e) => {
                        const newMax = parseInt(e.target.value) || 1000;
                        if (newMax > priceRange[0]) {
                          setPriceRange([priceRange[0], newMax]);
                        }
                      }}
                      className="price-input"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="sidebar-section">
              <h3 className="sidebar-title">Customer Rating</h3>
              <div className="rating-filters">
                <div className="rating-summary">
                  <div className="rating-summary-main">
                    <span className="rating-number">
                      {minRating > 0 ? `${minRating}.0+` : 'All'}
                    </span>
                    <div className="rating-stars-display">
                      {[1, 2, 3, 4, 5].map(star => (
                        <span 
                          key={star} 
                          className={`star-icon ${star <= minRating ? 'filled' : ''}`}
                        >
                          {star <= minRating ? '★' : '☆'}
                        </span>
                      ))}
                    </div>
                  </div>
                  {minRating > 0 && (
                    <button 
                      className="clear-rating-btn"
                      onClick={() => setMinRating(0)}
                      title="Clear rating filter"
                    >
                      <i className="fa-solid fa-xmark"></i>
                    </button>
                  )}
                </div>

                <div className="rating-options">
                  {[5, 4, 3, 2, 1].map(rating => {
                    const count = booksData.filter(b => Math.floor(b.rating) === rating).length;
                    return (
                      <button 
                        key={rating} 
                        className={`rating-option-btn ${minRating === rating ? 'active' : ''}`}
                        onClick={() => setMinRating(minRating === rating ? 0 : rating)}
                      >
                        <div className="rating-option-left">
                          <span className="rating-stars">
                            {[1, 2, 3, 4, 5].map(star => (
                              <span 
                                key={star} 
                                className={star <= rating ? 'filled' : 'empty'}
                              >
                                ★
                              </span>
                            ))}
                          </span>
                          <span className="rating-text">
                            {rating === 5 ? 'Perfect' : rating === 4 ? 'Excellent' : rating === 3 ? 'Good' : rating === 2 ? 'Fair' : 'Any'}
                          </span>
                        </div>
                        <div className="rating-option-right">
                          <span className="rating-count">{count}</span>
                          <div className="rating-bar">
                            <div 
                              className="rating-bar-fill" 
                              style={{width: `${(count / booksData.length) * 100}%`}}
                            ></div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="rating-quick-filters">
                  <button 
                    className={`quick-filter-chip ${minRating >= 4 ? 'active' : ''}`}
                    onClick={() => setMinRating(minRating >= 4 ? 0 : 4)}
                  >
                    <i className="fa-solid fa-award"></i>
                    Top Rated
                  </button>
                  <button 
                    className={`quick-filter-chip ${minRating === 0 ? 'active' : ''}`}
                    onClick={() => setMinRating(0)}
                  >
                    <i className="fa-solid fa-globe"></i>
                    All Ratings
                  </button>
                </div>
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
              <div className="toolbar-actions">
                {compareList.length > 0 && (
                  <button 
                    className="compare-btn"
                    onClick={() => setShowCompareModal(true)}
                  >
                    <i className="fa-solid fa-code-compare"></i>
                    Compare ({compareList.length})
                  </button>
                )}
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
            </div>

            {sortedBooks.length > 0 ? (
              <div className="books-grid">
                {sortedBooks.map(book => (
                  <div key={book.id} className="book-card-wrapper">
                    <BookCard 
                      book={book} 
                      onCompareToggle={handleCompareToggle}
                      isInCompare={!!compareList.find(b => b.id === book.id)}
                    />
                  </div>
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

      {/* Compare Modal */}
      {showCompareModal && compareList.length > 0 && (
        <div className="compare-modal-overlay" onClick={() => setShowCompareModal(false)}>
          <div className="compare-modal" onClick={(e) => e.stopPropagation()}>
            <div className="compare-modal-header">
              <h2>
                <i className="fa-solid fa-code-compare"></i>
                Compare Books ({compareList.length})
              </h2>
              <button className="close-modal" onClick={() => setShowCompareModal(false)}>
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <div className="compare-table-wrapper">
              <table className="compare-table">
                <thead>
                  <tr>
                    <th className="feature-column">Feature</th>
                    {compareList.map(book => (
                      <th key={book.id} className="book-column">
                        <div className="compare-book-header">
                          <img src={book.image} alt={book.title} />
                          <button 
                            className="remove-compare"
                            onClick={() => handleCompareToggle(book)}
                            title="Remove from comparison"
                          >
                            <i className="fa-solid fa-xmark"></i>
                          </button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="feature-label">Title</td>
                    {compareList.map(book => (
                      <td key={book.id}>
                        <Link to={`/book/${book.id}`} className="book-title-link">
                          {book.title}
                        </Link>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="feature-label">Author</td>
                    {compareList.map(book => (
                      <td key={book.id}>{book.author}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="feature-label">Price</td>
                    {compareList.map(book => (
                      <td key={book.id} className="price-cell">
                        <span className="compare-price">₹{book.price}</span>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="feature-label">Rating</td>
                    {compareList.map(book => (
                      <td key={book.id}>
                        <span className="rating-display">
                          ⭐ {book.rating} / 5
                        </span>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="feature-label">Category</td>
                    {compareList.map(book => (
                      <td key={book.id}>
                        <span className="category-badge">{book.category}</span>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="feature-label">Description</td>
                    {compareList.map(book => (
                      <td key={book.id} className="description-cell">
                        {book.description}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="feature-label">Action</td>
                    {compareList.map(book => (
                      <td key={book.id}>
                        <Link to={`/book/${book.id}`} className="btn btn-primary btn-sm">
                          View Details
                        </Link>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="compare-modal-footer">
              <button className="btn btn-secondary" onClick={clearCompare}>
                <i className="fa-solid fa-trash"></i> Clear All
              </button>
              <button className="btn btn-primary" onClick={() => setShowCompareModal(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Books;
