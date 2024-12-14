import { useDispatch, useSelector } from "react-redux"
import { FaHeart, FaTrash } from "react-icons/fa6"
import { toggleFavorite } from "../store/favoritesSlice"
import { Link } from "react-router"
import EmptyStateCard from "../components/EmptyStateCard"
import { toast } from "react-toastify"

const FavoriteItems = () => {
  const dispatch = useDispatch()
  const favoriteItems = useSelector((state) => state.favorites.favorites)

  const handleRemoveFromFavorites = (item) => {
    dispatch(toggleFavorite(item))
    toast.error("Removed from favorites", {
      position: "bottom-right",
      autoClose: 800,
    })
  }

  return (
    <div className="bg-gray-100">
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6">
          Your Favorites
        </h1>
        {favoriteItems.length === 0 ? (
          <EmptyStateCard
            icon={FaHeart}
            heading="Your Favorites is Empty"
            subheading="Start adding your favorite items now."
            buttonLabel="Shop Now"
          />
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {favoriteItems.map((item) => (
              <div
                key={item.id}
                className="group relative bg-gray-300 rounded-md overflow-hidden"
              >
                {/* Product Image */}
                <img
                  loading="lazy"
                  alt={item.title}
                  src={item.thumbnail}
                  className="aspect-square w-full object-cover group-hover:opacity-75"
                />
                {/* Title and Price Overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-black/70 text-white p-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-bold">
                      <Link to={`/product/${item.id}`}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {item.name}
                      </Link>
                    </h3>
                    <p className="text-sm font-bold">${item.price}</p>
                  </div>
                  <p className="mt-1 text-sm">{item.title}</p>
                </div>
                {/* Delete Button */}
                <div className="absolute top-2 right-2">
                  <button
                    onClick={() => handleRemoveFromFavorites(item)}
                    className="p-2 bg-red-200 rounded-full hover:bg-red-300"
                    data-testid={`delete-${item.id}`}
                  >
                    <FaTrash size={16} color="red" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default FavoriteItems
