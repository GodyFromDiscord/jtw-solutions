const express = require("express")
const cors = require("cors")
const { Resend } = require("resend")
require("dotenv").config()

const app = express()
app.use(cors())
app.use(express.json())

const resend = new Resend(process.env.RESEND_API_KEY)

app.get("/", (req, res) => res.send("API running"))

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

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))