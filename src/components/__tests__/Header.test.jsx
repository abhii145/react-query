import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import Header from "../Header"
import { describe, test, expect } from "vitest"

describe("Header component", () => {
  test("renders Header component", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    )

    expect(screen.getByText("Logo")).toBeInTheDocument()
    expect(screen.getByTestId("logo-link")).toBeInTheDocument()
    expect(screen.getByTestId("favourite-link")).toBeInTheDocument()
    expect(screen.getByTestId("cart-link")).toBeInTheDocument()
  })

  test("links navigate to correct paths", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    )

    expect(screen.getByTestId("logo-link")).toHaveAttribute("href", "/")
    expect(screen.getByTestId("favourite-link")).toHaveAttribute("href", "/favourite")
    expect(screen.getByTestId("cart-link")).toHaveAttribute("href", "/cart")
  })
})
