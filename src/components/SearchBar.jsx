import { useState } from "react"
import PropTypes from "prop-types"
import { AiOutlineClose } from "react-icons/ai"

const SearchBar = ({ searchQuery, onSearchChange }) => {
  const [inputValue, setInputValue] = useState(searchQuery)

  const handleInputChange = (e) => {
    const value = e.target.value
    setInputValue(value)
    onSearchChange(value)
  }

  const clearInput = () => {
    setInputValue("")
    onSearchChange("")
  }

  return (
    <div className="mb-6 relative">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Search products..."
        className="w-full p-3 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      {inputValue && (
        <AiOutlineClose
          onClick={clearInput}
          data-testid="clear-button"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
        />
      )}
    </div>
  )
}
SearchBar.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
}

export default SearchBar
