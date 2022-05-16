import express from 'express'
import 'reflect-metadata'
import { initializeRouters } from './routes'
import database from './connection'
const port = 3000

export const app = express()

const apiV1Main = async () => {
    app.use(express.json())
    await database.initalize()
    initializeRouters(app)
    app.get('/', (_, res) => {
        res.send({ hello: 'wolrd' })
    })
    app.listen(port, () => {
        console.log(`listening on port ${port}`)
    })
}
export default apiV1Main
