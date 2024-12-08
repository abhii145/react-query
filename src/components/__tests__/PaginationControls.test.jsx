import { render, screen, fireEvent } from "@testing-library/react"
import PaginationControls from "../PaginationControls"
import { it, expect, describe, vi } from "vitest"

describe("PaginationControls", () => {
  const onMove = vi.fn()

  it("disables previous button when disablePrevious is true", () => {
    render(
      <PaginationControls
        disablePrevious={true}
        disableNext={false}
        onMove={onMove}
        limit={10}
      />
    )
    const prevButton = screen.getByText("Previous")
    expect(prevButton).toBeDisabled()
  })

  it("disables next button when disableNext is true", () => {
    render(
      <PaginationControls
        disablePrevious={false}
        disableNext={true}
        onMove={onMove}
        limit={10}
      />
    )
    const nextButton = screen.getByText("Next")
    expect(nextButton).toBeDisabled()
  })

  it("calls onMove with correct value when buttons are clicked", () => {
    render(
      <PaginationControls
        disablePrevious={false}
        disableNext={false}
        onMove={onMove}
        limit={10}
      />
    )
    const prevButton = screen.getByText("Previous")
    const nextButton = screen.getByText("Next")
    fireEvent.click(prevButton)
    expect(onMove).toHaveBeenCalledWith(-10)
    fireEvent.click(nextButton)
    expect(onMove).toHaveBeenCalledWith(10)
  })
})
