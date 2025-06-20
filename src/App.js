import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching products:', err);
        setLoading(false);
      });
  }, []);

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Product List</h1>
      <input
        type="text"
        placeholder="Search by product name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="product-list">
          {filteredProducts.map(product => (
            <div key={product.id} className="product-card">
              <h2>{product.title}</h2>
              <p>{product.description.substring(0, 100)}...</p>
              <p className="price">${product.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
