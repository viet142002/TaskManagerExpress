import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import path from 'path'
import YAML from 'yamljs'

import errorMiddleware from '~/middlewares/error.middleware'
import routes from '~/routes'
import responseMiddleware from '~/middlewares/reponse.middleware'
import { app } from '~/configs/server'

const swaggerDocument = YAML.load(path.join(__dirname, '../docs/swagger.yaml'))
const ALLOW_CORS = (process.env.ALLOW_CORS || '').split(',')

export const initMiddleWares = () => {
    app.use(
        cors({
            origin: ALLOW_CORS,
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
}
