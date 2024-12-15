import { Link, useNavigate, useLocation } from "react-router"
import { AiOutlineShoppingCart } from "react-icons/ai"
import { MdOutlineFavoriteBorder } from "react-icons/md"
import { useState, useCallback, useEffect } from "react"
import { debounce } from "lodash"
import { useSelector } from "react-redux"
import { FaBox } from "react-icons/fa6"

const Header = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchQuery, setSearchQuery] = useState("")
  const cartItems = useSelector((state) => state.cart.items)
  const cartItemCount = cartItems?.length

  const handleSearchChange = useCallback(
    debounce((value) => {
      navigate(`/products?search=${value}`)
    }, 500),
    [navigate]
  )

  const onSearchInputChange = (e) => {
    const value = e.target.value
    setSearchQuery(value)
    handleSearchChange(value)
  }

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const search = params.get("search")
    setSearchQuery(search || "")
  }, [location])

  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold" data-testid="logo-link">
        Logo
      </Link>
      <div className="flex space-x-4 items-center">
        <input
          type="text"
          value={searchQuery}
          onChange={onSearchInputChange}
          placeholder="Search products..."
          className="p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <Link
          to="/favourite"
          className="text-xl font-bold"
          data-testid="favourite-link"
          aria-label="Favourite"
        >
          <MdOutlineFavoriteBorder className="text-2xl cursor-pointer fill-red-400" />
        </Link>

        <Link
          to="/order"
          className="text-xl font-bold"
          data-testid="order-link"
          aria-label="Order"
        >
          <FaBox className="text-2xl cursor-pointer fill-green-400" />
        </Link>

        <div className="relative">
          <Link to="/cart" data-testid="cart-link" aria-label="Cart">
            <AiOutlineShoppingCart className="text-2xl cursor-pointer fill-grey-100" />
            {cartItemCount > 0 && (
              <span className="bg-red-500 text-white text-xs absolute top-0 right-0 rounded-full w-4 h-4 flex items-center justify-center transform translate-x-1/2 -translate-y-1/2">
                {cartItemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header
