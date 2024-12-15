import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  items: [],
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload
      const existingProduct = state.items.find((item) => item.id === product.id)
      if (existingProduct) {
        existingProduct.quantity += 1
      } else {
        state.items.push({ ...product, quantity: 1 })
      }
    },
    increaseQuantity: (state, action) => {
      const productId = action.payload
      const product = state.items.find((item) => item.id === productId)
      if (product) {
        product.quantity += 1
      }
    },
    decreaseQuantity: (state, action) => {
      const productId = action.payload
      const product = state.items.find((item) => item.id === productId)
      if (product && product.quantity > 1) {
        product.quantity -= 1
      }
    },
    removeFromCart: (state, action) => {
      const productId = action.payload
      state.items = state.items.filter((item) => item.id !== productId)
    },
    clearCart: (state) => {
      state.items = []
    },
  },
})

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions
export default cartSlice.reducer
