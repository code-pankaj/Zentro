import { type Request, type Response } from "express"
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import { prisma } from "../../db/prismaClient.ts"

dotenv.config()

type credentials = {
    full_name: string,
    username: string,
    email: string,
    password: string
}


export const signup = async (req: Request, res: Response) => {
    const { full_name, username, email, password, } : credentials = req.body

    if(!email || !password || !full_name || !username){
        return res.status(400).send('All fields are mandatory')
    }

    try {
        const usernameExist = await prisma.user.findUnique({
            where: {
                username: username
            }
        })
        if(usernameExist){
            return res.status(401).send(`Username already exists`)
        }
        const emailExist = await prisma.user.findUnique({
            where: {
                email: email
            }
        })
        if(emailExist){
            return res.status(401).send(`Email already exists`)
        }
        const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS))
        const newUser = await prisma.user.create({
            data: {
                fullName: full_name,
                username: username,
                email: email,
                passwordHash: hashedPassword
            }
        })
        if(!newUser){
            return res.status(401).send(`Some error occured.`)
        }
        
        req.session.userId = newUser.id

        return res.status(200).send(`Successfully created user with email : ${email}`)
    } catch (error) {
        return res.status(500).send(`Error encountered : ${error}`)
    }
}