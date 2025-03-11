import bcrypt from 'bcrypt'

export const hashData = async (data: string | Buffer<ArrayBufferLike>) => {
    const salt = await bcrypt.genSalt(10)
    const hashed = await bcrypt.hash(data, salt)
    return hashed
}
