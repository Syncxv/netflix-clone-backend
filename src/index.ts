import express from 'express'
import 'reflect-metadata'
import initializeRouters from './api/v1'
import database from './connection'
const port = 3000

const main = async () => {
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

main().catch(err => console.error(err))
