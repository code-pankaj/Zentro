import { Router } from "express";
import authRouter from "./auth.routes.ts";
import friendsRouter from "./friends.routes.ts";

const router = Router()

router.use('/auth', authRouter)
router.use('/friend', friendsRouter)

export default router