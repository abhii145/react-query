import { SORT_OPTIONS } from "../constants"

const SortFilter = ({ onSortChange, selectedSort }) => (
  <div className="flex items-center gap-2">
    <label htmlFor="sort" className="text-sm font-medium text-gray-600">
      Sort By:
    </label>
    <select
      id="sort"
      onChange={onSortChange}
      value={selectedSort}
      className="p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
    >
      {Object.keys(SORT_OPTIONS).map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
)

export default SortFilter