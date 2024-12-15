import { render, screen, fireEvent } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import Header from "../Header"
import { describe, it, expect, vi, beforeEach } from "vitest"
import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import cartReducer from "../../store/cartSlice"

const mockNavigate = vi.fn()

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

describe("Header component", () => {
  let store

  beforeEach(() => {
    store = configureStore({
      reducer: {
        cart: cartReducer,
      },
      preloadedState: {
        cart: {
          items: [],
        },
      },
    })
  })

  it("matches snapshot", () => {
    const { asFragment } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it("renders Header component", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    )

    expect(screen.getByText("Logo")).toBeInTheDocument()
    expect(screen.getByTestId("logo-link")).toBeInTheDocument()
    expect(screen.getByTestId("favourite-link")).toBeInTheDocument()
    expect(screen.getByTestId("cart-link")).toBeInTheDocument()
    expect(screen.getByTestId("order-link")).toBeInTheDocument()
  })

  it("links navigate to correct paths", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    )

    expect(screen.getByTestId("logo-link")).toHaveAttribute("href", "/")
    expect(screen.getByTestId("favourite-link")).toHaveAttribute(
      "href",
      "/favourite"
    )
    expect(screen.getByTestId("cart-link")).toHaveAttribute("href", "/cart")
    expect(screen.getByTestId("order-link")).toHaveAttribute("href", "/orders")
  })

  it("displays the correct number of cart items", () => {
    store = configureStore({
      reducer: {
        cart: cartReducer,
      },
      preloadedState: {
        cart: {
          items: [{ id: 1 }, { id: 2 }],
        },
      },
    })

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    )

    expect(screen.getByText("2")).toBeInTheDocument()
  })

  it("updates search query on input change", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    )

    const searchInput = screen.getByPlaceholderText("Search products...")
    fireEvent.change(searchInput, { target: { value: "test" } })

    expect(searchInput.value).toBe("test")
  })

  it("displays the correct search query from URL", () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/products?search=example"]}>
          <Header />
        </MemoryRouter>
      </Provider>
    )

    const searchInput = screen.getByPlaceholderText("Search products...")
    expect(searchInput.value).toBe("example")
  })
})
