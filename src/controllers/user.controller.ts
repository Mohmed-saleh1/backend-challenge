import { Request, Response } from "express";
import UserService from "../services/user.service";

class UserController {
  constructor() {
    this.getPaginatedUsers = this.getPaginatedUsers.bind(this);
  }

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

  async updateRole(req: Request, res: Response) {
    const { email } = req.body;
    const user = await UserService.updateRole(email);
    res.json(user);
  }

  async isValidDate(dateString: string): Promise<boolean> {
    console.log(dateString);
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    console.log(regex);
    if (!regex.test(dateString)) return false;
    const date = new Date(dateString);
    return date.toISOString().startsWith(dateString);
  }
  async getPaginatedUsers(req: Request, res: Response): Promise<any> {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const startDate = req.query.start_date?.toString();
    const endDate = req.query.end_date?.toString();

    const validations: { [key: string]: string } = {};

    if (startDate) {
      if (!(await this.isValidDate(startDate))) {
        validations.start_date = "Invalid start date format (YYYY-MM-DD)";
      }
    }

    if (endDate) {
      if (!(await this.isValidDate(endDate))) {
        validations.end_date = "Invalid end date format (YYYY-MM-DD)";
      }
    }

    if (Object.keys(validations).length > 0) {
      return res.status(400).json({ errors: validations });
    }

    try {
      const result = await UserService.getPaginatedUsers(
        page,
        limit,
        startDate,
        endDate
      );
      res.json(result);
    } catch (error) {
      console.error("Error retrieving users:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default new UserController();
