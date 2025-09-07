import express from "express";
import dotenv from 'dotenv'
import cors from 'cors'
import router from "./routes/routes.ts";
import session from 'express-session'
import { RedisStore } from "connect-redis";
import { redisClient } from "./redis/redis.ts";

dotenv.config()

const app = express()

const port = process.env.PORT

// how this work in typescript?
declare module "express-session"{
    interface SessionData {
        userId: string
    }
}

app.use(express.json())
app.use(cors())

// what is redisstore?
const redisStore = new RedisStore({
    client: redisClient,
    prefix: "session:",
})

// how this is working??
app.use(
    session({
        store: redisStore,
        secret: process.env.SESSION_SECRET as string,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 1000 * 60 * 60 * 24
        },
    })
)

app.use('/api', router)

app.get("/profile", (req, res) => {
    if(!req.session.userId){
        return res.status(401).send('Not Authenticated')
    }
    res.status(200).send({
        message: 'Welcome!',
        userId: req.session.userId
    })
})

app.listen(port, () => {
    console.log(`Server running at ${port}`)
})
