import session from 'express-session'
import { redisStore } from '../db/redisStore.ts'

export const sessionMiddleware = session({
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
