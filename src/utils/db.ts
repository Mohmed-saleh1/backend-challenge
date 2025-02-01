import mysql from "mysql2/promise";
import dotenv from "dotenv";

// Load environment variables from the .env file
dotenv.config();

class Database {
  private pool: mysql.Pool;

  constructor() {
    this.pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

    this.testConnection();
  }

  // Test the MySQL connection
  private async testConnection() {
    try {
      console.log("Attempting to connect to the database...");
      const [rows] = await this.pool.execute("SELECT 1");
      console.log("Database connected successfully:", rows);
    } catch (err) {
      console.error("Database connection failed:", err);
    }
  }

  async query(sql: string, values?: any): Promise<any> {
    try {
      console.log("Executing SQL query:", sql, values);
      const [rows] = await this.pool.execute(sql, values);
      return rows;
    } catch (err) {
      console.error("Error executing query:", err);
      throw err;
    }
  }
}

export default new Database();
