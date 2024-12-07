import { createSlice } from "@reduxjs/toolkit"

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    favorites: [], // List of favorite items
  },
  reducers: {
    toggleFavorite: (state, action) => {
      const item = action.payload
      const existingIndex = state.favorites.findIndex(
        (fav) => fav.id === item.id
      )
      if (existingIndex >= 0) {
        // Remove item if it exists
        state.favorites.splice(existingIndex, 1)
      } else {
        // Add item if it doesn't exist
        state.favorites.push(item)
      }
    },
  },
})

export const { toggleFavorite } = favoritesSlice.actions
export default favoritesSlice.reducer
