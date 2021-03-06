import { app } from '..'
import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import supertest from 'supertest'
import { initializeRouters } from '../routes'
import database from '../connection'
import { User } from '../entities/User'

describe('User Endpoints', () => {
    const randNumber = Math.floor(Math.random() * 100000000000)
    const registerUsername = `test-user-${randNumber}`
    const registerEmail = `test-email-${randNumber}@gmail.com`
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
            it('should return status 400 and return errors array', async () => {
                const { body, statusCode } = await supertest(app).post('/api/v1/users/register')
                expect(statusCode).toBe(400)
                expect(body).toHaveProperty('errors')
            })
        })
        describe('given username is too short', () => {
            it('should return status 400 and return errors array', async () => {
                const { body, statusCode } = await supertest(app)
                    .post('/api/v1/users/register')
                    .send({ username: '12', email: registerEmail, password: 'w-9gu30j4jjr' })
                expect(statusCode).toBe(400)
                expect(body).toHaveProperty('errors')
            })
        })

        describe('given password is too short', () => {
            it('should return status 400 and return errors array', async () => {
                const { body, statusCode } = await supertest(app)
                    .post('/api/v1/users/register')
                    .send({ username: 'blahblah', email: registerEmail, password: 'hehe' })
                expect(statusCode).toBe(400)
                expect(body).toHaveProperty('errors')
            })
        })

        describe('given username already exists', () => {
            it('should return status 400 and return errors array', async () => {
                const { body, statusCode } = await supertest(app)
                    .post('/api/v1/users/register')
                    .send({ username: 'blahblah', email: registerEmail, password: 'hehe' })
                expect(statusCode).toBe(400)
                expect(body).toHaveProperty('errors')
            })
        })

        describe('given the correct data', () => {
            it('should return user object and access token', async () => {
                const { body, statusCode } = await supertest(app)
                    .post('/api/v1/users/register')
                    .send({ username: registerUsername, email: registerEmail, password: '123456789' })
                expect(statusCode).toBe(201)
                expect(body).toHaveProperty('user')
                expect(body).toHaveProperty('accessToken')
            })
        })
    })

    describe('login route /api/v1/users/login', () => {
        describe('user enters a email that does not exist', () => {
            it('should return status 404 and return errors array', async () => {
                const { body, statusCode } = await supertest(app)
                    .post('/api/v1/users/login')
                    .send({ email: 'randoemailzzzzzzzzzzz@gmail.com', password: 'hehe' })
                expect(statusCode).toBe(404)
                expect(body).toHaveProperty('errors')
            })
        })

        describe('when user enters the wrong password', () => {
            it('should return status 403 and return errors array', async () => {
                const { body, statusCode } = await supertest(app)
                    .post('/api/v1/users/login')
                    .send({ email: 'dave2@gmail.com', password: 'HEHEHHEHA' })
                expect(statusCode).toBe(403)
                expect(body).toHaveProperty('errors')
            })
        })

        describe('when email and password are both correct', () => {
            it('should return user object and access token', async () => {
                const { body, statusCode } = await supertest(app)
                    .post('/api/v1/users/login')
                    .send({ email: 'dave2@gmail.com', password: '123456789' })
                expect(statusCode).toBe(200)
                expect(body).toHaveProperty('user')
                expect(body).toHaveProperty('accessToken')
            })
        })
    })

    afterAll(async () => {
        await database.connection.manager.delete(User, { username: registerUsername })
        await database.connection.destroy()
    })
})
