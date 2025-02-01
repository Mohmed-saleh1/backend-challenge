import express from "express";
import UserController from "../controllers/user.controller";
import authMiddleware from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/", UserController.getPaginatedUsers);
router.get("/top-users", UserController.getTopUsers);
router.get("/inactive-users", UserController.getInactiveUsers);
router.get("/total-users", UserController.getTotalUsers);
router.post("/verify", UserController.verifyUser);
router.get(
  "/total-verified-users",

  UserController.getTotalVerifiedUsers
);
router.get("/:id", UserController.getUser);
router.put("/:id", UserController.updateUser);
router.delete("/:id", UserController.deleteUser);

export default router;
