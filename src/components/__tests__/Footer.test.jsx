import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import Footer from "../Footer"
import { test, expect } from "vitest"

test("renders Footer component", () => {
  render(
    <MemoryRouter>
      <Footer />
    </MemoryRouter>
  )

  expect(
    screen.getByText(/Your Company. All rights reserved./i)
  ).toBeInTheDocument()
  expect(
    screen.getByRole("link", { name: /Privacy Policy/i })
  ).toBeInTheDocument()
  expect(
    screen.getByRole("link", { name: /Terms of Service/i })
  ).toBeInTheDocument()
})
