import { render, screen, fireEvent } from "@testing-library/react"
import Carousel from "../Carousel"
import { it, expect, describe, vi } from "vitest"

describe("Carousel", () => {
  const images = ["image1.jpg", "image2.jpg", "image3.jpg"]

  it("matches snapshot", () => {
    const { asFragment } = render(<Carousel images={images} />)
    expect(asFragment()).toMatchSnapshot()
  })

  it("renders correctly", () => {
    render(<Carousel images={images} />)
    images.forEach((image, index) => {
      expect(screen.getByAltText(`carousel-image-${index}`)).toBeInTheDocument()
    })
  })

  it("nextImage function works correctly", () => {
    render(<Carousel images={images} />)
    const nextButton = screen.getByText("→")
    fireEvent.click(nextButton)
    expect(screen.getByAltText("carousel-image-1")).toBeInTheDocument()
  })

  it("prevImage function works correctly", () => {
    render(<Carousel images={images} />)
    const prevButton = screen.getByText("←")
    fireEvent.click(prevButton)
    expect(screen.getByAltText("carousel-image-2")).toBeInTheDocument()
  })

  it("automatic image change works correctly", () => {
    vi.useFakeTimers()
    render(<Carousel images={images} />)
    vi.advanceTimersByTime(2000)
    expect(screen.getByAltText("carousel-image-1")).toBeInTheDocument()
    vi.advanceTimersByTime(2000)
    expect(screen.getByAltText("carousel-image-2")).toBeInTheDocument()
    vi.useRealTimers()
  })
})
