import mysql from "mysql2/promise";

// Creates a DB connection, makes a query, and returns the results, closes connection after query. 
export async function queryDB(query: string) {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || "3306"),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  try {
    const [rows] = await connection.query(query);
    return JSON.stringify(rows, null, 2);
  } finally {
    await connection.end();
  }
}
