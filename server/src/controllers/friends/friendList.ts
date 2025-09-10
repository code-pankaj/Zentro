import { type Request, type Response } from "express";
import { prisma } from "../../db/prismaClient.ts";

export const friendList = async (req: Request, res: Response) => {

    try {
        const userId = req.session.userId

        if(!userId){
            return res.status(403).send(`Please log in`)
        }

        const friendship = await prisma.friend.findMany({
            where: {
                OR: [
                    { userId },
                    { friendId: userId}
                ]
            },
            include: {
                user: true,
                friend: true
            }
        })

        const friends = friendship.map(f =>
            f.userId === userId ? f.friend : f.user
        )

        const uniqueFriends = Object.values(
            friends.reduce((acc, friend) => {
                acc[friend.id] = friend;
                return acc;
            }, {} as Record<string, typeof friends[number]>)
        )

        return res.status(200).send(uniqueFriends)

    } catch (error) {
        return res.status(500).send(`Error encountered : ${error}`)
    }
}