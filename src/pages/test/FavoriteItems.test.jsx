import { render, screen, fireEvent } from "@testing-library/react"
import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import { MemoryRouter } from "react-router-dom"
import favoritesReducer from "../../store/favoritesSlice"
import FavoriteItems from "../FavoriteItems"
import { toast } from "react-toastify"
import { expect, describe, vi, beforeEach, it } from "vitest"

vi.mock("react-toastify", () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
}))

const createMockStore = (initialState) => {
  const store = configureStore({
    reducer: {
      favorites: favoritesReducer,
    },
    preloadedState: initialState,
  })
  store.dispatch = vi.fn(store.dispatch)
  return store
}

describe("FavoriteItems", () => {
  let store

  beforeEach(() => {
    store = createMockStore({
      favorites: {
        favorites: [
          {
            id: 1,
            title: "Favorite Product 1",
            name: "Product 1",
            price: 20,
            thumbnail: "thumbnail1.jpg",
          },
        ],
      },
    })
  })


    it("matches snapshot", () => {
      const { asFragment } = render(
        <Provider store={store}>
          <MemoryRouter>
            <FavoriteItems />
          </MemoryRouter>
        </Provider>
      )
      expect(asFragment()).toMatchSnapshot()
    })

  it("renders empty favorites message when there are no favorite items", () => {
    store = createMockStore({
      favorites: { favorites: [] },
    })

    render(
      <Provider store={store}>
        <MemoryRouter>
          <FavoriteItems />
        </MemoryRouter>
      </Provider>
    )

    expect(screen.getByText("Your Favorites is Empty")).toBeInTheDocument()
  })

  it("renders favorite items correctly", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <FavoriteItems />
        </MemoryRouter>
      </Provider>
    )

    expect(screen.getByText("Favorite Product 1")).toBeInTheDocument()
    expect(screen.getByText("$20")).toBeInTheDocument()
  })

  it("handles remove from favorites", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <FavoriteItems />
        </MemoryRouter>
      </Provider>
    )

    fireEvent.click(screen.getByTestId("delete-1"))
    const actions = store.dispatch.mock.calls.map((call) => call[0])
    expect(actions).toContainEqual({
      type: "favorites/toggleFavorite",
      payload: {
        id: 1,
        title: "Favorite Product 1",
        name: "Product 1",
        price: 20,
        thumbnail: "thumbnail1.jpg",
      },
    })
    expect(toast.error).toHaveBeenCalledWith("Removed from favorites", {
      position: "bottom-right",
      autoClose: 800,
    })
  })


})