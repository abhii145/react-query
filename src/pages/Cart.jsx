import { useDispatch, useSelector } from "react-redux"
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../store/cartSlice"
import { FaHeart, FaMinus, FaPlus } from "react-icons/fa6"
import { MdDelete } from "react-icons/md"
import { toggleFavorite } from "../store/favoritesSlice"
import EmptyStateCard from "../components/EmptyStateCard"
import { IoCartOutline } from "react-icons/io5"
import { toast } from "react-toastify"

const Cart = () => {
  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.cart.items)
  const favoriteItems = useSelector((state) => state.favorites.favorites)

  const handleIncrease = (productId) => {
    dispatch(increaseQuantity(productId))
  }

  const handleDecrease = (productId) => {
    dispatch(decreaseQuantity(productId))
  }

  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId))
    toast.error("product deleted", {
      position: "bottom-right",
      autoClose: 800,
    })
  }

  const handleToggleFavorite = (item) => {
    const isFavorite = favoriteItems.some((favorite) => favorite.id === item.id)
    dispatch(toggleFavorite(item))
    if (isFavorite) {
      toast.info("Removed from favorites", {
        position: "bottom-right",
        autoClose: 800,
      })
    } else {
      toast.success("Added to favorites", {
        position: "bottom-right",
        autoClose: 800,
      })
    }
  }

  const calculateTotal = () => {
    return cartItems
      ?.reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2)
  }

  if (cartItems.length === 0) {
    return (
      <EmptyStateCard
        icon={IoCartOutline}
        heading="Your Cart is Empty"
        subheading="Start shopping your favorite items now."
        buttonLabel="Shop Now"
      />
    )
  }

  return (
    <div className="font-sans max-w-[77rem] max-md:max-w-xl mx-auto p-4 bg-grey-50">
      <h1 className="text-2xl font-extrabold text-gray-800">Shopping Cart</h1>
      <div className="grid md:grid-cols-3 gap-4 mt-8">
        {/* Cart Items */}
        <div className="md:col-span-2 space-y-4">
          {cartItems.map((item) => {
            const isFavorite = favoriteItems.some(
              (favorite) => favorite.id === item.id
            )
            return (
              <div
                key={item.id}
                className="flex gap-4 bg-white px-4 py-6 rounded-md shadow-[0_2px_12px_-3px_rgba(6,81,237,0.3)]"
              >
                <div className="flex gap-4">
                  <div className="w-28 h-28 max-sm:w-24 max-sm:h-24 shrink-0">
                    <img
                      src={item?.thumbnail}
                      className="w-full h-full object-contain"
                      alt={item.title}
                      loading="lazy"
                    />
                  </div>

                  <div className="flex flex-col gap-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-800 mt-2 flex items-center gap-2">
                        {item.title}
                      </p>
                      <p className="text-sm font-bold text-gray-500">
                        {item.description.slice(0, 90)}...
                      </p>
                    </div>

                    <div className="mt-auto flex items-center gap-3">
                      <button
                        onClick={() => handleDecrease(item.id)}
                        className="flex items-center justify-center w-5 h-5 bg-gray-400 outline-none rounded-full"
                      >
                        <FaMinus />
                      </button>
                      <span className="font-bold text-sm leading-[18px]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleIncrease(item.id)}
                        className="flex items-center justify-center w-5 h-5 bg-gray-400 outline-none rounded-full"
                      >
                        <FaPlus />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="ml-auto flex flex-col">
                  <div className="flex items-start gap-4 justify-end">
                    <FaHeart
                      color={isFavorite ? "red" : "gray"}
                      size={20}
                      onClick={() => handleToggleFavorite(item)}
                      className="cursor-pointer"
                    />

                    <MdDelete
                      size={20}
                      color="red"
                      onClick={() => handleRemove(item.id)}
                      className="cursor-pointer"
                    />
                  </div>
                  <h3 className="text-base font-bold text-gray-800 mt-auto">
                    ${(item.price * item.quantity).toFixed(2)}
                  </h3>
                </div>
              </div>
            )
          })}
        </div>

        {/* Cart Summary */}
        <div className="bg-white rounded-md px-4 py-6 h-max shadow-[0_2px_12px_-3px_rgba(6,81,237,0.3)]">
          <ul className="text-gray-800 space-y-4">
            <li className="flex flex-wrap gap-4 text-sm">
              Subtotal{" "}
              <span className="ml-auto font-bold">${calculateTotal()}</span>
            </li>
            <li className="flex flex-wrap gap-4 text-sm">
              Shipping <span className="ml-auto font-bold">$0.00</span>
            </li>
            <li className="flex flex-wrap gap-4 text-sm">
              Tax <span className="ml-auto font-bold">$0.00</span>
            </li>
            <hr className="border-gray-300" />
            <li className="flex flex-wrap gap-4 text-sm font-bold">
              Total <span className="ml-auto">${calculateTotal()}</span>
            </li>
          </ul>

          <div className="mt-8 space-y-2">
            <button
              type="button"
              className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-gray-800 hover:bg-gray-900 text-white rounded-md"
            >
              Buy Now
            </button>
            <button
              type="button"
              className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-transparent hover:bg-gray-100 text-gray-800 border border-gray-300 rounded-md"
            >
              Continue Shopping
            </button>
          </div>

          <div className="mt-4 flex flex-wrap justify-center gap-4">
            <img
              src="https://readymadeui.com/images/master.webp"
              alt="card1"
              className="w-10 object-contain"
              loading="lazy"
            />
            <img
              src="https://readymadeui.com/images/visa.webp"
              alt="card2"
              className="w-10 object-contain"
              loading="lazy"
            />
            <img
              src="https://readymadeui.com/images/american-express.webp"
              alt="card3"
              className="w-10 object-contain"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
