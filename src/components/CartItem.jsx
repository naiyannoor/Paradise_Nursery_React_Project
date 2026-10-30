import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from '../redux/CartSlice.jsx';

export default function CartItem({ onContinue }) {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (items.length === 0) {
    return (
      <main className="page-wrap">
        <div className="page-heading"><h1>Your Shopping Cart</h1></div>
        <section className="empty-cart">
          <h2>Your cart is waiting for some greenery.</h2>
          <p>Explore the collection and add your favourite plants.</p>
          <button className="primary-btn" onClick={onContinue}>Continue Shopping</button>
        </section>
      </main>
    );
  }

  return (
    <main className="page-wrap">
      <div className="page-heading">
        <h1>Your Shopping Cart</h1>
        <p>Review your plants and update quantities below.</p>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table className="cart-table">
          <thead>
            <tr><th>Plant</th><th>Price</th><th>Quantity</th><th>Subtotal</th><th>Action</th></tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>
                  <div className="cart-product">
                    <img src={item.image} alt={item.name} />
                    <span>{item.name}</span>
                  </div>
                </td>
                <td>${item.price.toFixed(2)}</td>
                <td>
                  <div className="quantity-control">
                    <button aria-label={`Decrease ${item.name} quantity`} onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}>−</button>
                    <strong>{item.quantity}</strong>
                    <button aria-label={`Increase ${item.name} quantity`} onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}>+</button>
                  </div>
                </td>
                <td>${(item.price * item.quantity).toFixed(2)}</td>
                <td><button className="remove-btn" onClick={() => dispatch(removeItem(item.id))}>Remove</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <section className="cart-summary">
        <div className="summary-line"><span>Items</span><strong>{items.reduce((sum, item) => sum + item.quantity, 0)}</strong></div>
        <div className="summary-line"><span>Subtotal</span><strong>${subtotal.toFixed(2)}</strong></div>
        <div className="summary-line"><span>Delivery</span><strong>Calculated at checkout</strong></div>
        <div className="summary-line summary-total"><span>Total</span><span>${subtotal.toFixed(2)}</span></div>
        <button className="primary-btn" style={{ width: '100%' }} onClick={onContinue}>Continue Shopping</button>
      </section>
    </main>
  );
}
