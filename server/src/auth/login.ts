import { type Request, type Response } from 'express'

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
        
    } catch (error) {
        res.status(400).send(`Error encountered : ${error}`)
    }
}