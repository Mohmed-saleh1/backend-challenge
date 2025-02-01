import jwt from "jsonwebtoken";

class JWT {
  private secret: string = process.env.JWT_SECRET || "secret";

  generateToken(payload: any): string {
    return jwt.sign(payload, this.secret, { expiresIn: "1h" });
  }

  verifyToken(token: string): any {
    return jwt.verify(token, this.secret);
  }
}

export default new JWT();
