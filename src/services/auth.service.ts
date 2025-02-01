import UserModel from "../models/user.model";
import JWT from "../utils/jwt";
import bcrypt from "bcryptjs";

class AuthService {
  async register(name: string, email: string, password: string): Promise<any> {
    const hashedPassword = await bcrypt.hash(password, 10);
    return UserModel.createUser(name, email, hashedPassword);
  }

  async login(email: string, password: string): Promise<string | null> {
    const [user] = await UserModel.getUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return null;
    }
    return JWT.generateToken({ id: user.id, email: user.email });
  }
}

export default new AuthService();
