import { Outlet, Link, useLocation } from "react-router-dom"
import { useState } from "react"

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/contact", label: "Contact" },
]

function MainLayout() {
  const { pathname } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#080810] text-white" style={{ fontFamily: "'Space Mono', monospace" }}>

      <div
        className="pointer-events-none fixed inset-0 z-50"
        style={{
          background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.012) 2px, rgba(255,255,255,0.012) 4px)",
        }}
      />

      <nav
        className="sticky top-0 z-40 flex items-center justify-between px-6 md:px-12 h-16 border-b border-[#1e1e2e]"
        style={{ background: "rgba(8,8,16,0.92)", backdropFilter: "blur(8px)" }}
      >
        <Link
          to="/"
          className="text-white no-underline"
          style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "22px", letterSpacing: "0.08em" }}
        >
          JTW<span className="text-purple-600">.</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-8 list-none">
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

        <Link to="/contact" className="hidden md:block">
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

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 cursor-pointer bg-transparent border-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-px bg-white transition-all duration-200 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-5 h-px bg-white transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-px bg-white transition-all duration-200 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0d0d18] border-b border-[#1e1e2e] px-6 py-6 flex flex-col gap-5 z-30 relative">
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              className="no-underline uppercase tracking-[0.18em] text-[11px]"
              style={{ color: pathname === to ? "#fff" : "#666" }}
            >
              {label}
            </Link>
          ))}
          <Link to="/contact" onClick={() => setMenuOpen(false)}>
            <button
              className="w-full text-white border-none cursor-pointer rounded-sm mt-2"
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "11px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                background: "#6b3fcf",
                padding: "12px 20px",
              }}
            >
              Get a quote
            </button>
          </Link>
        </div>
      )}

      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout