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

  async getAllUsers(req: Request, res: Response): Promise<void> {
    const users = await UserService.getAllUsers();
    res.json(users);
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
}

export default new UserController();
