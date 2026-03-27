const services = [
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-purple-500" fill="none" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    ),
    name: "Phone Repairs",
    tagline: "Fast and affordable phone repairs for common issues.",
    badge: "Quick turnaround available",
    items: ["Screen replacements", "Battery replacements", "Charging port repairs", "General diagnostics"],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-purple-500" fill="none" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    name: "Tech Support",
    tagline: "Help with everyday tech problems at home or for small businesses.",
    badge: "Simple, no-nonsense help",
    items: ["Slow laptops & PCs", "WiFi and internet issues", "Software setup", "General troubleshooting"],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-purple-500" fill="none" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    name: "Custom Websites",
    tagline: "Modern, fast websites built from scratch to suit your needs.",
    badge: "Built with modern tech",
    items: ["Business websites", "Custom features (bookings, dashboards)", "Mobile-friendly design", "Performance & SEO focused"],
  },
]

function Services() {
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
          Services
        </p>
        <h1
          className="text-white leading-none mb-6"
          style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(48px, 10vw, 80px)", letterSpacing: "0.02em" }}
        >
          What I<br />
          <span className="text-purple-600">can do</span> for you.
        </h1>
        <p className="text-[#777] text-[13px] leading-relaxed max-w-xl">
          Phone repairs, tech support, and custom websites — all done locally, honestly, and without the waffle.
        </p>
      </section>

      {/* Services */}
      <section className="px-6 md:px-12 py-16 border-t border-[#1e1e2e] flex flex-col gap-px bg-[#1e1e2e] border border-[#1e1e2e] rounded overflow-hidden mx-6 md:mx-12">
        {services.map((s, i) => (
          <div key={s.name} className="bg-[#0d0d18] p-6 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-start hover:bg-[#111122] transition-colors">
            {/* Left */}
            <div className="md:col-span-1">
              <div className="w-10 h-10 border border-[#2a2a3a] rounded flex items-center justify-center mb-4">
                {s.icon}
              </div>
              <div
                className="text-white mb-2"
                style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "26px", letterSpacing: "0.04em" }}
              >
                {s.name}
              </div>
              <p className="text-[#555] text-[12px] leading-relaxed mb-4">{s.tagline}</p>
              <span className="text-purple-400 uppercase tracking-[0.12em] text-[10px] border border-purple-900 px-3 py-1 rounded-sm">
                {s.badge}
              </span>
            </div>

            {/* Right */}
            <ul className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3 list-none self-center">
              {s.items.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-600 mt-1.5 shrink-0" />
                  <span className="text-[#666] text-[12px] leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Ongoing support add-on */}
      <section className="px-6 md:px-12 py-16 border-t border-[#1e1e2e] mt-16">
        <div className="border border-[#2a2a3a] rounded p-8 md:p-10 relative overflow-hidden" style={{ background: "#0d0d18" }}>
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-purple-600" />
          <p className="text-[#444] uppercase tracking-[0.3em] text-[10px] mb-3">// optional add-on</p>
          <h2
            className="text-white mb-3"
            style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(22px, 4vw, 28px)", letterSpacing: "0.04em" }}
          >
            Ongoing Support & Maintenance
          </h2>
          <p className="text-[#555] text-[12px] leading-relaxed max-w-2xl">
            Need help after your project is complete? I offer ongoing support and maintenance so you're
            never left stuck. Whether it's updates, tweaks, or troubleshooting — I've got you covered.
          </p>
        </div>
      </section>

      {/* Trust badges */}
      <section className="px-6 md:px-12 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-[#1e1e2e] border border-[#1e1e2e] rounded overflow-hidden">
          {[
            { label: "Free quotes", body: "No obligation. I'll tell you exactly what's involved before any work starts." },
            { label: "No fix, no fee", body: "On repairs — if I can't fix it, you don't pay. Simple as that." },
            { label: "Fast response", body: "I aim to respond to all enquiries within a few hours." },
          ].map((t) => (
            <div key={t.label} className="bg-[#0d0d18] p-6 md:p-8">
              <div className="w-1.5 h-1.5 rounded-full bg-purple-600 mb-4" />
              <div
                className="text-white mb-2"
                style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "18px", letterSpacing: "0.04em" }}
              >
                {t.label}
              </div>
              <p className="text-[#555] text-[12px] leading-relaxed">{t.body}</p>
            </div>
          ))}
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
            Not sure what you need?
          </div>
          <div className="text-[#555] text-[12px] mt-1">Just get in touch — I'll point you in the right direction.</div>
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
            Get a free quote
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

export default Services