import { render, screen, fireEvent } from "@testing-library/react"
import SearchBar from "../SearchBar"
import { it, expect, describe, vi } from "vitest"

describe("SearchBar", () => {
  const onSearchChange = vi.fn()

  it("renders input with initial value", () => {
    render(<SearchBar searchQuery="test" onSearchChange={onSearchChange} />)
    const input = screen.getByPlaceholderText("Search products...")
    expect(input.value).toBe("test")
  })

  it("calls onSearchChange on input change", () => {
    render(<SearchBar searchQuery="" onSearchChange={onSearchChange} />)
    const input = screen.getByPlaceholderText("Search products...")
    fireEvent.change(input, { target: { value: "new value" } })
    expect(onSearchChange).toHaveBeenCalledWith("new value")
  })

  it("clears input when clear button is clicked", () => {
    render(<SearchBar searchQuery="test" onSearchChange={onSearchChange} />)
    const input = screen.getByPlaceholderText("Search products...")
    const clearButton = screen.getByTestId("clear-button")
    fireEvent.click(clearButton)
    expect(input.value).toBe("")
    expect(onSearchChange).toHaveBeenCalledWith("")
  })
})
