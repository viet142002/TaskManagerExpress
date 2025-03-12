import dotenv from 'dotenv'

import { server } from '~/configs/server'
import { initMiddleWares } from '~/configs/middlewares'
import { initSocket } from '~/configs/socket'

dotenv.config()

initMiddleWares()
initSocket()

const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
