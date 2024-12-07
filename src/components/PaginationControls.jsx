import PropTypes from "prop-types"

const PaginationControls = ({
  disablePrevious,
  disableNext,
  onMove,
  limit,
}) => (
  <div className="flex justify-between items-center mt-8">
    <button
      onClick={() => onMove(-limit)}
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
      onClick={() => onMove(limit)}
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
)

PaginationControls.propTypes = {
  disablePrevious: PropTypes.bool.isRequired,
  disableNext: PropTypes.bool.isRequired,
  onMove: PropTypes.func.isRequired,
  limit: PropTypes.number.isRequired,
}

export default PaginationControls
