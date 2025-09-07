import { createClient } from "redis";
import dotenv from 'dotenv'

dotenv.config()

export const redisClient = createClient({
    username: process.env.REDIS_USERNAME as string,
    password: process.env.REDIS_PASS as string,
    socket: {
        host: process.env.REDIS_HOST as string,
        port: Number(process.env.REDIS_PORT),
    },
})

redisClient.on("error", (err) => console.error("Redis Client Error", err));

await redisClient.connect()