import { Outlet } from 'react-router'
import Header from "@/components/Header"
import Footer from "@/components/Footer"

function App() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default App
