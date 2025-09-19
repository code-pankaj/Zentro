import { type Request, type Response } from "express";
import { prisma } from "../../db/prismaClient.ts";

type chatId = {
    chatId: string
}

export const sendMessage = async (req: Request<chatId>, res: Response) => {
    const { chatId } = req.params
    const { content } = req.body

    if (!req.session.userId) {
        return res.status(401).json({ error: "Unauthorized: userId missing in session" });
    }

    const participant = await prisma.chatParticipant.findFirst({
        where: {
            chatId,
            userId: req.session.userId
        }
    })

    if(!participant){
        return res.status(403).send('Not Authorized')
    }

    const message = await prisma.message.create({
        data: {
            content,
            chatId,
            senderId: req.session.userId
        },
        include: {
            sender: {
                select: {
                    id: true,
                    username: true
                }
            }
        }
    })
    return res.status(200).send(message)
}