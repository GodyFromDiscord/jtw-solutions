import { Link } from "react-router-dom"

const services = [
  {
    name: "Phone Repairs",
    desc: "Cracked screen? Dead battery? We fix most models same-day with quality parts and a warranty on every repair.",
    tags: ["Screen", "Battery", "Charging port", "Water damage"],
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-purple-500" fill="none" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    ),
  },
  {
    name: "Tech Consult",
    desc: "Slow PC, software issues, or mystery bugs? We diagnose and fix it — no jargon, no upselling, just results.",
    tags: ["PC repair", "Virus removal", "Setup & config"],
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-purple-500" fill="none" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    name: "Web Design",
    desc: "Custom-built websites for local businesses. Fast, modern, and designed to bring in customers.",
    tags: ["React", "SEO ready", "Mobile first"],
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-purple-500" fill="none" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
]

const whyItems = [
  { title: "Same-day turnaround", body: "Most phone repairs are done within hours, not days. We respect your time." },
  { title: "Honest pricing", body: "Free diagnosis, upfront quotes. You'll always know what you're paying before we start." },
  { title: "Quality guaranteed", body: "All repairs come with a warranty. If something isn't right, we'll make it right." },
  { title: "Built in Wolverhampton", body: "A local, independent business. No call centres, no middlemen — just us." },
]

function Home() {
  return (
    <div style={{ fontFamily: "'Space Mono', monospace" }}>

      {/* Hero */}
      <section className="relative px-6 md:px-12 pt-20 md:pt-28 pb-16 md:pb-24 overflow-hidden">
        <div
          className="pointer-events-none absolute -top-20 -right-24 w-[400px] h-[400px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(99,40,220,0.14) 0%, transparent 65%)" }}
        />
        <p className="flex items-center gap-3 text-purple-500 uppercase tracking-[0.25em] text-[11px] mb-6">
          <span className="w-6 h-px bg-purple-500 inline-block" />
          Wolverhampton · United Kingdom
        </p>
        <h1
          className="text-white leading-none mb-6 max-w-2xl"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(48px, 12vw, 88px)",
            letterSpacing: "0.02em",
          }}
        >
          Tech that<br />
          <span className="text-purple-600">actually</span><br />
          gets fixed.
        </h1>
        <p className="text-[#777] text-[13px] leading-relaxed max-w-md mb-10">
          Phone repairs, PC troubleshooting, and custom websites built for real businesses.
          Fast, local, no nonsense.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link to="/contact">
            <button
              className="w-full sm:w-auto text-white border-none cursor-pointer rounded-sm transition-all hover:-translate-y-px"
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "11px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                background: "#6b3fcf",
                padding: "14px 32px",
              }}
            >
              Book a repair
            </button>
          </Link>
          <Link to="/portfolio">
            <button
              className="w-full sm:w-auto cursor-pointer rounded-sm transition-all hover:-translate-y-px"
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "11px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                background: "transparent",
                color: "#666",
                border: "0.5px solid #2a2a3a",
                padding: "14px 32px",
              }}
            >
              View our work
            </button>
          </Link>
        </div>

        <div className="flex flex-wrap gap-8 md:gap-12 mt-14 pt-10 border-t border-[#1e1e2e]">
          {[["500+", "Devices repaired"], ["24hr", "Avg turnaround"], ["100%", "Local & independent"]].map(([num, label]) => (
            <div key={label}>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "36px", letterSpacing: "0.04em" }}>{num}</div>
              <div className="text-[#444] uppercase tracking-[0.2em] text-[10px] mt-1">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="px-6 md:px-12 py-16 md:py-20 border-t border-[#1e1e2e]">
        <p className="text-[#444] uppercase tracking-[0.3em] text-[10px] mb-2">// what we do</p>
        <h2
          className="text-white mb-10"
          style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "42px", letterSpacing: "0.04em" }}
        >
          Our Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#1e1e2e] border border-[#1e1e2e] rounded overflow-hidden">
          {services.map((s) => (
            <div key={s.name} className="bg-[#0d0d18] p-6 md:p-8 hover:bg-[#111122] transition-colors">
              <div className="w-10 h-10 border border-[#2a2a3a] rounded flex items-center justify-center mb-5">
                {s.icon}
              </div>
              <div
                className="text-white mb-3"
                style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "22px", letterSpacing: "0.04em" }}
              >
                {s.name}
              </div>
              <p className="text-[#555] text-[12px] leading-relaxed mb-6">{s.desc}</p>
              <div className="flex flex-wrap gap-2">
                {s.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[#444] uppercase tracking-[0.12em] text-[10px] border border-[#2a2a3a] px-2 py-1 rounded-sm"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why us */}
      <section className="px-6 md:px-12 py-16 md:py-20 border-t border-[#1e1e2e] grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
        <div>
          <p className="text-[#444] uppercase tracking-[0.3em] text-[10px] mb-2">// why jtw</p>
          <h2
            className="text-white"
            style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(32px, 6vw, 42px)", letterSpacing: "0.04em", lineHeight: 1 }}
          >
            Local expertise,<br />no corners cut.
          </h2>
        </div>
        <ul className="flex flex-col gap-5 list-none">
          {whyItems.map((w) => (
            <li key={w.title} className="flex items-start gap-4">
              <div className="w-1.5 h-1.5 rounded-full bg-purple-600 mt-1.5 shrink-0" />
              <div>
                <div className="text-[#ccc] text-[13px] font-bold mb-1">{w.title}</div>
                <div className="text-[#444] text-[12px] leading-relaxed">{w.body}</div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* CTA banner */}
      <div className="mx-6 md:mx-12 mb-16 md:mb-20 border border-[#2a2a3a] rounded p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-purple-600" />
        <div>
          <div
            className="text-white"
            style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(24px, 5vw, 32px)", letterSpacing: "0.04em" }}
          >
            Ready to get sorted?
          </div>
          <div className="text-[#555] text-[12px] mt-1">Drop us a message — we'll get back to you fast.</div>
        </div>
        <Link to="/contact" className="w-full md:w-auto">
          <button
            className="w-full md:w-auto text-white border-none cursor-pointer rounded-sm shrink-0 hover:bg-purple-500 transition-colors"
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "11px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              background: "#6b3fcf",
              padding: "14px 32px",
            }}
          >
            Contact us
          </button>
        </Link>
      </div>

      {/* Footer */}
      <footer className="px-6 md:px-12 py-8 border-t border-[#1e1e2e] flex flex-col sm:flex-row justify-between items-center gap-3">
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "18px", letterSpacing: "0.08em", color: "#333" }}>
          JTW<span style={{ color: "#3d2580" }}>.</span>
        </div>
        <div className="text-[#2a2a3a] text-[10px] tracking-[0.1em]">© 2026 JTW Solutions · Wolverhampton</div>
      </footer>

    </div>
  )
}

export default Home