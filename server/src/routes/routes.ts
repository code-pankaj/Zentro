import { Router } from "express";
import { login } from "../auth/login.ts";
import { signup } from "../auth/signup.ts";
import resetPass from "../auth/resetPass.ts";

const router = Router()

router.post('/signup', signup)
router.post('/login', login)
router.post('/resetpassword', resetPass)

export default router