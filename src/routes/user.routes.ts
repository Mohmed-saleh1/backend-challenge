import express from "express";
import UserController from "../controllers/user.controller";
import authMiddleware from "../middlewares/auth.middleware";
import adminMiddleware from "../middlewares/admin.middleware";

const router = express.Router();

router.get("/", UserController.getPaginatedUsers);
router.get(
  "/top-users",
  authMiddleware,
  adminMiddleware,
  UserController.getTopUsers
);
router.get(
  "/inactive-users",
  authMiddleware,
  adminMiddleware,
  UserController.getInactiveUsers
);
router.get(
  "/total-users",
  authMiddleware,
  adminMiddleware,
  UserController.getTotalUsers
);
router.post("/verify", UserController.verifyUser);
router.put("/update-role", UserController.updateRole);

router.get(
  "/total-verified-users",
  authMiddleware,
  adminMiddleware,
  UserController.getTotalVerifiedUsers
);
router.get("/:id", UserController.getUser);
router.put("/:id", UserController.updateUser);
router.delete("/:id", UserController.deleteUser);

export default router;
