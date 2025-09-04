import express from "express";
import { signup } from "./auth/signup.ts";
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()
const app = express()

const port = process.env.PORT

app.use(express.json())
app.use(cors())

app.post('/signup', signup)

app.listen(port, () => {
    console.log(`Server running at ${port}`)
})
