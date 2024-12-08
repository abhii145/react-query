import { render, screen, fireEvent } from "@testing-library/react"
import SortFilter from "../SortFilter"
import { SORT_OPTIONS } from "../../constants"
import { it, expect, describe, vi } from "vitest"

describe("SortFilter", () => {
  const mockOnSortChange = vi.fn()
  const selectedSort = "Price: Low to High"

  it("renders correctly", () => {
    render(
      <SortFilter onSortChange={mockOnSortChange} selectedSort={selectedSort} />
    )
    expect(screen.getByLabelText(/sort by/i)).toBeInTheDocument()
    Object.keys(SORT_OPTIONS).forEach((option) => {
      expect(screen.getByText(option)).toBeInTheDocument()
    })
  })

  it("renders without crashing", () => {
    render(
      <SortFilter onSortChange={mockOnSortChange} selectedSort={selectedSort} />
    )
    expect(screen.getByLabelText(/sort by/i)).toBeInTheDocument()
  })

  it("correct option is selected", () => {
    render(
      <SortFilter onSortChange={mockOnSortChange} selectedSort={selectedSort} />
    )
    expect(screen.getByDisplayValue(selectedSort)).toBeInTheDocument()
  })

  it("calls onSortChange when an option is selected", () => {
    render(
      <SortFilter onSortChange={mockOnSortChange} selectedSort={selectedSort} />
    )
    fireEvent.change(screen.getByLabelText(/sort by/i), {
      target: { value: "Price: High to Low" },
    })
    expect(mockOnSortChange).toHaveBeenCalled()
  })
})
