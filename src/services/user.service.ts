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

  async getPaginatedUsers(page: number, limit: number): Promise<any> {
    const response = await UserModel.getUsersByPage(page, limit);
    return response;
  }
  async getAllUsersWithCounts(): Promise<any> {
    const users = await UserModel.getAllUsers();

    const totalUsers = users.length;
    const verifiedUsers = users.filter((user: any) => user.verified).length;

    return {
      totalUsers,
      verifiedUsers,
      users,
    };
  }

  async getTopUsersByLoginFrequency(): Promise<any> {
    const sql = `
      SELECT * FROM users
      ORDER BY logins DESC
      LIMIT 3
    `;
    return UserModel.query(sql);
  }

  async getInactiveUsers(duration: "hour" | "month"): Promise<any> {
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

  async verifyUser(email: string): Promise<boolean> {
    return UserModel.verifyUser(email);
  }

  async updateRole(email: string): Promise<any> {
    return UserModel.updateRole(email);
  }
}
export default new UserService();
