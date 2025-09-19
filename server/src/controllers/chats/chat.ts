import { type Request, type Response } from 'express'
import { prisma } from '../../db/prismaClient.ts'

type User = {
    userId: string
}

export const chat = async (req: Request,res: Response) => {
    const { userId } : User = req.body
    const myId = req.session.userId

    if(!myId){
        return res.status(400).send('Please log in ')
    }

    if(myId === userId){
        return res.status(400).send('Cannot talk to yourself')
    }

    const existingChat = await prisma.chat.findFirst({
        where: {
            participants: {
                every: {
                    userId: { in : [myId, userId]}
                }
            }
        },
        include: {
            participants: {
                include: { user: true}
            }
        }
    })

    if(existingChat){
        return res.status(200).send(existingChat)
    }

    const newChat = await prisma.chat.create({
        data: {
            participants: {
                create: [
                    { userId: myId},
                    { userId: userId}
                ]
            }
        },
        include: {
            participants: {
                include: {
                    user: true
                }
            }
        }
    })
    return res.status(200).send(newChat)
}