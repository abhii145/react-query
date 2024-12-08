import { configureStore } from "@reduxjs/toolkit"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import counterReducer from "./cartSlice"
import favoritesReducer from "./favoritesSlice"
import { store } from "./store"
import { describe, expect, test } from "vitest"

describe("Redux Store", () => {
  test("should configure store with persisted reducers", () => {
    const persistConfig = {
      key: "root",
      storage,
    }

    const rootReducer = {
      cart: persistReducer(persistConfig, counterReducer),
      favorites: persistReducer(persistConfig, favoritesReducer),
    }

    const testStore = configureStore({
      reducer: rootReducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [
              "persist/FLUSH",
              "persist/REHYDRATE",
              "persist/PAUSE",
              "persist/PERSIST",
              "persist/PURGE",
              "persist/REGISTER",
            ],
          },
        }),
    })

    expect(testStore.getState().cart).toBeDefined()
    expect(testStore.getState().favorites).toBeDefined()
  })

  test("should create persistor", () => {
    const testPersistor = persistStore(store)
    expect(testPersistor).toBeDefined()
  })
})
