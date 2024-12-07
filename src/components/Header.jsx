import { Link } from "react-router"
import { AiOutlineShoppingCart } from "react-icons/ai"
import { MdOutlineFavoriteBorder } from "react-icons/md"

const Header = () => {
  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">
        Logo
      </Link>
      <div className="flex space-x-4">
        <Link to="/favourite" className="text-xl font-bold">
          <MdOutlineFavoriteBorder className="text-2xl cursor-pointer fill-red-400" />
        </Link>
        <Link to="/cart">
          <AiOutlineShoppingCart className="text-2xl cursor-pointer fill-grey-100" />
        </Link>
      </div>
    </header>
  )
}

export default Header
