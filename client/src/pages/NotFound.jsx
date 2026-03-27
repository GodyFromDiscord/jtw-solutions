import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function NotFound() {
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(true)
  }, [])

  return (
    <div className="relative min-h-screen bg-[#080810] flex flex-col items-center justify-center overflow-hidden px-6 py-16 font-mono">

      {/* Scanlines */}
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.015) 2px, rgba(255,255,255,0.015) 4px)",
        }}
      />

      {/* Glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(99,40,220,0.18) 0%, transparent 70%)" }}
      />

      <div className={`relative z-20 text-center max-w-lg w-full transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>

        <p className="text-[11px] tracking-[0.25em] uppercase text-purple-500 mb-4">
          // error · page not found
        </p>

        {/* Glitchy 404 */}
        <div className="relative inline-block leading-none mb-4"
          style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(120px, 22vw, 180px)" }}>
          <span className="relative z-10 text-white select-none">404</span>
          <span className="absolute inset-0 text-[#ff2d55] animate-glitch1 select-none" style={{ left: "3px" }}>404</span>
          <span className="absolute inset-0 text-cyan-400 animate-glitch2 select-none" style={{ left: "-3px" }}>404</span>
        </div>

        <div className="w-12 h-px bg-purple-600 mx-auto my-5" />

        <p className="text-[13px] text-gray-500 leading-relaxed mb-10">
          The page you&apos;re looking for doesn&apos;t exist<br />
          or has been moved somewhere else.<br />
          <span className="text-gray-400">Maybe it never existed at all.</span>
        </p>

        <div className="flex gap-3 justify-center flex-wrap">
          <button
            onClick={() => navigate("/")}
            className="text-[12px] tracking-widest uppercase bg-purple-700 hover:bg-purple-600 text-white px-7 py-3 rounded-sm transition-all hover:-translate-y-px"
          >
            Go home
          </button>
          <button
            onClick={() => navigate(-1)}
            className="text-[12px] tracking-widest uppercase bg-transparent border border-[#2a2a3a] hover:border-[#444] text-gray-500 hover:text-gray-300 px-7 py-3 rounded-sm transition-all hover:-translate-y-px"
          >
            Go back
          </button>
        </div>
      </div>

      <p className="absolute bottom-5 text-[10px] tracking-[0.15em] text-[#2a2a3a] z-20 select-none">
        SIGNAL LOST · ERROR 404
      </p>
    </div>
  )
}

export default NotFound