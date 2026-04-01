const express    = require("express")
const cors       = require("cors")
const bcrypt     = require("bcryptjs")
const jwt        = require("jsonwebtoken")
const { Resend } = require("resend")
require("dotenv").config()

const pool = require("./utils/db")
const app  = express()

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
}))
app.use(express.json())

const resend = new Resend(process.env.RESEND_API_KEY)

// ─── Middleware ───────────────────────────────────────────────────────────────

function auth(req, res, next) {
  const header = req.headers.authorization
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorised" })
  }
  try {
    req.user = jwt.verify(header.slice(7), process.env.JWT_SECRET)
    next()
  } catch {
    return res.status(401).json({ error: "Invalid or expired token" })
  }
}

function genId() {
  return "JTW-" + Date.now().toString(36).toUpperCase()
}

// ─── Auth ─────────────────────────────────────────────────────────────────────

// POST /api/auth/login
app.post("/api/auth/login", async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password required." })
  }

  try {
    const [rows] = await pool.execute(
      "SELECT * FROM users WHERE username = ?",
      [username]
    )

    const user = rows[0]
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials." })
    }

    const valid = await bcrypt.compare(password, user.password_hash)
    if (!valid) {
      return res.status(401).json({ error: "Invalid credentials." })
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "8h" }
    )

    res.json({ token, username: user.username })
  } catch (err) {
    console.error("Login error:", err)
    res.status(500).json({ error: "Server error." })
  }
})

// GET /api/auth/me — verify token is still valid
app.get("/api/auth/me", auth, (req, res) => {
  res.json({ username: req.user.username })
})

// ─── Orders ───────────────────────────────────────────────────────────────────

// GET /api/orders
app.get("/api/orders", auth, async (req, res) => {
  try {
    const [rows] = await pool.execute(
      "SELECT * FROM orders ORDER BY created_at DESC"
    )
    res.json(rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Failed to fetch orders." })
  }
})

// POST /api/orders
app.post("/api/orders", auth, async (req, res) => {
  const { client, email, phone, service, description, amount, status, date, notes } = req.body

  if (!client || !service) {
    return res.status(400).json({ error: "Client and service are required." })
  }

  const id = genId()

  try {
    await pool.execute(
      `INSERT INTO orders (id, client, email, phone, service, description, amount, status, date, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, client, email || null, phone || null, service, description || null,
       parseFloat(amount) || 0, status || "Pending", date || null, notes || null]
    )
    const [rows] = await pool.execute("SELECT * FROM orders WHERE id = ?", [id])
    res.status(201).json(rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Failed to create order." })
  }
})

// PUT /api/orders/:id
app.put("/api/orders/:id", auth, async (req, res) => {
  const { client, email, phone, service, description, amount, status, date, notes } = req.body

  if (!client || !service) {
    return res.status(400).json({ error: "Client and service are required." })
  }

  try {
    const [result] = await pool.execute(
      `UPDATE orders SET client=?, email=?, phone=?, service=?, description=?,
       amount=?, status=?, date=?, notes=? WHERE id=?`,
      [client, email || null, phone || null, service, description || null,
       parseFloat(amount) || 0, status, date || null, notes || null, req.params.id]
    )
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Order not found." })
    }
    const [rows] = await pool.execute("SELECT * FROM orders WHERE id = ?", [req.params.id])
    res.json(rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Failed to update order." })
  }
})

// DELETE /api/orders/:id
app.delete("/api/orders/:id", auth, async (req, res) => {
  try {
    const [result] = await pool.execute("DELETE FROM orders WHERE id = ?", [req.params.id])
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Order not found." })
    }
    res.json({ success: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Failed to delete order." })
  }
})

// ─── Contact form (existing) ──────────────────────────────────────────────────

app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required." })
  }

  try {
    await resend.emails.send({
      from: "JTW Contact Form <no-reply@jtwsolutions.co.uk>",
      to: "jack@jtwsolutions.co.uk",
      reply_to: email,
      subject: `New enquiry from ${name}`,
      html: `
        <div style="font-family:monospace;max-width:600px;margin:0 auto;padding:32px;background:#080810;color:#ccc;border:1px solid #1e1e2e;border-radius:4px;">
          <h2 style="color:#fff;font-size:22px;margin:0 0 24px;letter-spacing:2px;">NEW ENQUIRY — JTW SOLUTIONS</h2>
          <table style="width:100%;border-collapse:collapse;font-size:13px;">
            <tr>
              <td style="color:#555;padding:10px 0;border-bottom:1px solid #1e1e2e;width:90px;">Name</td>
              <td style="color:#ccc;padding:10px 0;border-bottom:1px solid #1e1e2e;">${name}</td>
            </tr>
            <tr>
              <td style="color:#555;padding:10px 0;border-bottom:1px solid #1e1e2e;">Email</td>
              <td style="padding:10px 0;border-bottom:1px solid #1e1e2e;">
                <a href="mailto:${email}" style="color:#7c4fe0;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="color:#555;padding:10px 16px 10px 0;vertical-align:top;">Message</td>
              <td style="color:#ccc;padding:10px 0;white-space:pre-wrap;">${message}</td>
            </tr>
          </table>
          <p style="color:#333;font-size:11px;margin-top:32px;letter-spacing:1px;">JTW SOLUTIONS · WOLVERHAMPTON</p>
        </div>
      `,
    })
    res.status(200).json({ success: true })
  } catch (err) {
    console.error("Resend error:", err)
    res.status(500).json({ error: "Failed to send message. Please try again." })
  }
})

// ─── Start ────────────────────────────────────────────────────────────────────

app.get("/", (req, res) => res.send("JTW API running"))

const PORT = process.env.PORT || 5008
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))