import { configureStore } from "@reduxjs/toolkit"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import counterReducer from "./cartSlice"
import favoritesReducer from "./favoritesSlice"

const persistConfig = {
  key: "root",
  storage,
}

const rootReducer = {
  cart: persistReducer(persistConfig, counterReducer),
  favorites: persistReducer(persistConfig, favoritesReducer),
}

export const store = configureStore({
  reducer: rootReducer,
})

export const persistor = persistStore(store)
