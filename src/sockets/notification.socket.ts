import { io } from '~/configs/socket'
import userOnline from '~/utils/helpers/sockets/userOnline'

interface IDataNotiSocket {
    type: string
    message: string
    navigate: string
}

export const socketNotify = {
    sendNoti: (userId: number, data: IDataNotiSocket) => {
        const user = userOnline.getUser(userId)
        if (user) {
            io.to(user.socketId).emit('notification', data)
        }
    }
}
