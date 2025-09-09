import { Router } from "express";
import { searchUser } from "../controllers/user/searchUser.ts";

const userRouter = Router()

userRouter.get('/:username', searchUser)

export default userRouter