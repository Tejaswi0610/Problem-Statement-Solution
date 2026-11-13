const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const products = [
  { id: 1, name: 'Wireless Headphones', category: 'Electronics', price: 2499, rating: 4.5, image: 'https://via.placeholder.com/150' },
  { id: 2, name: 'Smartwatch', category: 'Electronics', price: 4999, rating: 4.0, image: 'https://via.placeholder.com/150' },
  { id: 3, name: 'Cotton Casual Shirt', category: 'Apparel', price: 1299, rating: 3.8, image: 'https://via.placeholder.com/150' },
  { id: 4, name: 'Denim Jeans', category: 'Apparel', price: 1999, rating: 4.2, image: 'https://via.placeholder.com/150' },
  { id: 5, name: 'Running Shoes', category: 'Footwear', price: 3499, rating: 4.7, image: 'https://via.placeholder.com/150' },
  { id: 6, name: 'Formal Leather Shoes', category: 'Footwear', price: 4500, rating: 4.1, image: 'https://via.placeholder.com/150' },
  { id: 7, name: 'Bluetooth Speaker', category: 'Electronics', price: 1799, rating: 4.3, image: 'https://via.placeholder.com/150' },
  { id: 8, name: 'Graphic Hoodie', category: 'Apparel', price: 2199, rating: 4.6, image: 'https://via.placeholder.com/150' }
];

app.post('/api/products', (req, res) => {
  const { categories, minPrice, maxPrice, minRating, sortBy } = req.body;

  let filtered = products.filter(product => {
    if (categories && categories.length > 0 && !categories.includes(product.category)) {
      return false;
    }
    if (minPrice !== undefined && product.price < minPrice) return false;
    if (maxPrice !== undefined && product.price > maxPrice) return false;
    if (minRating !== undefined && product.rating < minRating) return false;
    return true;
  });

  if (sortBy === 'price-low-high') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'top-rated') {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  res.json(filtered);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));