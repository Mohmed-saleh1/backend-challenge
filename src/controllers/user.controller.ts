import { Request, Response } from "express";
import UserService from "../services/user.service";

class UserController {
  async getUser(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const user = await UserService.getUserById(Number(id));
    res.json(user);
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { name, email } = req.body;
    await UserService.updateUser(Number(id), name, email);
    res.json({ message: "User updated successfully" });
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    await UserService.deleteUser(Number(id));
    res.json({ message: "User deleted successfully" });
  }

  async getTopUsers(req: Request, res: Response): Promise<void> {
    const topUsers = await UserService.getTopUsersByLoginFrequency();
    res.json(topUsers);
  }

  async getInactiveUsers(req: Request, res: Response): Promise<void> {
    const { duration } = req.query;
    const inactiveUsers = await UserService.getInactiveUsers(
      duration as "hour" | "month"
    );
    res.json(inactiveUsers);
  }

  async getTotalUsers(req: Request, res: Response): Promise<void> {
    const totalUsers = await UserService.getTotalUsers();
    res.json({ totalUsers });
  }

  async getTotalVerifiedUsers(req: Request, res: Response): Promise<void> {
    const totalVerifiedUsers = await UserService.getTotalVerifiedUsers();
    res.json({ totalVerifiedUsers });
  }

  async verifyUser(req: Request, res: Response) {
    const { email } = req.body;
    const user = await UserService.verifyUser(email);
    res.json(user);
  }
  async getPaginatedUsers(req: Request, res: Response): Promise<void> {
    const page = parseInt(req.query.page as string) || 1; // Default page 1
    const limit = parseInt(req.query.limit as string) || 10; // Default limit 10

    try {
      const result = await UserService.getPaginatedUsers(page, limit);
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving users", error });
    }
  }
}

export default new UserController();
