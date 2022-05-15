import { app } from '..'
import dotenv from 'dotenv'
dotenv.config()
import supertest from 'supertest'
import { initializeRouters } from '../routes'
import database from '../connection'

describe('User Endpoints', () => {
    it('initalize stuff', async () => {
        await database.initalize()
        initializeRouters(app)
    })
    it('GET /api/v1/users/getUsers', async () => {
        await supertest(app).get('/api/v1/users/getUsers').expect(200)
    })

    // describe('Login route /api/v1/users/login', async () => {})

    afterAll(async () => {
        await database.connection.destroy()
    })
})
