import { useState } from 'react';
import { useDispatch } from 'react-redux';
import products from '../data/products.js';
import { addItem } from '../redux/CartSlice.jsx';

const categories = ['All', 'Indoor', 'Flowering', 'Succulents'];

export default function ProductList() {
  const [activeCategory, setActiveCategory] = useState('All');
  const dispatch = useDispatch();
  const visibleProducts = activeCategory === 'All'
    ? products
    : products.filter((product) => product.category === activeCategory);

  return (
    <main className="page-wrap">
      <div className="page-heading">
        <h1>Find Your Green</h1>
        <p>Beautiful plants to make every room feel more alive.</p>
      </div>
      <div className="category-row" aria-label="Filter plants by category">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-btn ${activeCategory === category ? 'active' : ''}`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <section className="product-grid">
        {visibleProducts.map((product) => (
          <article className="product-card" key={product.id}>
            <img src={product.image} alt={product.name} loading="lazy" />
            <div className="product-info">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <div className="product-bottom">
                <span className="price">${product.price.toFixed(2)}</span>
                <button className="small-btn" onClick={() => dispatch(addItem(product))}>
                  Add to Cart
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
