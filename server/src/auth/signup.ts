import { type Request, type Response } from "express"
import supabase from "../supabase/connection.ts"

type credentials = {
    email: string,
    password: string
}

export const signup = async (req: Request, res: Response) => {
    const { email, password } : credentials = req.body

    if(!email || !password){
        res.status(400).send('All fields are mandatory')
    }

    try {
        let { data, error } = await supabase.auth.signUp({
            email: email,
            password: password
        })
        res.status(200).send(`User created successfully with ${email}`)
    } catch (error) {
        res.status(400).send(`Error encountered : ${error}`)
    }
}