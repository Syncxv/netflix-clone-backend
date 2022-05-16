import { app } from '..'
import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import supertest from 'supertest'
import { initializeRouters } from '../routes'
import database from '../connection'

describe('User Endpoints', () => {
    it('initalize stuff', async () => {
        app.use(express.json())
        await database.initalize()
        initializeRouters(app)
    })
    it('GET /api/v1/users/getUsers', async () => {
        await supertest(app).get('/api/v1/users/getUsers').expect(200)
    })

    describe('register route /api/v1/users/register', () => {
        describe('username and password are not given', () => {
            it('should return status 400', async () => {
                const { body, statusCode } = await supertest(app).post('/api/v1/users/register')
                expect(statusCode).toBe(400)
                expect(body).toHaveProperty('errors')
            })
        })
        describe('given username is too short', () => {
            it('should return status 400', async () => {
                const { body, statusCode } = await supertest(app)
                    .post('/api/v1/users/register')
                    .send({ username: '12', password: 'hi' })
                expect(statusCode).toBe(400)
                expect(body).toHaveProperty('errors')
            })
        })
    })

    afterAll(async () => {
        await database.connection.destroy()
    })
})
