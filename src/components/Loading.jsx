const Loading = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 via-gray-100 to-blue-100 min-h-screen flex items-center justify-center p-6">
      <div className="text-center space-y-6">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-blue-500 border-t-transparent border-t-4 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 bg-blue-500 rounded-full shadow-lg"></div>
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-800">Loading...</h1>
        <p className="text-lg text-gray-600">
          Hang tight! We're preparing your experience.
        </p>
      </div>
    </div>
  )
}

export default Loading
