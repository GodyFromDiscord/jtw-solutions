function About() {
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
          About
        </p>
        <h1
          className="text-white leading-none mb-6"
          style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(48px, 10vw, 80px)", letterSpacing: "0.02em" }}
        >
          The person<br />
          <span className="text-purple-600">behind</span> the work.
        </h1>
        <p className="text-[#777] text-[13px] leading-relaxed max-w-xl">
          Hi, I'm Jack — the person behind Jack's Tech & Web Solutions. I help people and
          businesses with everything from phone repairs to custom-built websites.
        </p>
      </section>

      {/* Story */}
      <section className="px-6 md:px-12 py-16 border-t border-[#1e1e2e] grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
        <div>
          <p className="text-[#444] uppercase tracking-[0.3em] text-[10px] mb-2">// background</p>
          <h2
            className="text-white mb-6"
            style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(28px, 5vw, 36px)", letterSpacing: "0.04em", lineHeight: 1.1 }}
          >
            Always been into tech.
          </h2>
          <p className="text-[#555] text-[12px] leading-relaxed mb-4">
            I've always had a strong interest in technology and problem-solving. Whether it's fixing
            a broken phone, speeding up a slow laptop, or building a modern website from scratch —
            I enjoy helping people get things working properly again.
          </p>
          <p className="text-[#555] text-[12px] leading-relaxed">
            What started as a personal interest turned into a genuine passion for helping others
            with their tech. I've worked across repairs, support, and web development — and I bring
            that same care and attention to every job, big or small.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {[
            { num: "2-3", label: "Day turnaround" },
            { num: "Free", label: "Diagnosis & quotes" },
            { num: "100%", label: "Local & independent" },
          ].map(({ num, label }) => (
            <div
              key={label}
              className="border border-[#1e1e2e] rounded p-6 flex items-center gap-6"
              style={{ background: "#0d0d18" }}
            >
              <div
                className="text-white shrink-0"
                style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "40px", letterSpacing: "0.04em" }}
              >
                {num}
              </div>
              <div className="text-[#444] uppercase tracking-[0.2em] text-[10px]">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* What makes me different */}
      <section className="px-6 md:px-12 py-16 border-t border-[#1e1e2e]">
        <p className="text-[#444] uppercase tracking-[0.3em] text-[10px] mb-2">// the difference</p>
        <h2
          className="text-white mb-10"
          style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(28px, 5vw, 36px)", letterSpacing: "0.04em", lineHeight: 1.1 }}
        >
          No jargon. No upselling.<br />Just honest help.
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-[#1e1e2e] border border-[#1e1e2e] rounded overflow-hidden">
          {[
            {
              title: "Personal service",
              body: "Unlike big companies, you deal directly with me — not a call centre or third party.",
            },
            {
              title: "Straight talking",
              body: "No confusing jargon, no unnecessary upselling. I'll tell you exactly what the problem is and what it'll cost.",
            },
            {
              title: "Reliable results",
              body: "Whether it's a repair or a website, I take pride in getting it done right — and standing behind my work.",
            },
          ].map((item) => (
            <div key={item.title} className="bg-[#0d0d18] p-6 md:p-8 hover:bg-[#111122] transition-colors">
              <div className="w-1.5 h-1.5 rounded-full bg-purple-600 mb-4" />
              <div
                className="text-white mb-3"
                style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "20px", letterSpacing: "0.04em" }}
              >
                {item.title}
              </div>
              <p className="text-[#555] text-[12px] leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Local angle */}
      <section className="px-6 md:px-12 py-16 border-t border-[#1e1e2e]">
        <div className="border border-[#2a2a3a] rounded p-8 md:p-12 relative overflow-hidden" style={{ background: "#0d0d18" }}>
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-purple-600" />
          <p className="text-[#444] uppercase tracking-[0.3em] text-[10px] mb-3">// based in Wolverhampton</p>
          <h2
            className="text-white mb-4"
            style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(24px, 5vw, 32px)", letterSpacing: "0.04em" }}
          >
            Local service you can actually rely on.
          </h2>
          <p className="text-[#555] text-[12px] leading-relaxed max-w-2xl mb-2">
            I work with customers locally and aim to provide fast, affordable, and friendly support.
            Whether you need a quick repair or a full website, I'm always happy to help — and you'll
            always know who you're talking to.
          </p>
          <p className="text-[#555] text-[12px] leading-relaxed max-w-2xl">
            No waiting weeks for a response. No hidden fees. Just straightforward, local tech help.
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
            Want to work together?
          </div>
          <div className="text-[#555] text-[12px] mt-1">Get in touch — I'm always happy to chat.</div>
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
            Contact me
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

export default About