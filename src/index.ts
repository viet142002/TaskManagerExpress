import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import YAML from 'yamljs'

import errorMiddleware from '~/middlewares/error.middleware'
import routes from '~/routes'
import responseMiddleware from '~/middlewares/reponse.middleware'
import path from 'path'

dotenv.config()

const swaggerDocument = YAML.load(path.join(__dirname, './docs/swagger.yaml'))
const app = express()

app.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true
    })
)
app.use(cookieParser())
app.use(
    bodyParser.urlencoded({
        extended: true
    })
)
app.use(bodyParser.json())
app.use(morgan('tiny'))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use('/api/v1', routes)

//@ts-expect-error is true
app.use(responseMiddleware)
//@ts-expect-error is true
app.use(errorMiddleware)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
