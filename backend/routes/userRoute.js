import express from "express";
import {
  authUser,
  getUserProfile,
  registerUser,
  getAllUsers,
  updateUserProfile,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", authUser);
router.route("/").post(registerUser);
router.route("/profile").get(protect, getUserProfile);
router.route("/profile").put(protect, updateUserProfile);
router.route("/all").get(getAllUsers);

export default router;
