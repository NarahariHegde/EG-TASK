import { Router } from "express";

const router = Router();
import { login, signup } from "../Controller/Usercontroller.js";
router.post("/signup", signup);
router.post("/login", login);
export default router;
