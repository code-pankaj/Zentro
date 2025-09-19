import { Router } from "express";
import authRouter from "./auth.routes.ts";
import friendsRouter from "./friends.routes.ts";
import userRouter from "./user.routes.ts";
import chatRouter from "./chats.routes.ts";

const router = Router()

router.use('/auth', authRouter)
router.use('/friend', friendsRouter)
router.use('/user', userRouter)
router.use('/chat', chatRouter)

export default router