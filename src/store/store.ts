// redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slice/cartSlice";
import {
  localStorageMiddleware,
  loadCartState,
} from "./localStorageMiddleware";

const preloadedState = {
  cart: loadCartState(), // Load cart state from localStorage
};

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
