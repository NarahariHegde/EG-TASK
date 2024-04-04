import { Router } from "express";

const router = Router();
import { login, signup } from "../Controller/Usercontroller";
router.post("/signup", signup);
router.post("/login", login);
export default router;
