import { useState, useEffect, useCallback, useRef } from "react"

const API = import.meta.env.VITE_API_URL || "http://localhost:5008"

const STATUS_COLORS = {
  "Pending":     { bg: "#1a1028", text: "#a78bfa", border: "#3d2580" },
  "In Progress": { bg: "#0f1a24", text: "#60a5fa", border: "#1e3a5f" },
  "Complete":    { bg: "#0a1a10", text: "#4ade80", border: "#14532d" },
  "Cancelled":   { bg: "#1a0e0e", text: "#f87171", border: "#7f1d1d" },
}

const SERVICE_TYPES = ["Phone Repair", "Tech Consult", "Web Design", "Other"]

const EMPTY_ORDER = {
  client: "", email: "", phone: "",
  service: "Phone Repair", description: "",
  amount: "", status: "Pending",
  date: new Date().toISOString().split("T")[0], notes: ""
}

// ─── API helpers ─────────────────────────────────────────────────────────────

function getToken() { return localStorage.getItem("jtw_token") }

async function apiFetch(path, options = {}) {
  const token = getToken()
  const res = await fetch(`${API}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || "Request failed")
  return data
}

// ─── Shared styles ───────────────────────────────────────────────────────────

const inputStyle = {
  width: "100%", background: "#080810", border: "0.5px solid #2a2a3a",
  borderRadius: "2px", color: "#ccc", fontSize: "13px", padding: "9px 12px",
  fontFamily: "'Space Mono',monospace", boxSizing: "border-box", outline: "none"
}

const btnPrimary = {
  background: "#6b3fcf", color: "#fff", border: "none", borderRadius: "2px",
  fontFamily: "'Space Mono',monospace", fontSize: "11px", letterSpacing: "0.15em",
  textTransform: "uppercase", padding: "12px 24px", cursor: "pointer"
}

const btnGhost = {
  background: "transparent", color: "#555", border: "0.5px solid #2a2a3a",
  borderRadius: "2px", fontFamily: "'Space Mono',monospace", fontSize: "11px",
  letterSpacing: "0.15em", textTransform: "uppercase", padding: "12px 24px", cursor: "pointer"
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function Modal({ title, onClose, children }) {
  return (
    <div
      onClick={e => e.target === e.currentTarget && onClose()}
      style={{
        position: "fixed", inset: 0, zIndex: 1000, background: "rgba(0,0,0,0.75)",
        display: "flex", alignItems: "flex-start", justifyContent: "center",
        overflowY: "auto", padding: "40px 16px"
      }}
    >
      <div style={{
        background: "#0d0d18", border: "0.5px solid #2a2a3a", borderRadius: "4px",
        width: "100%", maxWidth: "560px", padding: "28px 24px"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "22px", letterSpacing: "0.06em", color: "#fff" }}>
            {title}
          </span>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#555", cursor: "pointer", fontSize: "18px" }}>✕</button>
        </div>
        {children}
      </div>
    </div>
  )
}

function Field({ label, children }) {
  return (
    <div style={{ marginBottom: "14px" }}>
      <label style={{ display: "block", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#555", marginBottom: "6px" }}>
        {label}
      </label>
      {children}
    </div>
  )
}

function OrderForm({ initial = EMPTY_ORDER, onSave, onCancel, saving }) {
  const [form, setForm] = useState({ ...EMPTY_ORDER, ...initial })
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
        <Field label="Client Name">
          <input style={inputStyle} value={form.client} onChange={e => set("client", e.target.value)} placeholder="Jane Smith" />
        </Field>
        <Field label="Email">
          <input style={inputStyle} value={form.email} onChange={e => set("email", e.target.value)} placeholder="jane@example.com" />
        </Field>
        <Field label="Phone">
          <input style={inputStyle} value={form.phone} onChange={e => set("phone", e.target.value)} placeholder="07xxx xxxxxx" />
        </Field>
        <Field label="Service">
          <select style={{ ...inputStyle, cursor: "pointer" }} value={form.service} onChange={e => set("service", e.target.value)}>
            {SERVICE_TYPES.map(s => <option key={s}>{s}</option>)}
          </select>
        </Field>
      </div>
      <Field label="Description">
        <textarea style={{ ...inputStyle, minHeight: "70px", resize: "vertical" }} value={form.description} onChange={e => set("description", e.target.value)} placeholder="What needs doing?" />
      </Field>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0 16px" }}>
        <Field label="Amount (£)">
          <input style={inputStyle} type="number" value={form.amount} onChange={e => set("amount", e.target.value)} placeholder="0.00" />
        </Field>
        <Field label="Status">
          <select style={{ ...inputStyle, cursor: "pointer" }} value={form.status} onChange={e => set("status", e.target.value)}>
            {Object.keys(STATUS_COLORS).map(s => <option key={s}>{s}</option>)}
          </select>
        </Field>
        <Field label="Date">
          <input style={inputStyle} type="date" value={form.date} onChange={e => set("date", e.target.value)} />
        </Field>
      </div>
      <Field label="Internal Notes">
        <textarea style={{ ...inputStyle, minHeight: "55px", resize: "vertical" }} value={form.notes} onChange={e => set("notes", e.target.value)} placeholder="Parts ordered, device condition, etc." />
      </Field>
      <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
        <button onClick={() => form.client && form.service && onSave(form)} style={{ ...btnPrimary, opacity: saving ? 0.6 : 1 }} disabled={saving}>
          {saving ? "Saving..." : "Save Order"}
        </button>
        <button onClick={onCancel} style={btnGhost}>Cancel</button>
      </div>
    </div>
  )
}

function InvoiceView({ order, onClose }) {
  const ref = useRef(null)

  const handlePrint = () => {
    const content = ref.current.innerHTML
    const win = window.open("", "_blank")
    win.document.write(`
      <html><head><title>Invoice ${order.id}</title>
      <link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Bebas+Neue&display=swap" rel="stylesheet">
      <style>body{margin:0;padding:40px;background:#fff;font-family:'Space Mono',monospace;}@media print{body{padding:0;}}</style>
      </head><body>${content}</body></html>
    `)
    win.document.close()
    setTimeout(() => { win.focus(); win.print() }, 600)
  }

  const total = parseFloat(order.amount) || 0

  return (
    <Modal title="Invoice Preview" onClose={onClose}>
      <div ref={ref} style={{ background: "#fff", color: "#111", padding: "32px", fontFamily: "'Space Mono',monospace", fontSize: "12px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "32px" }}>
          <div>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "28px", letterSpacing: "0.08em" }}>
              JTW<span style={{ color: "#6b3fcf" }}>.</span>
            </div>
            <div style={{ color: "#888", fontSize: "11px", marginTop: "4px" }}>JTW Solutions · Wolverhampton</div>
            <div style={{ color: "#888", fontSize: "11px" }}>jack@jtwsolutions.co.uk</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "22px", color: "#6b3fcf" }}>INVOICE</div>
            <div style={{ color: "#555", fontSize: "11px", marginTop: "4px" }}>{order.id}</div>
            <div style={{ color: "#555", fontSize: "11px" }}>
              Date: {order.date ? new Date(order.date).toLocaleDateString("en-GB") : "—"}
            </div>
          </div>
        </div>

        <div style={{ marginBottom: "28px" }}>
          <div style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#888", marginBottom: "6px" }}>Bill To</div>
          <div style={{ fontWeight: "700", fontSize: "14px" }}>{order.client}</div>
          {order.email && <div style={{ color: "#555" }}>{order.email}</div>}
          {order.phone && <div style={{ color: "#555" }}>{order.phone}</div>}
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "24px" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #eee" }}>
              <th style={{ textAlign: "left", padding: "8px 0", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#aaa", fontWeight: "400" }}>Description</th>
              <th style={{ textAlign: "right", padding: "8px 0", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#aaa", fontWeight: "400" }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: "12px 0" }}>
                <div style={{ fontWeight: "700" }}>{order.service}</div>
                {order.description && <div style={{ color: "#666", marginTop: "4px", lineHeight: "1.5" }}>{order.description}</div>}
              </td>
              <td style={{ padding: "12px 0", textAlign: "right", fontWeight: "700" }}>£{total.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>

        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "32px" }}>
          <div style={{ minWidth: "200px", borderTop: "2px solid #111", paddingTop: "8px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontWeight: "700", letterSpacing: "0.1em", fontSize: "13px" }}>TOTAL</span>
              <span style={{ fontWeight: "700", fontSize: "15px" }}>£{total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div style={{ borderTop: "1px solid #eee", paddingTop: "16px", color: "#aaa", fontSize: "11px" }}>
          <div>Thank you for choosing JTW Solutions.</div>
          <div style={{ marginTop: "4px" }}>Payment due within 14 days of invoice date.</div>
        </div>
      </div>

      <div style={{ display: "flex", gap: "10px", marginTop: "16px" }}>
        <button onClick={handlePrint} style={btnPrimary}>Print / Save PDF</button>
        <button onClick={onClose} style={btnGhost}>Close</button>
      </div>
    </Modal>
  )
}

// ─── Login screen ─────────────────────────────────────────────────────────────

function LoginScreen({ onLogin }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError]       = useState("")
  const [loading, setLoading]   = useState(false)

  const handleSubmit = async () => {
    if (!username || !password) return
    setLoading(true)
    setError("")
    try {
      const data = await apiFetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ username, password })
      })
      localStorage.setItem("jtw_token", data.token)
      localStorage.setItem("jtw_user", data.username)
      onLogin(data.username)
    } catch (err) {
      setError(err.message || "Login failed.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: "#080810", fontFamily: "'Space Mono',monospace"
    }}>
      <div style={{ width: "100%", maxWidth: "340px", padding: "0 16px" }}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "36px", letterSpacing: "0.08em", color: "#fff" }}>
            JTW<span style={{ color: "#6b3fcf" }}>.</span>
          </div>
          <div style={{ color: "#444", fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", marginTop: "4px" }}>
            Admin Portal
          </div>
        </div>

        <Field label="Username">
          <input
            style={inputStyle} value={username} autoFocus
            onChange={e => setUsername(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSubmit()}
          />
        </Field>
        <Field label="Password">
          <input
            style={inputStyle} type="password" value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSubmit()}
          />
        </Field>

        {error && (
          <div style={{ color: "#f87171", fontSize: "11px", marginBottom: "12px", letterSpacing: "0.05em" }}>
            {error}
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{ ...btnPrimary, width: "100%", opacity: loading ? 0.6 : 1 }}
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </div>
    </div>
  )
}

// ─── Main dashboard ───────────────────────────────────────────────────────────

function Dashboard({ username, onLogout }) {
  const [orders, setOrders]           = useState([])
  const [loading, setLoading]         = useState(true)
  const [error, setError]             = useState("")
  const [modal, setModal]             = useState(null)
  const [selected, setSelected]       = useState(null)
  const [saving, setSaving]           = useState(false)
  const [filterStatus, setFilterStatus]   = useState("All")
  const [filterService, setFilterService] = useState("All")
  const [search, setSearch]           = useState("")

  const fetchOrders = useCallback(async () => {
    try {
      const data = await apiFetch("/api/orders")
      setOrders(data)
    } catch (err) {
      if (err.message === "Invalid or expired token" || err.message === "Unauthorised") {
        onLogout()
      } else {
        setError("Failed to load orders.")
      }
    } finally {
      setLoading(false)
    }
  }, [onLogout])

  useEffect(() => { fetchOrders() }, [fetchOrders])

  const handleSave = async (form) => {
    setSaving(true)
    try {
      if (selected) {
        const updated = await apiFetch(`/api/orders/${selected.id}`, {
          method: "PUT", body: JSON.stringify(form)
        })
        setOrders(o => o.map(x => x.id === updated.id ? updated : x))
      } else {
        const created = await apiFetch("/api/orders", {
          method: "POST", body: JSON.stringify(form)
        })
        setOrders(o => [created, ...o])
      }
      setModal(null)
      setSelected(null)
    } catch (err) {
      alert("Save failed: " + err.message)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this order?")) return
    try {
      await apiFetch(`/api/orders/${id}`, { method: "DELETE" })
      setOrders(o => o.filter(x => x.id !== id))
    } catch (err) {
      alert("Delete failed: " + err.message)
    }
  }

  const filtered = orders.filter(o => {
    const matchStatus  = filterStatus === "All" || o.status === filterStatus
    const matchService = filterService === "All" || o.service === filterService
    const matchSearch  = !search || [o.client, o.email, o.id, o.description]
      .some(f => f?.toLowerCase().includes(search.toLowerCase()))
    return matchStatus && matchService && matchSearch
  })

  const totalRevenue = orders
    .filter(o => o.status === "Complete")
    .reduce((s, o) => s + (parseFloat(o.amount) || 0), 0)

  return (
    <div style={{ fontFamily: "'Space Mono',monospace", minHeight: "100vh", background: "#080810" }}>

      {/* Header */}
      <div style={{
        borderBottom: "0.5px solid #1e1e2e", padding: "16px 24px",
        display: "flex", justifyContent: "space-between", alignItems: "center"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "22px", letterSpacing: "0.08em", color: "#fff" }}>
            JTW<span style={{ color: "#6b3fcf" }}>.</span>
          </span>
          <span style={{ color: "#333", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase" }}>Admin</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <span style={{ color: "#444", fontSize: "11px" }}>{username}</span>
          <button onClick={onLogout} style={{
            background: "none", border: "0.5px solid #2a2a3a", color: "#444", borderRadius: "2px",
            fontFamily: "'Space Mono',monospace", fontSize: "10px", letterSpacing: "0.15em",
            textTransform: "uppercase", padding: "6px 14px", cursor: "pointer"
          }}>Sign out</button>
        </div>
      </div>

      <div style={{ padding: "24px" }}>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "12px", marginBottom: "28px" }}>
          {[
            { label: "Total Orders",       val: orders.length },
            { label: "Revenue Collected",  val: "£" + totalRevenue.toFixed(2) },
            { label: "Pending",            val: orders.filter(o => o.status === "Pending").length },
            { label: "In Progress",        val: orders.filter(o => o.status === "In Progress").length },
          ].map(s => (
            <div key={s.label} style={{ background: "#0d0d18", border: "0.5px solid #1e1e2e", borderRadius: "2px", padding: "16px" }}>
              <div style={{ color: "#444", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "6px" }}>{s.label}</div>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "30px", letterSpacing: "0.04em", color: "#fff" }}>{s.val}</div>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "16px", alignItems: "center" }}>
          <button onClick={() => { setSelected(null); setModal("new") }} style={btnPrimary}>
            + New Order
          </button>
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search client, ID..." style={{ ...inputStyle, width: "200px" }}
          />
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} style={{ ...inputStyle, width: "140px", cursor: "pointer" }}>
            <option>All</option>
            {Object.keys(STATUS_COLORS).map(s => <option key={s}>{s}</option>)}
          </select>
          <select value={filterService} onChange={e => setFilterService(e.target.value)} style={{ ...inputStyle, width: "160px", cursor: "pointer" }}>
            <option>All</option>
            {SERVICE_TYPES.map(s => <option key={s}>{s}</option>)}
          </select>
          <button onClick={fetchOrders} style={{ ...btnGhost, padding: "9px 14px" }} title="Refresh">↻</button>
        </div>

        {/* Error */}
        {error && (
          <div style={{ color: "#f87171", fontSize: "12px", marginBottom: "16px" }}>{error}</div>
        )}

        {/* Orders table */}
        <div style={{ border: "0.5px solid #1e1e2e", borderRadius: "2px", overflow: "hidden" }}>
          {loading ? (
            <div style={{ padding: "48px", textAlign: "center", color: "#333", fontSize: "12px", letterSpacing: "0.1em" }}>
              Loading...
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ padding: "48px", textAlign: "center", color: "#333", fontSize: "12px", letterSpacing: "0.1em" }}>
              No orders found
            </div>
          ) : filtered.map((o, i) => {
            const sc = STATUS_COLORS[o.status] || STATUS_COLORS["Pending"]
            const amount = parseFloat(o.amount) || 0
            return (
              <div key={o.id} style={{
                display: "grid", gridTemplateColumns: "1fr 1fr auto auto auto",
                gap: "0 16px", alignItems: "center", padding: "14px 16px",
                background: i % 2 === 0 ? "#0d0d18" : "#080810",
                borderBottom: "0.5px solid #1a1a28"
              }}>
                <div>
                  <div style={{ color: "#ccc", fontSize: "13px", marginBottom: "2px" }}>{o.client}</div>
                  <div style={{ color: "#444", fontSize: "10px", letterSpacing: "0.1em" }}>
                    {o.id} · {o.date ? new Date(o.date).toLocaleDateString("en-GB") : "—"}
                  </div>
                </div>
                <div>
                  <div style={{ color: "#888", fontSize: "11px" }}>{o.service}</div>
                  {o.description && (
                    <div style={{ color: "#444", fontSize: "10px", marginTop: "2px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "220px" }}>
                      {o.description}
                    </div>
                  )}
                </div>
                <div>
                  <span style={{
                    background: sc.bg, color: sc.text, border: `0.5px solid ${sc.border}`,
                    borderRadius: "2px", fontSize: "10px", letterSpacing: "0.12em",
                    textTransform: "uppercase", padding: "4px 10px", whiteSpace: "nowrap"
                  }}>{o.status}</span>
                </div>
                <div style={{ color: "#ccc", fontSize: "13px", textAlign: "right", whiteSpace: "nowrap" }}>
                  £{amount.toFixed(2)}
                </div>
                <div style={{ display: "flex", gap: "6px" }}>
                  <button onClick={() => { setSelected(o); setModal("invoice") }} style={{
                    background: "none", border: "0.5px solid #2a2a3a", borderRadius: "2px",
                    color: "#6b3fcf", fontSize: "11px", padding: "6px 10px", cursor: "pointer",
                    fontFamily: "'Space Mono',monospace"
                  }}>INV</button>
                  <button onClick={() => { setSelected(o); setModal("edit") }} style={{
                    background: "none", border: "0.5px solid #2a2a3a", borderRadius: "2px",
                    color: "#888", fontSize: "11px", padding: "6px 10px", cursor: "pointer",
                    fontFamily: "'Space Mono',monospace"
                  }}>EDIT</button>
                  <button onClick={() => handleDelete(o.id)} style={{
                    background: "none", border: "0.5px solid #2a2a3a", borderRadius: "2px",
                    color: "#555", fontSize: "11px", padding: "6px 10px", cursor: "pointer",
                    fontFamily: "'Space Mono',monospace"
                  }}>✕</button>
                </div>
              </div>
            )
          })}
        </div>

        <div style={{ marginTop: "10px", color: "#2a2a3a", fontSize: "10px", letterSpacing: "0.1em" }}>
          {filtered.length} of {orders.length} orders
        </div>
      </div>

      {/* Modals */}
      {modal === "new" && (
        <Modal title="New Order" onClose={() => setModal(null)}>
          <OrderForm onSave={handleSave} onCancel={() => setModal(null)} saving={saving} />
        </Modal>
      )}
      {modal === "edit" && selected && (
        <Modal title={`Edit — ${selected.id}`} onClose={() => setModal(null)}>
          <OrderForm initial={selected} onSave={handleSave} onCancel={() => setModal(null)} saving={saving} />
        </Modal>
      )}
      {modal === "invoice" && selected && (
        <InvoiceView order={selected} onClose={() => setModal(null)} />
      )}
    </div>
  )
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function Admin() {
  const [username, setUsername] = useState(() => {
    const token = localStorage.getItem("jtw_token")
    const user  = localStorage.getItem("jtw_user")
    return token && user ? user : null
  })

  const handleLogin = (u) => setUsername(u)

  const handleLogout = () => {
    localStorage.removeItem("jtw_token")
    localStorage.removeItem("jtw_user")
    setUsername(null)
  }

  if (!username) return <LoginScreen onLogin={handleLogin} />
  return <Dashboard username={username} onLogout={handleLogout} />
}
