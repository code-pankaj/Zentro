import { type Request, type Response } from 'express'
import bcrypt from 'bcrypt'
import { prisma } from '../../db/prismaClient.ts'

type credentials = {
    email: string,
    password: string
}

export const login = async (req: Request, res: Response) => {
    const { email, password } : credentials = req.body

    if(!email || !password ){
        res.status(400).send(`Input credentials please`)
    }

    try {
        const userExist = await prisma.user.findUnique({
            where: {
                email: email,
            }
        })
        if(!userExist){
            return res.status(400).send(`Email does not exist.`)
        }
        const passwordMatch = await bcrypt.compare(password, userExist.passwordHash)

        if(!passwordMatch){
            return res.status(401).send(`Wrong Password`)
        }

        req.session.userId = userExist.id
        console.log(req.session.userId)

        return res.status(200).send(`Welcome back, ${userExist.username}`)
        
    } catch (error) {
        res.status(500).send(`Error encountered : ${error}`)
    }
}