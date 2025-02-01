import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

class JWT {
  private secret: string = process.env.JWT_SECRET || "secret";

  generateToken(payload: any): string {
    return jwt.sign(payload, this.secret, { expiresIn: "1h" });
  }

  verifyToken(token: string): any {
    try {
      console.log("the secreate is ", this.secret);

      return jwt.verify(token, this.secret);
    } catch (err) {
      if (err instanceof jwt.TokenExpiredError) {
        throw new Error("Token has expired.");
      }
      throw new Error("Invalid token.");
    }
  }
}

export default new JWT();
