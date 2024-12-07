import { FaShoppingBag } from "react-icons/fa"
import { Link } from "react-router"
import PropTypes from "prop-types"

const EmptyStateCard = ({
  icon: Icon = FaShoppingBag,
  heading,
  subheading,
  buttonLabel,
}) => {
  return (
    <div className="flex flex-col items-center justify-center bg-white rounded-md shadow-[0_2px_12px_-3px_rgba(6,81,237,0.3)] p-8 space-y-4 max-w-md mx-auto mt-20">
      <div className="p-4 bg-blue-50 text-blue-600 rounded-full">
        <Icon size={48} />
      </div>

      <div className="text-center">
        <h2 className="text-xl font-bold text-gray-800">{heading}</h2>
        <p className="text-sm text-gray-500">{subheading}</p>
      </div>

      <Link to="/">
        <button className="px-6 py-2 text-sm font-semibold text-white bg-gray-800 rounded-md hover:bg-gray-900">
          {buttonLabel}
        </button>
      </Link>
    </div>
  )
}
EmptyStateCard.propTypes = {
  icon: PropTypes.elementType,
  heading: PropTypes.string.isRequired,
  subheading: PropTypes.string,
  buttonLabel: PropTypes.string.isRequired,
}

export default EmptyStateCard
