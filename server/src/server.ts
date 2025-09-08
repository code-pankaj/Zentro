import { createServer } from 'http'
import { Server } from 'socket.io'
import { ENV } from "./config/env.ts";
import app from "./app.ts";

const server = createServer(app)

const port = ENV.PORT

const io = new Server(server, {
    cors: {
        origin: "*"
    }
})

server.listen(port, () => {
    console.log(`Server running at ${port}`)
})
