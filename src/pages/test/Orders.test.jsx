import { render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import Orders from "../Orders"
import orderReducer from "../../store/orderSlice"
import { describe, it, expect, beforeEach } from "vitest"

describe("Orders component", () => {
  let store

  beforeEach(() => {
    store = configureStore({
      reducer: {
        order: orderReducer,
      },
      preloadedState: {
        order: {
          orders: [],
        },
      },
    })
  })

  it("renders 'No Orders Found' message when there are no orders", () => {
    render(
      <Provider store={store}>
        <Orders />
      </Provider>
    )

    expect(screen.getByText("No Orders Found")).toBeInTheDocument()
    expect(
      screen.getByText(
        "Your orders will appear here after a successful purchase."
      )
    ).toBeInTheDocument()
  })

  it("renders orders correctly when there are orders", () => {
    store = configureStore({
      reducer: {
        order: orderReducer,
      },
      preloadedState: {
        order: {
          orders: [
            {
              id: 1,
              date: "2023-10-01",
              items: [
                {
                  id: 1,
                  title: "Product 1",
                  description: "Description for product 1",
                  price: 100,
                  quantity: 2,
                  thumbnail: "image1.jpg",
                },
                {
                  id: 2,
                  title: "Product 2",
                  description: "Description for product 2",
                  price: 200,
                  quantity: 1,
                  thumbnail: "image2.jpg",
                },
              ],
            },
          ],
        },
      },
    })

    render(
      <Provider store={store}>
        <Orders />
      </Provider>
    )

    expect(screen.getByText("Your Orders")).toBeInTheDocument()
    expect(screen.getByText("Order #1")).toBeInTheDocument()
    expect(screen.getByText("2023-10-01")).toBeInTheDocument()
    expect(screen.getByText("Product 1")).toBeInTheDocument()
    expect(screen.getByText("Description for product 1")).toBeInTheDocument()
    expect(screen.getByText("Price: ₹100")).toBeInTheDocument()
    expect(screen.getByText("Quantity: 2")).toBeInTheDocument()
    expect(screen.getByText("Product 2")).toBeInTheDocument()
    expect(screen.getByText("Description for product 2")).toBeInTheDocument()
    expect(screen.getByText("Price: ₹200")).toBeInTheDocument()
    expect(screen.getByText("Quantity: 1")).toBeInTheDocument()
    expect(screen.getByText("Total: ₹400.00")).toBeInTheDocument()
  })
})
