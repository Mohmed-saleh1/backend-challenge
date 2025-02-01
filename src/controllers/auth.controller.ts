import { Request, Response } from "express";
import AuthService from "../services/auth.service";

class AuthController {
  async register(req: Request, res: Response): Promise<void> {
    const { name, email, password } = req.body;
    await AuthService.register(name, email, password);
    res.status(201).json({ message: "User registered successfully" });
  }

  async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    const result = await AuthService.login(email, password);
    if (!result) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }
    res.json(result);
  }
}

export default new AuthController();
