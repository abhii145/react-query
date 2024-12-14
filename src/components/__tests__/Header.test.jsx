import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import Header from "../Header"
import { describe, it, expect, vi } from "vitest"

const mockNavigate = vi.fn()

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

describe("Header component", () => {
  it("matches snapshot", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it("renders Header component", () => {
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

  it("links navigate to correct paths", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    )

    expect(screen.getByTestId("logo-link")).toHaveAttribute("href", "/")
    expect(screen.getByTestId("favourite-link")).toHaveAttribute(
      "href",
      "/favourite"
    )
    expect(screen.getByTestId("cart-link")).toHaveAttribute("href", "/cart")
  })
})
