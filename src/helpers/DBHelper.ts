import mysql from "mysql2/promise";

const db_pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASS,
  waitForConnections: true,
  connectionLimit: Number(process.env.CONNECTION_LIMIT),
  queueLimit: Number(process.env.QUEUE_LIMIT),
});

export { db_pool };
