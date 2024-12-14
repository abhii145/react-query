import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import NotFound from "../NotFound"
import { it, expect } from "vitest"

it("matches snapshot", () => {
  const { asFragment } = render(
    <MemoryRouter>
      <NotFound />
    </MemoryRouter>
  )
  expect(asFragment()).toMatchSnapshot()
})

it("renders NotFound component", () => {
  render(
    <MemoryRouter>
      <NotFound />
    </MemoryRouter>
  )

  expect(screen.getByText("404")).toBeInTheDocument()
  expect(screen.getByText("Page not found")).toBeInTheDocument()
  expect(
    screen.getByText("Sorry, we couldn’t find the page you’re looking for.")
  ).toBeInTheDocument()
  expect(
    screen.getByRole("link", { name: /Go back home/i })
  ).toBeInTheDocument()
})
