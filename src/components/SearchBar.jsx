
const SearchBar = ({ searchQuery, onSearchChange }) => (
  <div className="mb-6">
    <input
      type="text"
      defaultValue={searchQuery}
      onChange={(e) => onSearchChange(e.target.value)}
      placeholder="Search products..."
      className="w-full p-3 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
    />
  </div>
)

export default SearchBar