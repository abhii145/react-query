import { render } from "@testing-library/react"
import Loader from "../Loading"
import { test, expect } from "vitest"

test("renders Loader component", () => {
  const { container } = render(<Loader />)
  expect(container.firstChild).toHaveClass(
    "flex items-center justify-center min-h-screen bg-gray-100"
  )
})
