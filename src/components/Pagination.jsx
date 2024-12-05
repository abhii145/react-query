import { keepPreviousData, useQuery } from "@tanstack/react-query"
import Product from "./Product"
import { useCallback, useEffect } from "react"
import { useSearchParams } from "react-router"
import { debounce } from "lodash"
import Loading from "./Loading" // Import Loading component

const Pagination = () => {
  const [searchParam, setSearchParam] = useSearchParams({
    skip: 0,
    limit: 10,
    search: "",
    category: "All",
    sortBy: "price",
    order: "asc",
  })

  const limit = parseInt(searchParam.get("limit"))
  const skip = parseInt(searchParam.get("skip"))
  const searchQuery = searchParam.get("search") || ""
  const category = searchParam.get("category") || "All"
  const sortBy = searchParam.get("sortBy") || "price"
  const order = searchParam.get("order") || "asc"

  useEffect(() => {
    setSearchParam((prev) => {
      prev.set("category", category)
      return prev
    })
  }, [category, setSearchParam])

  const handleSortChange = (e) => {
    const value = e.target.value
    setSearchParam((prev) => {
      if (value === "Price: Low to High") {
        prev.set("sortBy", "price")
        prev.set("order", "asc")
      } else if (value === "Price: High to Low") {
        prev.set("sortBy", "price")
        prev.set("order", "desc")
      } else if (value === "Newest First") {
        prev.set("sortBy", "date")
        prev.set("order", "desc")
      } else if (value === "Highest Rating") {
        prev.set("sortBy", "rating")
        prev.set("order", "desc")
      } else if (value === "feature") {
        prev.set("sortBy", "feature")
        prev.set("order", "asc")
      }
      return prev
    })
    console.log("Sorted by:", value)
  }

  const handleCategoryChange = (e) => {
    setSearchParam((prev) => {
      prev.delete("search")
      prev.set("category", e.target.value)
      prev.set("skip", 0) // Reset pagination on new search
      return prev
    })
    console.log("Selected category:", e.target.value)
  }

  // Debounced Search Handler
  const handleSearchChange = useCallback(
    debounce((value) => {
      setSearchParam((prev) => {
        prev.set("search", value)
        prev.set("skip", 0) // Reset pagination on new search
        return prev
      })
      console.log("Search:", value)
    }, 500), // Adjust debounce delay as needed
    [setSearchParam]
  )

  const handleMove = (moveCount) => {
    setSearchParam((prev) => {
      prev.set("skip", Math.max(skip + moveCount, 0))
      return prev
    })
  }

  const fetchCategories = async () => {
    const response = await fetch(`https://dummyjson.com/products/categories`)
    const data = await response.json()
    return data
  }

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  })

  const fetchProducts = async () => {
    let url = `https://dummyjson.com/products/search?limit=${limit}&skip=${skip}&q=${searchQuery}&sortBy=${sortBy}&order=${order}`
    if (category && category !== "All") {
      url = `https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}&sortBy=${sortBy}&order=${order}`
    }

    const response = await fetch(url)
    const data = await response.json()
    return {
      products: data.products,
      total: data.total, // Assuming API provides total count
    }
  }

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ["products", limit, skip, searchQuery, category, sortBy, order],
    queryFn: fetchProducts,
    // placeholderData: { products: [], total: 0 },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
  })

  const products = data?.products || []
  const total = data?.total || 0

  // Check if buttons should be disabled
  const disablePrevious = skip === 0
  const disableNext = isSuccess && skip + limit >= total

  if (isLoading) {
    return <Loading /> // Show Loading component while data is being fetched
  }

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow p-6">
        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            defaultValue={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search products..."
            className="w-full p-3 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Filter and Sort Section */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 items-center mb-6">
          {/* Sort By */}
          <div className="flex items-center gap-2">
            <label htmlFor="sort" className="text-sm font-medium text-gray-600">
              Sort By:
            </label>
            <select
              id="sort"
              onChange={handleSortChange}
              className="p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="feature">Feature</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest First</option>
              <option>Highest Rating</option>
            </select>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <label
              htmlFor="category"
              className="text-sm font-medium text-gray-600 whitespace-nowrap"
            >
              Category:
            </label>
            <select
              id="category"
              value={category}
              onChange={handleCategoryChange}
              className="p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="All">All</option>
              {categories?.map((category) => (
                <option key={category.slug} value={category.slug}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Product Component */}
        <Product products={products} />

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={() => handleMove(-limit)}
            className={`px-4 py-2 rounded-lg text-white ${
              disablePrevious
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
            disabled={disablePrevious}
          >
            Previous
          </button>
          <button
            onClick={() => handleMove(limit)}
            className={`px-4 py-2 rounded-lg text-white ${
              disableNext
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
            disabled={disableNext}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default Pagination
