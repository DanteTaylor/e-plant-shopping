import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
      // Check if the item already exists in the cart
      const existingItem = state.items.find(item => item.name === action.payload.name);
      
      if (existingItem) {
        // If the item exists, increase its quantity
        existingItem.quantity += 1;
      } else {
        // If the item doesn't exist, add it to the cart with a quantity of 1
        state.items.push({
          ...action.payload, // Add all plant details
          quantity: 1,       // Initialize the quantity
        });
      }
    },
    removeItem: (state, action) => {
      // Filter out the item by name to remove it from the cart
      state.items = state.items.filter(item => item.name !== action.payload.name);
    },
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const item = state.items.find(item => item.name === name);
      if (item) {
        item.quantity = quantity;
      }
    },
  },
});

// Export the actions
export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

// Export the reducer as the default export
export default CartSlice.reducer;
