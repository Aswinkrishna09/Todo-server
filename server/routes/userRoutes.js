import express from "express";
const router = express.Router();
import {
  userLogin,
  registerUser,
  AddTodo,
  getTodo,
} from "../controller/userController.js";
import { protect } from "../middlewares/authMiddleware.js";


router.route("/login").post(userLogin);
router.route("/register").post(registerUser);
router.route("/addtodoCard").post(protect, AddTodo);
router.route("/getAllTodoCards").get(protect, getTodo);

export default router;
