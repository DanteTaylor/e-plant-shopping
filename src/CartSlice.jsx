import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalItems: 0, // Track the total number of items in the cart
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.items.find(item => item.name === action.payload.name);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      // Update total number of items
      state.totalItems += 1;
    },
    removeItem: (state, action) => {
      const itemIndex = state.items.findIndex(item => item.name === action.payload);
      if (itemIndex !== -1) {
        const item = state.items[itemIndex];
        // Deduct the quantity from totalItems before removing the item
        state.totalItems -= item.quantity;
        state.items.splice(itemIndex, 1); // Remove the item from the cart
      }
    },
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const item = state.items.find(item => item.name === name);
      if (item) {
        // Adjust totalItems according to the quantity difference
        const quantityDifference = quantity - item.quantity;
        state.totalItems += quantityDifference;
        item.quantity = quantity;
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
