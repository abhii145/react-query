import { Link, useLocation } from "react-router-dom"

const Breadcrumbs = () => {
  const location = useLocation()
  const pathnames = location.pathname.split("/").filter((x) => x)

  return (
    <nav className="bg-gray-100 p-3 rounded-md w-full">
      <ol className="list-reset flex">
        <li>
          <Link to="/" className="text-blue-600 hover:text-blue-700">
            Home
          </Link>
        </li>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`
          const isLast = index === pathnames.length - 1

          return isLast ? (
            <li key={to} className="text-gray-500 mx-2">
              / {value}
            </li>
          ) : (
            <li key={to}>
              <Link to={to} className="text-blue-600 hover:text-blue-700 mx-2">
                / {value}
              </Link>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default Breadcrumbs
