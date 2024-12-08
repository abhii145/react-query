// src/components/__tests__/Categories.test.jsx
import { render, screen } from "@testing-library/react"
import Categories from "../Categories"
import { useCategories } from "../../hooks/useProducts"
import { BrowserRouter as Router } from "react-router-dom"
import { it, expect, describe, vi } from "vitest"

// Mock the useCategories hook
vi.mock("../../hooks/useProducts", () => ({
  useCategories: vi.fn(),
}))

describe("Categories", () => {
  it("renders categories correctly", () => {
    const categories = [
      { slug: "electronics", name: "Electronics" },
      { slug: "fashion", name: "Fashion" },
    ]
    useCategories.mockReturnValue({ data: categories, isLoading: false })
    render(
      <Router>
        <Categories />
      </Router>
    )
    expect(screen.getByText(/categories/i)).toBeInTheDocument()
    categories.forEach((category) => {
      expect(screen.getByText(category.name)).toBeInTheDocument()
    })
  })

  it("renders 'View All Products' link", () => {
    useCategories.mockReturnValue({ data: [], isLoading: false })
    render(
      <Router>
        <Categories />
      </Router>
    )
    expect(screen.getByText(/view all products/i)).toBeInTheDocument()
  })

  it("renders category links correctly", () => {
    const categories = [
      { slug: "electronics", name: "Electronics" },
      { slug: "fashion", name: "Fashion" },
    ]
    useCategories.mockReturnValue({ data: categories, isLoading: false })
    render(
      <Router>
        <Categories />
      </Router>
    )
    categories.forEach((category) => {
      expect(screen.getByRole("link", { name: category.name })).toHaveAttribute(
        "href",
        `/products?category=${category.slug}`
      )
    })
  })
})
