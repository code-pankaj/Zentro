import { type Request, type Response } from 'express'
import { prisma } from '../../db/prismaClient.ts'

type chatId = {
    chatId: string
}

export const getChat = async (req: Request<chatId>, res: Response) => {
    const { chatId } = req.params

    const chat = await prisma.chat.findUnique({
        where: {
            id: chatId
        },
        include: {
            participants: true,
            messages: {
                include: {
                    sender: {
                        select: {
                            id: true,
                            username: true
                        }
                    }
                },
                orderBy: {
                    createdAt: "asc"
                }
            }
        }
    })

    if(!chat){
        return res.status(404).send('Chat not Found')
    }

    const isParticipant = chat.participants.some(p => p.userId === req.session.userId)
    if(!isParticipant){
        return res.status(403).send('Not Authorized')
    }

    return res.status(200).send(chat.messages)
}