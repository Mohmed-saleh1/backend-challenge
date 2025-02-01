import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const generateToken = (userId: number, isAdmin: boolean) => {
  return jwt.sign({ userId, isAdmin }, process.env.JWT_SECRET as string, {
    expiresIn: "1d",
  });
};
