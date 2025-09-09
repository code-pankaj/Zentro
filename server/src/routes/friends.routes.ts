import { Router } from "express";
import sendRequest from "../controllers/friends/sendRequest.ts";
import { acceptRequest } from "../controllers/friends/acceptRequest.ts";

const friendsRouter = Router()

friendsRouter.post('/sendrequest', sendRequest)
friendsRouter.post('/acceptrequest', acceptRequest)

export default friendsRouter