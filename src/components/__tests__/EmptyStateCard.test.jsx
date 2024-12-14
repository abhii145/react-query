import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import EmptyStateCard from "../EmptyStateCard"
import { it, expect } from "vitest"

it("matches snapshot", () => {
  const { asFragment } = render(
    <MemoryRouter>
      <EmptyStateCard
        heading="No items found"
        subheading="Try adding some items to your cart."
        buttonLabel="Go to Shop"
      />
    </MemoryRouter>
  )
  expect(asFragment()).toMatchSnapshot()
})
it("renders EmptyStateCard component", () => {
  render(
    <MemoryRouter>
      <EmptyStateCard
        heading="No items found"
        subheading="Try adding some items to your cart."
        buttonLabel="Go to Shop"
      />
    </MemoryRouter>
  )

  expect(screen.getByText("No items found")).toBeInTheDocument()
  expect(
    screen.getByText("Try adding some items to your cart.")
  ).toBeInTheDocument()
  expect(
    screen.getByRole("button", { name: /Go to Shop/i })
  ).toBeInTheDocument()
})
