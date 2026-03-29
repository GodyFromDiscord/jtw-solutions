import pdtMdtImg from "../assets/pdt-mdt.png"
import upbeatImg from "../assets/upbeat-radio.png"

const projects = [
  {
    title: "Police Department MDT",
    category: "Web Application",
    desc: "A full law enforcement management system. Features warrant tracking with risk classification, live officer dispatch, incident reporting, DOJ court document generation, roster management, hot gun serial matching, an internal announcements board, and officer performance leaderboards.",
    tags: ["React", "Tailwind", "Express", "REST API", "Real-time data"],
    img: pdtMdtImg,
    link: null,
  },
  {
    title: "Upbeat Radio",
    category: "Web Application",
    desc: "A full online radio platform with a live stream player, now playing & recently played track display, show schedules, community features, content articles, user registration, and an embeddable player for third-party sites.",
    tags: ["PHP", "MySQL", "JavaScript", "Live streaming", "CMS"],
    img: upbeatImg,
    link: "https://upbeatradio.net",
  },
]

function PortfolioCard({ project, index }) {
  return (
    <div
      className="border border-[#1e1e2e] rounded overflow-hidden hover:border-[#2a2a3a] transition-colors"
      style={{ background: "#0d0d18" }}
    >
      {/* Image area */}
      <div
        className="w-full border-b border-[#1e1e2e] relative overflow-hidden"
        style={{ height: "220px", background: "#080810" }}
      >
        {project.img ? (
          <img
            src={project.img}
            alt={project.title}
            className="w-full h-full object-cover object-top opacity-90 hover:opacity-100 transition-opacity"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div
              className="pointer-events-none absolute inset-0"
              style={{ background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.012) 2px, rgba(255,255,255,0.012) 4px)" }}
            />
            <div
              style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "64px", letterSpacing: "0.08em", color: "#1e1e2e", lineHeight: 1 }}
            >
              0{index + 1}
            </div>
          </div>
        )}
        <div className="absolute bottom-3 right-3">
          <span
            className="text-purple-400 uppercase tracking-[0.12em] text-[10px] border border-purple-900 px-2 py-1 rounded-sm"
            style={{ background: "rgba(8,8,16,0.85)" }}
          >
            {project.category}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-2">
          <div
            className="text-white"
            style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "22px", letterSpacing: "0.04em" }}
          >
            {project.title}
          </div>
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 text-purple-400 uppercase tracking-[0.12em] text-[10px] border border-purple-900 px-3 py-1 rounded-sm hover:bg-purple-900 transition-colors"
              style={{ textDecoration: "none" }}
            >
              View live
            </a>
          )}
        </div>
        <p className="text-[#555] text-[12px] leading-relaxed mb-5">{project.desc}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <span
              key={t}
              className="text-[#444] uppercase tracking-[0.12em] text-[10px] border border-[#2a2a3a] px-2 py-1 rounded-sm"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function Portfolio() {
  return (
    <div style={{ fontFamily: "'Space Mono', monospace" }}>

      {/* Hero */}
      <section className="relative px-6 md:px-12 pt-20 md:pt-28 pb-16 overflow-hidden">
        <div
          className="pointer-events-none absolute -top-20 -right-24 w-[400px] h-[400px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(99,40,220,0.14) 0%, transparent 65%)" }}
        />
        <p className="flex items-center gap-3 text-purple-500 uppercase tracking-[0.25em] text-[11px] mb-6">
          <span className="w-6 h-px bg-purple-500 inline-block" />
          Portfolio
        </p>
        <h1
          className="text-white leading-none mb-6"
          style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(48px, 10vw, 80px)", letterSpacing: "0.02em" }}
        >
          Work I've<br />
          <span className="text-purple-600">built.</span>
        </h1>
        <p className="text-[#777] text-[13px] leading-relaxed max-w-xl">
          Real applications built from scratch. Each project is fully functional,
          custom designed, and built with modern web technologies.
        </p>
      </section>

      {/* Projects grid — single col until you have 2-3 projects */}
      <section className="px-6 md:px-12 py-16 border-t border-[#1e1e2e]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl">
          {projects.map((p, i) => (
            <PortfolioCard key={p.title} project={p} index={i} />
          ))}
        </div>
      </section>

      {/* More coming note */}
      <section className="px-6 md:px-12 pb-16">
        <div
          className="border border-[#1e1e2e] rounded p-6 md:p-8 relative overflow-hidden"
          style={{ background: "#0d0d18" }}
        >
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-purple-600" />
          <p className="text-[#444] uppercase tracking-[0.3em] text-[10px] mb-2">// more coming soon</p>
          <p className="text-[#555] text-[12px] leading-relaxed max-w-2xl">
            More projects being added shortly. Want to see a live demo or discuss
            what I can build for your business? Just get in touch.
          </p>
        </div>
      </section>

      {/* CTA */}
      <div className="mx-6 md:mx-12 mb-16 md:mb-20 border border-[#2a2a3a] rounded p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-purple-600" />
        <div>
          <div
            className="text-white"
            style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(24px, 5vw, 32px)", letterSpacing: "0.04em" }}
          >
            Want something like this?
          </div>
          <div className="text-[#555] text-[12px] mt-1">Let's talk about what you need.</div>
        </div>
        <a href="/contact" className="w-full md:w-auto">
          <button
            className="w-full md:w-auto text-white border-none cursor-pointer rounded-sm hover:bg-purple-500 transition-colors"
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "11px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              background: "#6b3fcf",
              padding: "14px 32px",
            }}
          >
            Get a quote
          </button>
        </a>
      </div>

      <footer className="px-6 md:px-12 py-8 border-t border-[#1e1e2e] flex flex-col sm:flex-row justify-between items-center gap-3">
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "18px", letterSpacing: "0.08em", color: "#333" }}>
          JTW<span style={{ color: "#3d2580" }}>.</span>
        </div>
        <div className="text-[#2a2a3a] text-[10px] tracking-[0.1em]">© 2026 JTW Solutions · Wolverhampton</div>
      </footer>
    </div>
  )
}

export default Portfolio