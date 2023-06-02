import express, { Router } from "express";
import {
  userLoginPost,
  userSignUpPost,
  secretPage,
} from "./controllers/userRouteControllers.js";
import { requireAuth, checkUserAuthGet } from "../Middleware/authMiddleware.js";

const router = Router();
router.route("*").get(checkUserAuthGet);
router.route("/login").post(userLoginPost);
router.route("/signup").post(userSignUpPost);
router.route("/hidden").get(requireAuth).get(secretPage);
export default router;
