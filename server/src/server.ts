import { createServer } from 'http'
import { ENV } from "./config/env.ts";
import app from "./app.ts";
import { initSocket } from './socket.ts';

const server = createServer(app)

const port = ENV.PORT

initSocket(server)

server.listen(port, () => {
    console.log(`Server running at ${port}`)
})
