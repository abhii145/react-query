import { useDispatch, useSelector } from "react-redux"
import { FaTrash } from "react-icons/fa6"
import { removeFromCart } from "../store/cartSlice"
import { toggleFavorite } from "../store/favoritesSlice"

const FavoriteItems = () => {
  const dispatch = useDispatch()
    const favoriteItems = useSelector((state) => state.favorites.favorites)
    console.log(favoriteItems)

    const handleRemoveFromFavorites = (item) => {
      dispatch(toggleFavorite(item))
    }

  return (
    <div className="font-sans max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-extrabold text-gray-800">Your Favorites</h1>
      <div className="grid md:grid-cols-3 gap-4 mt-8">
        {favoriteItems.length > 0 ? (
          favoriteItems.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 bg-white px-4 py-6 rounded-md shadow-[0_2px_12px_-3px_rgba(6,81,237,0.3)]"
            >
              <div className="w-28 h-28 max-sm:w-24 max-sm:h-24 shrink-0">
                <img
                  src={item.thumbnail}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col gap-4">
                <h3 className="text-base font-bold text-gray-800">
                  {item.name}
                </h3>
                <p className="text-sm font-semibold text-gray-500 mt-2">
                  {item.title}
                </p>
              </div>
              <div className="ml-auto flex flex-col">
                <FaTrash
                  size={20}
                  color="red"
                  onClick={() => handleRemoveFromFavorites(item)}
                  className="cursor-pointer"
                />
              </div>
            </div>
          ))
        ) : (
          <p>No favorite items yet</p>
        )}
      </div>
    </div>
  )
}

export default FavoriteItems
