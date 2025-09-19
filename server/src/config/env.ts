import dotenv from 'dotenv'

dotenv.config()

export const ENV = {
    PORT: process.env.PORT,
    PGHOST: process.env.PGHOST,
    PGDATABASE: process.env.PGDATABASE,
    PGUSER: process.env.PGUSER,
    PGPASSWORD: process.env.PGPASSWORD,
    ENDPOINT_ID: process.env.ENDPOINT_ID,
    SESSION_SECRET: process.env.SESSION_SECRET,
    REDIST_USERNAME: process.env.REDIST_USERNAME,
    REDIS_PASS: process.env.REDIS_PASS,
    REDIS_HOST: process.env.REDIS_HOST,
    REDIS_PORT: process.env.REDIS_PORT,
    SALT_ROUNDS: process.env.SALT_ROUNDS,
    DATABASE_URL: process.env.DATABASE_URL,
    CLIENT_URL: process.env.CLIENT_URL
}