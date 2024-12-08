import { render, screen, fireEvent } from "@testing-library/react"
import CategoryFilter from "../CategoryFilter"
import { test, expect, describe, vi } from "vitest"

const categories = [
  { slug: "electronics", name: "Electronics" },
  { slug: "fashion", name: "Fashion" },
]

describe("CategoryFilter component", () => {
  test("renders CategoryFilter component", () => {
    const handleCategoryChange = vi.fn()

    render(
      <CategoryFilter
        categories={categories}
        category="All"
        onCategoryChange={handleCategoryChange}
      />
    )

    expect(screen.getByLabelText(/Category:/i)).toBeInTheDocument()
    expect(screen.getByRole("combobox")).toHaveValue("All")
    expect(screen.getByRole("option", { name: "All" })).toBeInTheDocument()
    expect(
      screen.getByRole("option", { name: "Electronics" })
    ).toBeInTheDocument()
    expect(screen.getByRole("option", { name: "Fashion" })).toBeInTheDocument()
  })

  test("calls onCategoryChange when a new category is selected", () => {
    const handleCategoryChange = vi.fn()

    render(
      <CategoryFilter
        categories={categories}
        category="All"
        onCategoryChange={handleCategoryChange}
      />
    )

    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "electronics" },
    })
    expect(handleCategoryChange).toHaveBeenCalled()
  })
})
