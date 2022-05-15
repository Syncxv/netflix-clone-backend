import express from 'express'
import 'reflect-metadata'
import { initializeRouters } from './routes'
import database from './connection'
const port = 3000

const apiV1Main = async () => {
    const app = express()
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
