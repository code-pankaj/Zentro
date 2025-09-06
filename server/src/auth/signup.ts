import { type Request, type Response } from "express"

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
        
    } catch (error) {
        return res.status(400).send(`Error encountered : ${error}`)
    }
}