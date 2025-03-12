export interface IUserOnline {
    socketId: string // socket id
    userId: number
    email: string
}

interface IGetUsersProps {
    excludes?: string
    userId?: number
    email?: string
}

class UserOnline {
    private users: Array<IUserOnline>

    constructor() {
        this.users = []
    }

    addUser(user: IUserOnline) {
        this.users.push(user)
    }
    removeUser(socketId: string) {
        this.users = this.users.filter((user) => user.socketId !== socketId)
    }
    getUsers({ excludes, userId, email }: IGetUsersProps) {
        const excludeSet = excludes ? new Set(excludes) : null
        return this.users.filter((user) => {
            if (excludeSet && excludeSet.has(user.socketId)) return false
            if (userId !== undefined && user.userId !== userId) return false
            if (email !== undefined && user.email !== email) return false
            return true
        })
    }
    getUser(userId: number) {
        return this.users.find((user) => user.userId === userId) || null
    }
    existUser(userId: number) {
        return this.users.some((user) => user.userId === userId)
    }
}

const instance = new UserOnline()
export default instance
