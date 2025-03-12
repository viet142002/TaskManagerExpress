import { Server, type Server as IO } from 'socket.io'

import { server } from '~/configs/server'
import usersSocket from '~/utils/helpers/sockets/userOnline'

const ALLOW_CORS = (process.env.ALLOW_CORS || '').split(',')

export const io: IO = new Server(server, {
    cors: { origin: ALLOW_CORS, credentials: true }
})

export const initSocket = () => {
    io.on('connection', (socket) => {
        const user = {
            socketId: socket.id,
            userId: 1,
            email: 'viet@gmail.com'
        }
        const existUser = usersSocket.getUser(user.userId)
        if (existUser) {
            io.to(existUser.socketId).emit('same_login', {
                message: 'Tai khoan da duoc login ở một thiết bị khác'
            })
            io.to(existUser.socketId).disconnectSockets()
        }
        usersSocket.addUser(user)

        socket.on('disconnect', (reason) => {
            console.log('=================== reason disconnect: ', reason)
            usersSocket.removeUser(socket.id)
        })
    })
}
