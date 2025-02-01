import UserModel from "../models/user.model";
import bcrypt from "bcryptjs";

class UserService {
  async getUserById(id: number): Promise<any> {
    return UserModel.getUserById(id);
  }

  async updateUser(id: number, name: string, email: string): Promise<any> {
    return UserModel.updateUser(id, name, email);
  }

  async deleteUser(id: number): Promise<any> {
    return UserModel.deleteUser(id);
  }

  async getAllUsers(): Promise<any> {
    return UserModel.getAllUsers();
  }

  async getTopUsersByLoginFrequency(): Promise<any> {
    const sql = `
      SELECT user_id, COUNT(*) AS login_count 
      FROM user_logins 
      GROUP BY user_id 
      ORDER BY login_count DESC 
      LIMIT 3
    `;
    return UserModel.query(sql);
  }

  async getInactiveUsers(duration: "hour" | "month"): Promise<any> {
    // Implement logic to fetch inactive users
    const sql = `
      SELECT * FROM users 
      WHERE last_login < NOW() - INTERVAL 1 ${duration.toUpperCase()}
    `;
    return UserModel.query(sql);
  }

  async getTotalUsers(): Promise<number> {
    const [result] = await UserModel.query(
      "SELECT COUNT(*) AS total FROM users"
    );
    return result.total;
  }

  async getTotalVerifiedUsers(): Promise<number> {
    const [result] = await UserModel.query(
      "SELECT COUNT(*) AS total FROM users WHERE verified = true"
    );
    return result.total;
  }
}

export default new UserService();
