import { Router } from "express";
import { chat } from "../controllers/chats/chat.ts";
import { getChat } from "../controllers/chats/fetchMessage.ts";
import { sendMessage } from "../controllers/chats/sendMessage.ts";

const chatRouter = Router()

chatRouter.post('/start', chat)
chatRouter.get('/:chatId/messages', getChat)
chatRouter.post('/:chatId/message', sendMessage)

export default chatRouter