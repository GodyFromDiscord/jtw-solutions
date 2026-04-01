require("dotenv").config({ path: require("path").join(__dirname, "../.env") })
const bcrypt = require("bcryptjs")
const pool   = require("../utils/db.js")

async function main() {
  const [username, password] = process.argv.slice(2)

  if (!username || !password) {
    console.error("Usage: node scripts/create-admin.js <username> <password>")
    process.exit(1)
  }

  const hash = await bcrypt.hash(password, 12)

  try {
    await pool.execute(
      "INSERT INTO users (username, password_hash) VALUES (?, ?)",
      [username, hash]
    )
    console.log(`✓ Admin user '${username}' created successfully.`)
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      console.error(`User '${username}' already exists.`)
    } else {
      console.error("DB error:", err.message)
    }
  }

  process.exit(0)
}

main()