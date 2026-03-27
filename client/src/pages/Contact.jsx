import { useState } from "react"

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [sent, setSent] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Wire up to your backend or EmailJS later
    setSent(true)
  }

  const inputStyle = {
    width: "100%",
    background: "#0d0d18",
    border: "0.5px solid #2a2a3a",
    borderRadius: "2px",
    color: "#ccc",
    fontFamily: "'Space Mono', monospace",
    fontSize: "12px",
    padding: "12px 14px",
    outline: "none",
    transition: "border-color 0.2s",
  }

  const labelStyle = {
    display: "block",
    fontSize: "10px",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: "#444",
    marginBottom: "8px",
  }

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
          Contact
        </p>
        <h1
          className="text-white leading-none mb-6"
          style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(48px, 10vw, 80px)", letterSpacing: "0.02em" }}
        >
          Let's get<br />
          <span className="text-purple-600">you sorted.</span>
        </h1>
        <p className="text-[#777] text-[13px] leading-relaxed max-w-xl">
          Need help or want a quote? Get in touch below — I aim to respond within a few hours.
        </p>
      </section>

      <section className="px-6 md:px-12 py-16 border-t border-[#1e1e2e] grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">

        {/* Contact details */}
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-[#444] uppercase tracking-[0.3em] text-[10px] mb-6">// reach me directly</p>
            {[
            {
                label: "Phone",
                value: "+44 7XXX XXXXXX",
                href: "tel:+447XXXXXXXXX",
            },
            {
                label: "Email",
                value: "jack@jtwsolutions.co.uk",
                href: "mailto:jack@jtwsolutions.co.uk",
            },
            {
                label: "WhatsApp",
                value: "Message me on WhatsApp",
                href: "https://wa.me/447XXXXXXXXX",
            },
            ].map(({ label, value, href }) => (
            <a
                key={label}
                href={href}
                className="flex items-start gap-5 p-5 border border-[#1e1e2e] rounded mb-3 hover:border-[#2a2a3a] transition-colors no-underline"
                style={{ background: "#0d0d18" }}
            >
                <div className="w-1.5 h-1.5 rounded-full bg-purple-600 mt-1.5 shrink-0" />
                <div>
                <div className="text-[#444] uppercase tracking-[0.15em] text-[10px] mb-1">{label}</div>
                <div className="text-[#aaa] text-[12px]">{value}</div>
                </div>
            </a>
            ))}
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-1 gap-3 mt-2">
            {[
              "Fast response times",
              "Free quotes available",
              "No fix, no fee on repairs",
            ].map((t) => (
              <div key={t} className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-600 shrink-0" />
                <span className="text-[#444] text-[11px] uppercase tracking-[0.15em]">{t}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div>
          <p className="text-[#444] uppercase tracking-[0.3em] text-[10px] mb-6">// send a message</p>

          {sent ? (
            <div
              className="border border-purple-900 rounded p-8 text-center"
              style={{ background: "rgba(107,63,207,0.06)" }}
            >
              <div
                className="text-white mb-2"
                style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "28px", letterSpacing: "0.04em" }}
              >
                Message sent!
              </div>
              <p className="text-[#555] text-[12px] leading-relaxed">
                Thanks for reaching out. I'll get back to you as soon as possible.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label style={labelStyle}>Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Your name"
                  value={form.name}
                  onChange={handleChange}
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = "#6b3fcf")}
                  onBlur={(e) => (e.target.style.borderColor = "#2a2a3a")}
                />
              </div>
              <div>
                <label style={labelStyle}>Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={handleChange}
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = "#6b3fcf")}
                  onBlur={(e) => (e.target.style.borderColor = "#2a2a3a")}
                />
              </div>
              <div>
                <label style={labelStyle}>Message</label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell me what you need help with..."
                  value={form.message}
                  onChange={handleChange}
                  style={{ ...inputStyle, resize: "vertical" }}
                  onFocus={(e) => (e.target.style.borderColor = "#6b3fcf")}
                  onBlur={(e) => (e.target.style.borderColor = "#2a2a3a")}
                />
              </div>
              <button
                type="submit"
                className="text-white border-none cursor-pointer rounded-sm hover:bg-purple-500 transition-colors mt-2"
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "11px",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  background: "#6b3fcf",
                  padding: "14px 32px",
                }}
              >
                Send message
              </button>
            </form>
          )}
        </div>
      </section>

      <footer className="px-6 md:px-12 py-8 border-t border-[#1e1e2e] flex flex-col sm:flex-row justify-between items-center gap-3">
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "18px", letterSpacing: "0.08em", color: "#333" }}>
          JTW<span style={{ color: "#3d2580" }}>.</span>
        </div>
        <div className="text-[#2a2a3a] text-[10px] tracking-[0.1em]">© 2025 JTW Solutions · Belfast</div>
      </footer>
    </div>
  )
}

export default Contact