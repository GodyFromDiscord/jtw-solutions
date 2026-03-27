import { Outlet, Link, useLocation } from "react-router-dom"

function MainLayout() {
  const { pathname } = useLocation()

  const links = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/services", label: "Services" },
    { to: "/portfolio", label: "Portfolio" },
    { to: "/contact", label: "Contact" },
  ]

  return (
    <div className="min-h-screen bg-[#080810] text-white" style={{ fontFamily: "'Space Mono', monospace" }}>

      {/* Scanlines overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-50"
        style={{
          background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.012) 2px, rgba(255,255,255,0.012) 4px)",
        }}
      />

      {/* Nav */}
      <nav
        className="sticky top-0 z-40 flex items-center justify-between px-12 h-16 border-b border-[#1e1e2e]"
        style={{ background: "rgba(8,8,16,0.92)", backdropFilter: "blur(8px)" }}
      >
        <Link
          to="/"
          className="text-white no-underline"
          style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "22px", letterSpacing: "0.08em" }}
        >
          JTW<span className="text-purple-600">.</span>
        </Link>

        <ul className="flex gap-8 list-none">
          {links.map(({ to, label }) => (
            <li key={to}>
              <Link
                to={to}
                className="no-underline transition-colors duration-200"
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: pathname === to ? "#fff" : "#666",
                }}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <Link to="/contact">
          <button
            className="text-white border-none cursor-pointer rounded-sm transition-colors duration-200 hover:bg-purple-500"
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "11px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              background: "#6b3fcf",
              padding: "9px 20px",
            }}
          >
            Get a quote
          </button>
        </Link>
      </nav>

      {/* Page content */}
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout