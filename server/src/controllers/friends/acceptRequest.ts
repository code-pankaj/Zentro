import { type Request, type Response } from 'express'
import { prisma } from '../../db/prismaClient.ts'

type requestFormat = {
    requestId: string
}

export const acceptRequest = async (req: Request, res: Response) => {
    const { requestId } : requestFormat = req.body

    if (!requestId) {
        return res.status(401).send(`Specify who to send request.`)
    }

    try {

        const receiverId = req.session.userId

        if (!receiverId) {
            return res.status(401).send(`Please log in first`)
        }
        const request = await prisma.friendRequest.findUnique({
            where: {
                id: requestId
            }
        })

        if (!request){
            return res.status(404).send(`Request not found`)
        }

        if(request.toId != receiverId){
            return res.status(403).send(`You are not authorized to accept this request`)
        }

        const accept = await prisma.friendRequest.update({
            where: {
                id: requestId
            },
            data: {
                status: "ACCEPTED"
            }
        })

        await prisma.friend.createMany({
            data: [
                {
                    userId: receiverId,
                    friendId: request.fromId
                },
                {
                    userId: request.fromId,
                    friendId: receiverId
                }
            ]
        })

        return res.status(200).send(`Friend request Accepted`)

    } catch (error) {
        return res.status(500).send(`Error encountered ; ${error}`)
    }
}