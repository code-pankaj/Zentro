import { Server } from 'socket.io'
import type { Server as HTTPServer } from 'http'
import { ENV } from './config/env.ts';

let io: Server;

export const initSocket = (server: HTTPServer) => {
    io = new Server(server, {
        cors: {
            origin: ENV.CLIENT_URL,
            methods: ['GET', 'POST']
        }
    })

    io.on("connection", (socket) => {
        console.log("Socket Connected : ", socket.id)

        socket.on("join_chat", (chatId: string) => {
            socket.join(chatId)
            console.log(`User ${socket.id} joined chat ${chatId}`)
        })
        socket.on("disconnect", () => {
            console.log("Socket disconnected : ", socket.id)
        })
    })

    return io;
}

export const getIO = () => {
    if(!io){
        throw new Error('Socket.io not initialized!')
    }
    return io
}