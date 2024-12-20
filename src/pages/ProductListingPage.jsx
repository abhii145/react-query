import { useSearchParams } from "react-router"
import { useCategories, useProducts } from "../hooks/useProducts"
import { SORT_OPTIONS, DEFAULT_SEARCH_PARAMS } from "../constants"
import Loading from "../components/Loading"
import {
  CategoryFilter,
  NotFound,
  PaginationControls,
  ProductCard,
  SortFilter,
} from "../components"

const ProductListingPage = () => {
  const [searchParam, setSearchParam] = useSearchParams(DEFAULT_SEARCH_PARAMS)

  const limit = parseInt(searchParam.get("limit"))
  const skip = parseInt(searchParam.get("skip"))
  const searchQuery = searchParam.get("search") || ""
  const category = searchParam.get("category") || "All"
  const sortBy = searchParam.get("sortBy") || "price"
  const order = searchParam.get("order") || "asc"

  const sortByKey =
    Object.keys(SORT_OPTIONS).find(
      (key) =>
        SORT_OPTIONS[key].sortBy === sortBy && SORT_OPTIONS[key].order === order
    ) || "feature"

  const handleSortChange = (e) => {
    const value = e.target.value
    setSearchParam((prev) => {
      const sortOption = SORT_OPTIONS[value]
      prev.set("sortBy", sortOption.sortBy)
      prev.set("order", sortOption.order)
      return prev
    })
    console.log("Sorted by:", value)
  }

  const handleCategoryChange = (e) => {
    setSearchParam((prev) => {
      prev.delete("search")
      prev.set("category", e.target.value)
      prev.set("skip", 0)
      return prev
    })
    console.log("Selected category:", e.target.value)
  }

  const handleMove = (moveCount) => {
    setSearchParam((prev) => {
      prev.set("skip", Math.max(skip + moveCount, 0))
      return prev
    })
  }

  const { data: categories } = useCategories()
  const { data, isSuccess, isLoading } = useProducts({
    limit,
    skip,
    searchQuery,
    category,
    sortBy,
    order,
  })

  const products = data?.products || []
  const total = data?.total || 0

  const disablePrevious = skip === 0
  const disableNext = isSuccess && skip + limit >= total

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow p-6">
        {/* Removed SearchBar */}
        {products.length > 0 && (
          <>
            <div className="flex flex-col sm:flex-row justify-between gap-4 items-center mb-6">
              <SortFilter
                onSortChange={handleSortChange}
                selectedSort={sortByKey}
              />
              <CategoryFilter
                categories={categories}
                category={category}
                onCategoryChange={handleCategoryChange}
              />
            </div>
            <ProductCard products={products} />
            <PaginationControls
              disablePrevious={disablePrevious}
              disableNext={disableNext}
              onMove={handleMove}
              limit={limit}
            />
          </>
        )}
        {products.length === 0 && <NotFound />}
      </div>
    </div>
  )
}

export default ProductListingPage
