import { Outlet, Link } from "react-router-dom"

function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navbar */}
      <nav className="p-4 border-b border-gray-700 flex justify-between">
        <h1 className="font-bold">JTW Solutions</h1>
        <div className="space-x-4">
          <Link to="/">Home</Link>
        </div>
      </nav>

      {/* Page content */}
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout