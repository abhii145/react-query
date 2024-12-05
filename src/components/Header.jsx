import { Link } from "react-router"
import { AiOutlineShoppingCart } from "react-icons/ai"

const Header = () => {
  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">
        Logo
      </Link>
      <Link to="/cart">
        <AiOutlineShoppingCart className="text-2xl cursor-pointer" />
      </Link>
    </header>
  )
}

export default Header
