import { RedisStore } from "connect-redis";
import { redisClient } from "./redis.ts";

export const redisStore = new RedisStore({
    client: redisClient,
    prefix: "session:",
})