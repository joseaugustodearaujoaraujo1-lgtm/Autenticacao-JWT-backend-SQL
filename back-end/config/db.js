import dotenv from "dotenv"
import mysql2 from "mysql2/promise"

dotenv.config()

const pool = mysql2.createPool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
    host: process.env.DB_HOST,
    database: process.env.DB_SCHEMA,
    waitForConnections:true,
    connectionLimit:10
})

export default pool;

