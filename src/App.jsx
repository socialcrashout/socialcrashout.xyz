import Navbar from './components/Navbar'
import DiscordStatusBar from './components/DiscordStatusBar'
import Hero from './components/Hero'
import PhotoCard from './components/PhotoCard'
import About from './components/About'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Reviews from './components/Reviews'
import Skills from './components/Skills'
import Footer from './components/Footer'
import MusicPlayer from './components/MusicPlayer'
import Admin from './components/Admin'
import Cursor from './components/Cursor'
import StatusCards from './components/StatusCards'
import StatsCard from './components/StatsCard'
import FeaturedWork from './components/FeaturedWork'
import DynamicFavicon from './components/DynamicFavicon'

function App() {
  const isAdminRoute = window.location.pathname === '/admin'

  if (isAdminRoute) {
    return <Admin />
  }

  return (
    <div className="relative bg-white text-gray-900 min-h-screen overflow-hidden">
      <DynamicFavicon />
      <Cursor />

      {/* Ambient animated background blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-orange-200/40 rounded-full blur-3xl animate-drift" />
        <div className="absolute top-1/3 -right-32 w-[28rem] h-[28rem] bg-amber-100/50 rounded-full blur-3xl animate-drift-slow" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-orange-100/40 rounded-full blur-3xl animate-drift" />
      </div>

      <Navbar />
      <DiscordStatusBar />

      <section className="relative flex justify-center px-6 py-8">
        <div className="w-full max-w-5xl flex flex-col lg:flex-row gap-6 items-stretch">
          <PhotoCard />
          <Hero />
        </div>
      </section>

      <section className="relative flex justify-center px-6 pb-8">
        <div className="w-full max-w-5xl flex flex-col lg:flex-row gap-6 items-stretch">
          <StatsCard />
          <FeaturedWork />
        </div>
      </section>

      <StatusCards />

      <About />
      <Skills />
      <Projects />
      <Experience />
      <Reviews />
      <Footer />
      <MusicPlayer />
    </div>
  )
}

export default App