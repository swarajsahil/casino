import express from "express";
import { getMyProfile, login, logout, register } from "../controllers/user.js"
import { authenticated } from "../middlewares/auth.js";

const router=express.Router();
router.post("/register",register);
router.post("/login",login);
router.get("/getdata",authenticated,getMyProfile);
router.get("/logout",logout);
export default router;