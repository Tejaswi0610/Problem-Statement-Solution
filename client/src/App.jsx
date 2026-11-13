import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('');

  // Available category options for checklist
  const categoryOptions = ['Electronics', 'Apparel', 'Footwear'];

  // Fetch products from backend whenever any filter changes (Instant Feedback)
  useEffect(() => {
    fetch('http://localhost:5000/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ categories, minPrice, maxPrice, minRating, sortBy }),
    })
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Error fetching products:', err));
  }, [categories, minPrice, maxPrice, minRating, sortBy]);

  // Handle Category Checkbox change
  const handleCategoryChange = (cat) => {
    if (categories.includes(cat)) {
      setCategories(categories.filter(c => c !== cat));
    } else {
      setCategories([...categories, cat]);
    }
  };

  // Reset all filters
  const resetFilters = () => {
    setCategories([]);
    setMinPrice(0);
    setMaxPrice(10000);
    setMinRating(0);
    setSortBy('');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
      {/* Sticky Sidebar */}
      <aside style={{ width: '280px', padding: '20px', background: '#f8f9fa', borderRight: '1px solid #dee2e6', position: 'sticky', top: 0, height: '100vh', overflowY: 'auto' }}>
        <h2>Filters</h2>
        <button onClick={resetFilters} style={{ marginBottom: '20px', padding: '5px 10px', background: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Reset All Filters
        </button>

        {/* 1. Category Checklist */}
        <div style={{ marginBottom: '20px' }}>
          <h4>Category</h4>
          {categoryOptions.map(cat => (
            <div key={cat} style={{ margin: '8px 0' }}>
              <label>
                <input
                  type="checkbox"
                  checked={categories.includes(cat)}
                  onChange={() => handleCategoryChange(cat)}
                />{' '}
                {cat}
              </label>
            </div>
          ))}
        </div>

        {/* 2. Price Range Slider */}
        <div style={{ marginBottom: '20px' }}>
          <h4>Max Price: ₹{maxPrice}</h4>
          <input
            type="range"
            min="0"
            max="10000"
            step="500"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            style={{ width: '100%' }}
          />
        </div>

        {/* 3. Minimum Star Rating */}
        <div style={{ marginBottom: '20px' }}>
          <h4>Minimum Star Rating</h4>
          {[1, 2, 3, 4, 5].map(star => (
            <div key={star} style={{ margin: '5px 0' }}>
              <label>
                <input
                  type="radio"
                  name="rating"
                  checked={minRating === star}
                  onChange={() => setMinRating(star)}
                />{' '}
                {star} Stars & Above
              </label>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: '20px', background: '#fff' }}>
        {/* Top bar with Sort Dropdown */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h1>Product Catalog</h1>
          <div>
            <label htmlFor="sort">Sort By: </label>
            <select id="sort" value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{ padding: '5px' }}>
              <option value="">Default</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="top-rated">Top Rated First</option>
            </select>
          </div>
        </div>

        {/* Dynamic Product Grid / Zero-State Fallback */}
        {products.length === 0 ? (
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h3>No items match your criteria.</h3>
            <button onClick={resetFilters} style={{ padding: '10px 20px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '10px' }}>
              Reset filters
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
            {products.map(product => (
              <div key={product.id} style={{ border: '1px solid #dee2e6', borderRadius: '8px', padding: '15px', background: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                <img src={product.image} alt={product.name} style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '4px' }} />
                <h3 style={{ fontSize: '16px', margin: '10px 0 5px' }}>{product.name}</h3>
                <p style={{ color: '#6c757d', margin: '0 0 5px' }}>{product.category}</p>
                <p style={{ fontWeight: 'bold', margin: '0 0 5px' }}>₹{product.price}</p>
                <p style={{ color: '#ffc107', margin: 0 }}>★ {product.rating}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

App.defaultExport = App;
export default App;