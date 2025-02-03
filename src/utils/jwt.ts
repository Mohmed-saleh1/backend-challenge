import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

class JWT {
  private static instance: JWT;
  private secret: string;

  private constructor() {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables.");
    }
    this.secret = process.env.JWT_SECRET;
  }

  public static getInstance(): JWT {
    if (!JWT.instance) {
      JWT.instance = new JWT();
    }
    return JWT.instance;
  }

  generateToken(payload: any): string {
    return jwt.sign(payload, this.secret, { expiresIn: "1h" });
  }

  verifyToken(token: string): any {
    try {
      return jwt.verify(token, this.secret);
    } catch (err) {
      if (err instanceof jwt.TokenExpiredError) {
        throw new Error("Token has expired.");
      } else if (err instanceof jwt.JsonWebTokenError) {
        throw new Error("Invalid token.");
      }
      throw new Error("Token verification failed.");
    }
  }
}

export default JWT.getInstance();
