import { config } from './configs.js'
import pg from 'pg'

const { Pool } = pg
const pool = new Pool({
  host: config.db.host,
  port: parseInt(config.db.port),
  database: config.db.database,
  user: config.db.user,
  password: config.db.password,
})

pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack)
  }
  client.query(
    `UPDATE public."Post"
     SET status = 'published'
     WHERE status = 'scheduled'
     AND "publishedDate" <= NOW()`,
    (err, result) => {
      release()
      if (err) {
        return console.error('Error executing query', err.stack)
      }
      console.log(`Updated ${result.rowCount} rows.`)
      pool.end()
    }
  )
})
