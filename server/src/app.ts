import express from "express";
import cors from 'cors'
import router from "./routes/main.routes.ts";
import { sessionMiddleware } from "./middlewares/session.middleware.ts";

const app = express()

app.use(express.json())
app.use(cors())
app.use(sessionMiddleware)
app.use('/api', router)

export default app

