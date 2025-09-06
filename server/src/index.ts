import express from "express";
import dotenv from 'dotenv'
import cors from 'cors'
import router from "./routes/routes.ts";

dotenv.config()
const app = express()

const port = process.env.PORT

app.use(express.json())
app.use(cors())
app.use('/api', router)

app.listen(port, () => {
    console.log(`Server running at ${port}`)
})
