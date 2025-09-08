import { type Request, type Response } from "express";
import { prisma } from '../../db/prismaClient.ts'

type details = {
    senderId: string,
    receiverId: string
}

const sendRequest = async (req: Request, res: Response) => {
    const { senderId, receiverId } : details = req.body

    if(!senderId || !receiverId){
        return res.status(400).send(`Please provide all fields`)
    }

    try {
        const sender = await prisma.user.findUnique({
            where: {
                id: senderId
            }
        })
        if(!sender){
            return res.status(404).send(`Sender not found.`)
        }
        const receiver = await prisma.user.findUnique({
            where: {
                id: receiverId
            }
        })
        if(!receiver){
            return res.status(404).send(`User not found`)
        }

        const existing = await prisma.friendRequest.findFirst({
            where: {
                fromId: senderId, 
                toId: receiverId,
                status: "PENDING" 
            }
        })

        if(existing){
            return res.status(400).send(`Request already sent.`)
        }

        const request = await prisma.friendRequest.create({
            data: {
                fromId: senderId,
                toId: receiverId
            }
        })

        return res.status(201).send(`Friend request sent`)

    } catch (error) {
        return res.status(500).send(`Error encountered : ${error}`)
    }
}

export default sendRequest