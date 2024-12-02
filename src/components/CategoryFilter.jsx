
const CategoryFilter = ({ categories, category, onCategoryChange }) => (
  <div className="flex items-center gap-2">
    <label htmlFor="category" className="text-sm font-medium text-gray-600 whitespace-nowrap">
      Category:
    </label>
    <select
      id="category"
      value={category}
      onChange={onCategoryChange}
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
)

export default CategoryFilter