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
    const token = await AuthService.login(email, password);
    if (!token) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }
    res.json({ token });
  }
}

export default new AuthController();
