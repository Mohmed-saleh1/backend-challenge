import mysql from "mysql2/promise";

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
  }

  async query(sql: string, values?: any): Promise<any> {
    const [rows] = await this.pool.execute(sql, values);
    return rows;
  }
}

export default new Database();
