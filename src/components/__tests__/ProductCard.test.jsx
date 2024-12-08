import { render, screen } from "@testing-library/react"
import { BrowserRouter as Router } from "react-router-dom"
import ProductCard from "../ProductCard"
import { it, expect, describe } from "vitest"

const products = [
  {
    id: 1,
    title: "Product 1",
    thumbnail: "image1.jpg",
    category: "Category 1",
    price: 100,
  },
  {
    id: 2,
    title: "Product 2",
    thumbnail: "image2.jpg",
    category: "Category 2",
    price: 200,
  },
]

describe("ProductCard", () => {
  it("renders product cards", () => {
    render(
      <Router>
        <ProductCard products={products} />
      </Router>
    )
    expect(screen.getByText("Product 1")).toBeInTheDocument()
    expect(screen.getByText("Product 2")).toBeInTheDocument()
  })

  it("renders product details", () => {
    render(
      <Router>
        <ProductCard products={products} />
      </Router>
    )
    expect(screen.getByText("Category 1")).toBeInTheDocument()
    expect(screen.getByText("100")).toBeInTheDocument()
  })
})
