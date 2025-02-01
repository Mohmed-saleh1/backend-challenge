import express from "express";
import UserController from "../controllers/user.controller";
import authMiddleware from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/:id", authMiddleware, UserController.getUser);
router.put("/:id", authMiddleware, UserController.updateUser);
router.delete("/:id", authMiddleware, UserController.deleteUser);
router.get("/", authMiddleware, UserController.getAllUsers);
router.get("/top-users", authMiddleware, UserController.getTopUsers);
router.get("/inactive-users", authMiddleware, UserController.getInactiveUsers);
router.get("/total-users", authMiddleware, UserController.getTotalUsers);
router.get(
  "/total-verified-users",
  authMiddleware,
  UserController.getTotalVerifiedUsers
);

export default router;
