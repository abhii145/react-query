import { Link } from "react-router"
import { useCategories } from "../hooks/useProducts"
import { categoryIcons } from "../constants"

const Categories = () => {
  const { data: categories } = useCategories()
  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Categories</h2>
        <Link to="/products" className="text-blue-500 hover:underline text-sm">
          View All Products
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {categories?.map((category) => (
          <Link
            to={`/products?category=${category.slug}`}
            key={category.slug}
            className="p-4 bg-white rounded-lg shadow hover:bg-gray-100 flex items-center gap-3"
          >
            <div className="text-blue-500 text-2xl">
              {categoryIcons[category.slug]}
            </div>
            <span className="font-medium">{category.name}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default Categories
