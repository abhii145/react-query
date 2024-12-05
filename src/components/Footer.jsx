const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-800 text-white py-4 text-center">
      <div className="container mx-auto">
        <p>&copy; 2024 Your Company. All rights reserved.</p>
        <p>
          <a
            href="/privacy-policy"
            className="text-blue-400 hover:text-blue-300"
          >
            Privacy Policy
          </a>
          {" | "}
          <a
            href="/terms-of-service"
            className="text-blue-400 hover:text-blue-300"
          >
            Terms of Service
          </a>
        </p>
      </div>
    </footer>
  )
}

export default Footer
