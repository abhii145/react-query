import { useQuery } from "@tanstack/react-query"
import { useState, useEffect } from "react"
import { useLocation, useParams } from "react-router"

const ProductDetails = () => {
  const { id } = useParams()
  const [selectedImage, setSelectedImage] = useState("")
  const location = useLocation()
  console.log(location)
  const fetchSingleProducts = async () => {
    const response = await fetch(`https://dummyjson.com/products/${id}`)
    const data = await response.json()
    return data
  }

  const {
    isLoading,
    error,
    data: product,
  } = useQuery({
    queryKey: ["singleProducts", id],
    queryFn: fetchSingleProducts,
    staleTime: 1000 * 60 * 5, // 5 minutes
    onSuccess: (data) => {
      // Set initial image only when data is fetched
      if (data?.images && data.images.length > 0) {
        setSelectedImage(data.images[0])
      }
    },
  })

  // Update selectedImage when product data changes (cached or fresh)
  useEffect(() => {
    if (product?.images && product.images.length > 0) {
      setSelectedImage((current) => current || product.images[0])
    }
  }, [product])

  const handleAddToCart = () => {
    console.log(`Added ${product.title} to cart!`)
  }

  const handleThumbnailClick = (image) => {
    setSelectedImage(image)
  }

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  if (error) {
    return <h1>Error: {error.message}</h1>
  }

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow p-6 flex flex-col min-h-[calc(100vh-3rem)]">
        {/* Content Section */}
        <div className="flex flex-col lg:flex-row gap-8 flex-grow">
          {/* Image Section */}
          <div className="flex-1">
            <div className="w-full h-96 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
              <img
                loading="lazy"
                src={selectedImage}
                alt={product.title}
                className="object-contain w-full h-full"
              />
            </div>
            {/* Thumbnail Selector */}
            {product.images && product.images.length > 0 && (
              <div className="flex gap-2 mt-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => handleThumbnailClick(image)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        handleThumbnailClick(image)
                      }
                    }}
                    className={`w-20 h-20 rounded-lg overflow-hidden focus:outline-none ${
                      selectedImage === image ? "ring-2 ring-blue-500" : ""
                    }`}
                    aria-label={`Select image ${index + 1}`}
                  >
                    <img
                      src={image}
                      loading="lazy"
                      alt={`Product variant ${index + 1}`}
                      className="w-full h-full object-contain"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="flex-1 space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">
              {product.title}
            </h1>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-lg font-semibold text-gray-800">
              Price: ${product.price}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Category:</span> {product.category}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Brand:</span> {product.brand}
            </p>
            <p className="text-sm text-green-600 font-medium">
              {product.availabilityStatus}
            </p>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Add to Cart
            </button>
            {/* Return Policy */}
            {product.returnPolicy && (
              <p className="text-sm text-gray-600 mt-4">
                <span className="font-medium">Return Policy:</span>{" "}
                {product.returnPolicy}
              </p>
            )}
          </div>
        </div>
        {/* Reviews Section */}
        {product.reviews && product.reviews.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Reviews</h2>
            <div className="flex flex-col lg:flex-row lg:flex-wrap gap-4">
              {product.reviews.map((review, index) => (
                <div
                  key={index}
                  className="bg-gray-50 border border-gray-200 p-3 rounded-lg shadow-sm flex flex-col gap-2 max-w-full lg:max-w-xs"
                >
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium text-gray-700">
                      {review.reviewerName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(review.date).toLocaleDateString()}
                    </p>
                  </div>
                  <p className="text-xs text-gray-600">
                    Rating:{" "}
                    <span className="font-semibold text-gray-800">
                      {review.rating} / 5
                    </span>
                  </p>
                  <p className="text-sm text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductDetails
