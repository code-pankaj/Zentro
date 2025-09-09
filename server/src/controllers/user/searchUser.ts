import { type Request, type Response } from 'express'
import { prisma } from '../../db/prismaClient.ts'

type usernameFormat = {
    username: string
}

export const searchUser = async (req: Request<usernameFormat>, res: Response) => {
    const { username } = req.params

    try {
        const user = await prisma.user.findUnique({
            where: {
                username: username
            }
        })

        if(!user){
            return res.status(404).send(`User not found`)
        }

        return res.status(200).send(`User name is : ${user.fullName}`)
    } catch (error) {
        return res.status(500).send(`Error Encountered : ${error}`)
    }
}