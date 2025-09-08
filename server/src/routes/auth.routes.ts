import { login } from "../controllers/auth/login.ts";
import { signup } from "../controllers/auth/signup.ts";
import resetPass from "../controllers/auth/resetPass.ts";
import { Router } from "express";

const authRouter = Router()

authRouter.post('/signup', signup)
authRouter.post('/login', login)
authRouter.post('/resetpassword', resetPass)

export default authRouter