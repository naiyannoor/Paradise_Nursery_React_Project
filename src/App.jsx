import { useState } from 'react';
import { useSelector } from 'react-redux';
import ProductList from './components/ProductList.jsx';
import CartItem from './components/CartItem.jsx';
import AboutUs from './components/AboutUs.jsx';

export default function App() {
  const [page, setPage] = useState('home');
  const cartCount = useSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  return (
    <div className="app-shell">
      <header className="site-header">
        <button className="brand" onClick={() => setPage('home')} aria-label="Paradise Nursery home">
          <span className="brand-mark">❧</span>
          <span>Paradise <b>Nursery</b></span>
        </button>
        <nav>
          <button onClick={() => setPage('home')}>Home</button>
          <button onClick={() => setPage('shop')}>Shop Plants</button>
          <button onClick={() => setPage('about')}>About Us</button>
          <button className="cart-nav" onClick={() => setPage('cart')}>
            🛒 Cart <span className="cart-count">{cartCount}</span>
          </button>
        </nav>
      </header>

      {page === 'home' && (
        <main className="hero">
          <div className="hero-content">
            <p className="eyebrow">GROW A LITTLE HAPPINESS</p>
            <h1>Paradise Nursery</h1>
            <p className="hero-copy">
              Bring the beauty of nature into your home. Discover easy-care plants
              and thoughtful greenery for every space.
            </p>
            <button className="primary-btn" onClick={() => setPage('shop')}>Get Started <span>→</span></button>
          </div>
          <div className="hero-note">A greener home starts here.</div>
        </main>
      )}

      {page === 'shop' && <ProductList />}
      {page === 'cart' && <CartItem onContinue={() => setPage('shop')} />}
      {page === 'about' && <AboutUs />}
      <footer className="site-footer">© {new Date().getFullYear()} Paradise Nursery. Grow beautifully.</footer>
    </div>
  );
}
