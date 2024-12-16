import { render } from "@testing-library/react"
import { MemoryRouter, Route, Routes } from "react-router-dom"
import Breadcrumbs from "../Breadcrumbs"
import { it, expect, describe,  } from "vitest"

const renderWithRouter = (ui, { route = "/" } = {}) => {
  window.history.pushState({}, "Test page", route)

  return render(
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        <Route path="*" element={ui} />
      </Routes>
    </MemoryRouter>
  )
}

describe("Breadcrumbs", () => {
  it("renders Home link", () => {
    const { getByText } = renderWithRouter(<Breadcrumbs />)
    expect(getByText("Home")).toBeInTheDocument()
  })

  it("renders breadcrumb links for nested paths", () => {
    const { getByText } = renderWithRouter(<Breadcrumbs />, {
      route: "/products/123",
    })

    expect(getByText("Home")).toBeInTheDocument()
    expect(getByText("/ products")).toBeInTheDocument()
    expect(getByText("/ 123")).toBeInTheDocument()
  })

  it("renders only Home link for root path", () => {
    const { getByText, queryByText } = renderWithRouter(<Breadcrumbs />, {
      route: "/",
    })

    expect(getByText("Home")).toBeInTheDocument()
    expect(queryByText("/")).not.toBeInTheDocument()
  })
})
