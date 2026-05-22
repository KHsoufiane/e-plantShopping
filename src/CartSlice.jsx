import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    // 1. Add item to the cart or increment quantity if it already exists
    addItem: (state, action) => {
      const { name, image, cost } = action.payload; // Destructure product details from the action payload
      
      // Check if the item already exists in the cart by comparing names
      const existingItem = state.items.find(item => item.name === name);
      if (existingItem) {
        // If item already exists in the cart, increase its quantity
        existingItem.quantity++;
      } else {
        // If item does not exist, add it to the cart with quantity 1
        state.items.push({ name, image, cost, quantity: 1 });
      }
    },

    // 2. Remove an item entirely from the cart based on its name
    removeItem: (state, action) => {
      // Filter out the item matching the product name passed in action.payload
      state.items = state.items.filter(item => item.name !== action.payload);
    },

    // 3. Update the specific quantity of an item from the Cart view
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload; // Destructure the product name and new quantity from the action payload
      
      // Find the item in the cart that matches the given name
      const itemToUpdate = state.items.find(item => item.name === name);
      if (itemToUpdate) {
        itemToUpdate.quantity = quantity; // If the item is found, update its quantity to the new value
      }
    },
  },
});

// Export action creators to use across components (ProductList.jsx and CartItem.jsx)
export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

// Export the reducer as default to configure inside store.js
export default CartSlice.reducer;