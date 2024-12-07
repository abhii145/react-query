import { configureStore } from "@reduxjs/toolkit"
import counterReducer from "./cartSlice"
import favoritesReducer from "./favoritesSlice"

export const store = configureStore({
  reducer: {
    cart: counterReducer,
    favorites: favoritesReducer,
  },
})
