import { useState, useEffect, useCallback } from "react"
import PropTypes from "prop-types"

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Function to go to the next image
  const nextImage = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }, [images.length])

  // Function to go to the previous image
  const prevImage = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    )
  }

  // Automatically move to the next image every 2 seconds
  useEffect(() => {
    const interval = setInterval(nextImage, 2000) // Move to next image every 2 seconds

    // Clear the interval on component unmount
    return () => clearInterval(interval)
  }, [images.length, nextImage])

  return (
    <div className="relative group">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {images.map((image, index) => (
            <div key={index} className="flex-none w-full">
              <img
                src={image}
                alt={`carousel-image-${index}`}
                className="w-full h-[300px] lg:h-[400px] object-contain rounded-lg shadow-lg"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Left and Right buttons with hover effects */}
      <div className="absolute top-1/2 left-0 right-0 flex justify-between transform -translate-y-1/2 px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={prevImage}
          className="bg-black text-white p-3 rounded-full shadow-lg hover:bg-gray-600 opacity-70 hover:opacity-100 transition-all"
        >
          &#8592;
        </button>
        <button
          onClick={nextImage}
          className="bg-black text-white p-3 rounded-full shadow-lg hover:bg-gray-600 opacity-70 hover:opacity-100 transition-all"
        >
          &#8594;
        </button>
      </div>
    </div>
  )
}
Carousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default Carousel
