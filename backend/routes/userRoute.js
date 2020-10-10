import express from "express";
import {
  authUser,
  getUserProfile,
  registerUser,
  getAllUsers,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", authUser);
router.route("/").post(registerUser);
router.route("/profile").get(protect, getUserProfile);
router.route("/all").get(getAllUsers);

export default router;
