import UserModel from "../models/user.model";
import JWT from "../utils/jwt";
import bcrypt from "bcryptjs";

class AuthService {
  async register(name: string, email: string, password: string): Promise<any> {
    const hashedPassword = await bcrypt.hash(password, 10);
    return UserModel.createUser(name, email, hashedPassword);
  }

  async login(
    email: string,
    password: string
  ): Promise<string | { token: string; user: any }> {
    const [user] = await UserModel.getUserByEmail(email);

    if (!user) {
      return "invalid credentials";
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return "invalid credentials";
    }

    if (!user.verified) {
      return "Please verify your email first";
    }
    const userWithoutPassword = { ...user };
    delete userWithoutPassword.password;
    await UserModel.updateLastLogin(user.id);
    await UserModel.updateLoginCount(user.id);
    const token = JWT.generateToken({ id: user.id, email: user.email });

    return { token, user: userWithoutPassword };
  }
}

export default new AuthService();
