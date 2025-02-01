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
    return db.query(sql, [id]);
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
    return db.query(sql);
  }

  async query(sql: string, values?: any): Promise<any> {
    return db.query(sql, values);
  }
}

export default new UserModel();
