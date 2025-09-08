import { type Request, type Response } from 'express'
import { prisma } from '../../db/prismaClient.ts'
import bcrypt from 'bcrypt'
import { ENV } from '../../config/env.ts'

type credentials = {
    oldPassword: string,
    newPassword: string
}

const resetPass = async (req: Request, res: Response) => {
    const { oldPassword, newPassword }: credentials = req.body
    const userId = req.session.userId

    if (!userId) {
        return res.status(401).send(`You are not logged in.`)
    }

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })

        if (!user) {
            return res.status(401).send(`User not found`)
        }

        const isMatch = await bcrypt.compare(oldPassword, user.passwordHash)
        if(!isMatch){
            return res.status(403).send(`Current password is wrong`)
        }

        const hashedPassword = await bcrypt.hash(newPassword, Number(ENV.SALT_ROUNDS))

        await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                passwordHash: hashedPassword
            }
        })

        return res.status(200).send(`Password updated`)

    } catch (error) {
        return res.status(500).send(`Error encountered : ${error}`)
    }
}

export default resetPass