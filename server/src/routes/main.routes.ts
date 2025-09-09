import { Router } from "express";
import authRouter from "./auth.routes.ts";
import friendsRouter from "./friends.routes.ts";
import userRouter from "./user.routes.ts";

const router = Router()

router.use('/auth', authRouter)
router.use('/friend', friendsRouter)
router.use('/user', userRouter)

export default router