import sendRequest from "../controllers/friends/sendRequest.ts";
import { Router } from "express";

const friendsRouter = Router()

friendsRouter.post('/sendrequest', sendRequest)

export default friendsRouter