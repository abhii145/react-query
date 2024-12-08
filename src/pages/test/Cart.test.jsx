import { render, screen, fireEvent } from "@testing-library/react"
import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import { MemoryRouter } from "react-router-dom"
import cartReducer from "../../store/cartSlice"
import favoritesReducer from "../../store/favoritesSlice"
import Cart from "../Cart"
import { toast } from "react-toastify"
import { expect, describe, vi, beforeEach, test } from "vitest"

vi.mock("react-toastify", () => ({
  toast: {
    error: vi.fn(),
    info: vi.fn(),
    success: vi.fn(),
  },
}))

const createMockStore = (initialState) => {
  const store = configureStore({
    reducer: {
      cart: cartReducer,
      favorites: favoritesReducer,
    },
    preloadedState: initialState,
  })
  store.dispatch = vi.fn(store.dispatch)
  return store
}

describe("Cart", () => {
  let store

  beforeEach(() => {
    store = createMockStore({
      cart: {
        items: [
          {
            id: 1,
            title: "Product 1",
            description: "Description 1",
            price: 10,
            quantity: 1,
            thumbnail: "thumbnail1.jpg",
          },
        ],
      },
      favorites: {
        favorites: [],
      },
    })
  })

  test("renders empty cart message when cart is empty", () => {
    store = createMockStore({
      cart: { items: [] },
      favorites: { favorites: [] },
    })

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Cart />
        </MemoryRouter>
      </Provider>
    )

    expect(screen.getByText("Your Cart is Empty")).toBeInTheDocument()
  })

  test("renders cart items correctly", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Cart />
        </MemoryRouter>
      </Provider>
    )

    expect(screen.getByText("Product 1")).toBeInTheDocument()
    expect(screen.getByText("Description 1...")).toBeInTheDocument()
    expect(screen.queryAllByText("$10.00").length).toBeGreaterThan(0)
  })

  test("handles increase quantity", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Cart />
        </MemoryRouter>
      </Provider>
    )

    fireEvent.click(screen.getByTestId("increase-1"))
    const actions = store.dispatch.mock.calls.map((call) => call[0])
    expect(actions).toContainEqual({
      type: "cart/increaseQuantity",
      payload: 1,
    })
  })

  test("handles decrease quantity", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Cart />
        </MemoryRouter>
      </Provider>
    )

    fireEvent.click(screen.getByTestId("decrease-1"))
    const actions = store.dispatch.mock.calls.map((call) => call[0])
    expect(actions).toContainEqual({
      type: "cart/decreaseQuantity",
      payload: 1,
    })
  })

  test("handles remove from cart", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Cart />
        </MemoryRouter>
      </Provider>
    )

    fireEvent.click(screen.getByTestId("delete-1"))
    const actions = store.dispatch.mock.calls.map((call) => call[0])
    expect(actions).toContainEqual({ type: "cart/removeFromCart", payload: 1 })
    expect(toast.error).toHaveBeenCalledWith("product deleted", {
      position: "bottom-right",
      autoClose: 800,
    })
  })

  test("handles toggle favorite", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Cart />
        </MemoryRouter>
      </Provider>
    )

    fireEvent.click(screen.getByTestId("favorite-1"))
    const actions = store.dispatch.mock.calls.map((call) => call[0])
    expect(actions).toContainEqual({
      type: "favorites/toggleFavorite",
      payload: {
        id: 1,
        title: "Product 1",
        description: "Description 1",
        price: 10,
        quantity: 1,
        thumbnail: "thumbnail1.jpg",
      },
    })
    expect(toast.success).toHaveBeenCalledWith("Added to favorites", {
      position: "bottom-right",
      autoClose: 800,
    })
  })
})
