import React from 'react';
import { useSelector, useDispatch } from 'react-redux'; // Just import the dispatch and selector hooks
import { removeItem, updateQuantity } from './CartSlice'; // Import actions, don't export them
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector((state) => state.cart.items); // Get cart items from Redux store
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => {
      // Ensure quantity and cost are valid numbers
      const quantity = parseFloat(item.quantity) || 0;
      const cost = parseFloat(item.cost) || 0;
      return total + (quantity * cost); // Add item total (quantity * cost) to the running total
    }, 0); // Initial total is 0
  };
  

  // Handle incrementing the quantity of an item
  const handleIncrement = (item) => {
    const updatedQuantity = item.quantity + 1;
    dispatch(updateQuantity({ name: item.name, quantity: updatedQuantity }));
  };

  // Handle decrementing the quantity of an item
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      const updatedQuantity = item.quantity - 1;
      dispatch(updateQuantity({ name: item.name, quantity: updatedQuantity }));
    }
  };

  // Handle removing an item from the cart
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    const quantity = parseFloat(item.quantity) || 0;
    const cost = parseFloat(item.cost) || 0;
    return quantity * cost;
  };

  // Handle the "Continue Shopping" button click
  const handleContinueShopping = (e) => {
    onContinueShopping && onContinueShopping(e);
  };
  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${Math.round(calculateTotalAmount())}</h2>

      <div>
        {cart.map((item) => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button
                  className="cart-item-button cart-item-button-dec"
                  onClick={() => handleDecrement(item)}
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button
                  className="cart-item-button cart-item-button-inc"
                  onClick={() => handleIncrement(item)}
                >
                  +
                </button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className="total_cart_amount"></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={handleContinueShopping}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={handleCheckoutShopping}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem; // Only export the React component
