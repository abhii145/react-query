import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import { MemoryRouter, Route, Routes } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import cartReducer from "../../store/cartSlice"
import ProductDetails from "../ProductDetails"
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
      cart: cartReducer,
    },
    preloadedState: initialState,
  })
  store.dispatch = vi.fn(store.dispatch)
  return store
}

const queryClient = new QueryClient()

describe("ProductDetails", () => {
  let store

  beforeEach(() => {
    store = createMockStore({
      cart: {
        items: [],
      },
    })
  })

  it("matches snapshot", () => {
    const { asFragment } = render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <MemoryRouter initialEntries={["/product/1"]}>
            <Routes>
              <Route path="/product/:id" element={<ProductDetails />} />
            </Routes>
          </MemoryRouter>
        </QueryClientProvider>
      </Provider>
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it("renders product details correctly", async () => {
    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <MemoryRouter initialEntries={["/product/1"]}>
            <Routes>
              <Route path="/product/:id" element={<ProductDetails />} />
            </Routes>
          </MemoryRouter>
        </QueryClientProvider>
      </Provider>
    )

    await waitFor(
      async () => {
        expect(await screen.findByTestId("product-title")).toBeInTheDocument()
        expect(screen.getByTestId("product-price")).toBeInTheDocument()
      },
      { timeout: 5000 }
    )
  })

  it("handles add to cart", async () => {
    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <MemoryRouter initialEntries={["/product/1"]}>
            <Routes>
              <Route path="/product/:id" element={<ProductDetails />} />
            </Routes>
          </MemoryRouter>
        </QueryClientProvider>
      </Provider>
    )

    fireEvent.click(await screen.findByTestId("add-to-cart"))
    const actions = store.dispatch.mock.calls.map((call) => call[0])
    expect(actions).toContainEqual({
      type: "cart/addToCart",
      payload: {
        id: 1,
        title: "Essence Mascara Lash Princess",
        price: 9.99,
        availabilityStatus: "Low Stock",
        brand: "Essence",
        category: "beauty",
        description:
          "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
        dimensions: {
          depth: 28.01,
          height: 14.43,
          width: 23.17,
        },
        discountPercentage: 7.17,
        images: [
          "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png",
        ],
        meta: {
          barcode: "9164035109868",
          createdAt: "2024-05-23T08:56:21.618Z",
          qrCode: "https://assets.dummyjson.com/public/qr-code.png",
          updatedAt: "2024-05-23T08:56:21.618Z",
        },
        minimumOrderQuantity: 24,
        rating: 4.94,
        returnPolicy: "30 days return policy",
        reviews: [
          {
            comment: "Very unhappy with my purchase!",
            date: "2024-05-23T08:56:21.618Z",
            rating: 2,
            reviewerEmail: "john.doe@x.dummyjson.com",
            reviewerName: "John Doe",
          },
          {
            comment: "Not as described!",
            date: "2024-05-23T08:56:21.618Z",
            rating: 2,
            reviewerEmail: "nolan.gonzalez@x.dummyjson.com",
            reviewerName: "Nolan Gonzalez",
          },
          {
            comment: "Very satisfied!",
            date: "2024-05-23T08:56:21.618Z",
            rating: 5,
            reviewerEmail: "scarlett.wright@x.dummyjson.com",
            reviewerName: "Scarlett Wright",
          },
        ],
        shippingInformation: "Ships in 1 month",
        sku: "RCH45Q1A",
        stock: 5,
        tags: ["beauty", "mascara"],
        thumbnail:
          "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png",
        warrantyInformation: "1 month warranty",
        weight: 2,
      },
    })
    expect(toast.success).toHaveBeenCalledWith("added to cart", {
      position: "bottom-right",
      autoClose: 800,
    })
  })

  it("handles thumbnail click", async () => {
    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <MemoryRouter initialEntries={["/product/1"]}>
            <Routes>
              <Route path="/product/:id" element={<ProductDetails />} />
            </Routes>
          </MemoryRouter>
        </QueryClientProvider>
      </Provider>
    )

    const thumbnail = await screen.findByTestId("thumbnail-0")
    fireEvent.click(thumbnail)
    expect(screen.getByTestId("selected-image")).toHaveAttribute(
      "src",
      "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png"
    )
  })

  it("handles thumbnail keydown", async () => {
    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <MemoryRouter initialEntries={["/product/1"]}>
            <Routes>
              <Route path="/product/:id" element={<ProductDetails />} />
            </Routes>
          </MemoryRouter>
        </QueryClientProvider>
      </Provider>
    )

    const thumbnail = await screen.findByTestId("thumbnail-0")
    fireEvent.keyDown(thumbnail, { key: "Enter" })
    expect(screen.getByTestId("selected-image")).toHaveAttribute(
      "src",
      "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png"
    )
  })
})
