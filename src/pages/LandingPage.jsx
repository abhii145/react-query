import { Caraousel, Categories } from "../components"
import banner from "../assets/banner.jpg"

const LandingPage = () => {
  const images = [banner, banner]

  return (
    <div className="bg-gray-50 flex flex-col">
      <main className="flex-grow p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <Caraousel images={images} />
          <Categories />
        </div>
      </main>
    </div>
  )
}

export default LandingPage
