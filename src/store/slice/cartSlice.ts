import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  image: string[];
  color: { name: string; hex: string }[];
  discountPrice: number;
}

interface CartState {
  items: CartItem[];
  favorites: CartItem[]; // Using CartItem here, so favorites require quantity and color as well
}

const initialState: CartState = {
  items: [],
  favorites: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) => item._id === action.payload._id
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
        // alert("This product quantity increased in cart.");
      } else {
        state.items.push(action.payload);
        // alert("Added to your cart successfully.");
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ _id: string; quantity: number }>
    ) => {
      const item = state.items.find((item) => item._id === action.payload._id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    increaseQty: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item._id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decreaseQty: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item._id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
    clearCart: (state) => {
      state.items = [];
      // alert("Your cart has been cleared.");
    },

    // Fix: remove from favorites should filter from favorites, not items
    removeFromFavorites: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter(
        (item) => item._id !== action.payload
      );
    },

    // Toggle favorite: add if not exists, remove if exists
    addToFavorites: (state, action: PayloadAction<CartItem>) => {
      const existingIndex = state.favorites.findIndex(
        (item) => item._id === action.payload._id
      );
      if (existingIndex >= 0) {
        state.favorites.splice(existingIndex, 1);
        // alert("Removed from your favorites!");
      } else {
        state.favorites.push(action.payload);
        // alert("Added to your favorites!");
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  increaseQty,
  decreaseQty,
  clearCart,
  addToFavorites,
  removeFromFavorites,
} = cartSlice.actions;

export default cartSlice.reducer;
