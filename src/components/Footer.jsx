import { Link } from "react-router"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-800 text-white py-4 text-center">
      <div className="container mx-auto">
        <p>&copy; {currentYear} Your Company. All rights reserved.</p>
        <p>
          <Link to="/" className="text-blue-400 hover:text-blue-300">
            Privacy Policy
          </Link>
          {" | "}
          <Link to="/" className="text-blue-400 hover:text-blue-300">
            Terms of Service
          </Link>
        </p>
      </div>
    </footer>
  )
}

export default Footer
