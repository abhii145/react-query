import Categories from "./Categories"

const HomePage = () => {
  return (
    <div className="bg-gray-50 flex flex-col">
      <main className="flex-grow p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <Categories />
        </div>
      </main>
    </div>
  )
}

export default HomePage
