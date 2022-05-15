import { app } from '..'
import supertest from 'supertest'
import { initializeRouters } from '../routes'
import database from '../connection'

describe('User Endpoints', () => {
    it('initalize stuff', async () => {
        await database.initalize()
        initializeRouters(app)
    })
    it('GET /api/v1/user should show all users', async () => {
        await supertest(app).get('/api/v1/users/getUsers').expect(200)
        // expect(true).toBe(true)
    })

    afterAll(async () => {
        await database.connection.destroy()
    })
})
