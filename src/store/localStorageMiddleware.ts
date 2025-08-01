// redux/localStorageMiddleware.ts
import { Middleware } from "@reduxjs/toolkit";

// Middleware to save cart state to localStorage
export const localStorageMiddleware: Middleware =
  (store) => (next) => (action) => {
    const result = next(action); // Proceed with the action

    // Save the cart slice to localStorage only on the client side
    if (typeof window !== "undefined") {
      const state = store.getState();
      localStorage.setItem("cart", JSON.stringify(state.cart));
    }

    return result;
  };

// Function to load cart state from localStorage
export const loadCartState = () => {
  if (typeof window === "undefined") {
    // Return undefined during SSR
    return undefined;
  }

  try {
    const serializedState = localStorage.getItem("cart");
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (error) {
    console.error("Failed to load state from localStorage:", error);
    return undefined;
  }
};
