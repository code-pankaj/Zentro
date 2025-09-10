import { Router } from "express";
import sendRequest from "../controllers/friends/sendRequest.ts";
import { acceptRequest } from "../controllers/friends/acceptRequest.ts";
import { friendList } from "../controllers/friends/friendList.ts";

const friendsRouter = Router()

friendsRouter.post('/sendrequest', sendRequest)
friendsRouter.post('/acceptrequest', acceptRequest)
friendsRouter.get('/getfriends', friendList)

export default friendsRouter