import db from "../utils/db";

class UserModel {
  async createUser(
    name: string,
    email: string,
    password: string
  ): Promise<any> {
    const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    return db.query(sql, [name, email, password]);
  }

  async getUserById(id: number): Promise<any> {
    const sql = "SELECT * FROM users WHERE id = ?";
    const result = await db.query(sql, [id]);
    return result[0];
  }

  async getUserByEmail(email: string): Promise<any> {
    const sql = "SELECT * FROM users WHERE email = ?";
    const result = await db.query(sql, [email]);
    return result;
  }

  async updateUser(id: number, name: string, email: string): Promise<any> {
    const sql = "UPDATE users SET name = ?, email = ? WHERE id = ?";
    return db.query(sql, [name, email, id]);
  }

  async deleteUser(id: number): Promise<any> {
    const sql = "DELETE FROM users WHERE id = ?";
    return db.query(sql, [id]);
  }

  async getAllUsers(): Promise<any> {
    const sql = "SELECT * FROM users";
    const result = await db.query(sql);
    return result;
  }

  async query(sql: string, values?: any): Promise<any> {
    return db.query(sql, values);
  }

  async verifyUser(email: string): Promise<boolean> {
    const query = "UPDATE users SET verified = true WHERE email = ?";
    const result = await db.query(query, [email]);
    return result.affectedRows > 0;
  }

  async updateRole(email: string): Promise<boolean> {
    const query = "UPDATE users SET role = admin WHERE email = ?";
    const result = await db.query(query, [email]);
    return result.affectedRows > 0;
  }

  async updateLastLogin(userId: number): Promise<void> {
    const query =
      "UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?";
    await db.query(query, [userId]);
  }

  async updateLoginCount(userId: number): Promise<void> {
    const query = `
      UPDATE users
      SET logins = logins + 1
      WHERE id = ?`;
    await db.query(query, [userId]);
  }

  async getUsersByPage(page: number, limit: number): Promise<any> {
    const offset = (page - 1) * limit;

    const sql = "SELECT * FROM users LIMIT ${limit} OFFSET ${offset}";
    try {
      const formattedSQL = sql
        .replace("${limit}", limit.toString())
        .replace("${offset}", offset.toString());
      const result = await db.query(formattedSQL);
      return result;
    } catch (error) {
      console.error("Error executing query:", error);
      throw error;
    }
  }

  async getTotalUsersCount(): Promise<number> {
    const sql = "SELECT COUNT(*) AS total FROM users";
    const [result] = await db.query(sql);
    return result.total;
  }

  async getUsersByPageAndFilter(
    page: number,
    limit: number,
    startDate?: string,
    endDate?: string
  ): Promise<{
    users: any[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const offset = (page - 1) * limit;
    let total = 0;
    let users = [];
    const dateFormat = "YYYY-MM-DD";

    if (startDate && endDate) {
      const countQuery = `
        SELECT COUNT(*) AS total 
        FROM users 
        WHERE registered_at BETWEEN ? AND ?
      `;
      try {
        const [countResult] = await db.query(countQuery, [startDate, endDate]);
        total = countResult[0].total || 0;
      } catch (error) {
        console.error("Error calculating total:", error);
        throw error;
      }
    } else {
      total = await this.getTotalUsersCount();
    }

    let sql;
    let values;

    if (startDate && endDate) {
      sql = `
        SELECT * 
        FROM users 
        WHERE registered_at BETWEEN ? AND ?
        LIMIT ? OFFSET ?
      `;
      values = [startDate, endDate, limit, offset];
    } else {
      sql = "SELECT * FROM users LIMIT ? OFFSET ?";
      values = [limit, offset];
    }

    try {
      const [rows] = await db.query(sql, values);
      users = rows;
    } catch (error) {
      console.error("Error retrieving users:", error);
      throw error;
    }

    const totalPages = Math.ceil(total / limit);

    return {
      users,
      total,
      page,
      limit,
      totalPages,
    };
  }
}

export default new UserModel();
