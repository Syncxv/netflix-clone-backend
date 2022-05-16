import argon2 from 'argon2'
import { Request, Response } from 'express'
import database from '../connection'
import { User } from '../entities/User'
import { createAcessToken } from '../util/jwt'

export const getUsers = async (_req: Request, res: Response) => {
    res.send({ users: await database.connection.manager.find(User) })
}

export const login = async (req: Request<any, any, { email: string; password: string }>, res: Response) => {
    const { email, password } = req.body

    const user = await database.connection.manager.findOne(User, {
        where: { email },
        select: ['password', 'email', 'id', 'username', 'createdAt', 'updatedAt']
    })

    if (!user) {
        return res.status(404).send({
            errors: [{ message: 'account not found EMAIL IS WRONG' }]
        })
    }
    console.log(user.password)
    const valid = await argon2.verify(user.password, password)
    if (!valid) {
        return res.status(403).send({
            errors: [{ message: 'password is wrong' }]
        })
    }

    return res.status(200).send({
        user: {
            ...user,
            password: undefined
        },
        accessToken: createAcessToken(user)
    })
}

export const register = async (
    req: Request<any, any, { username?: string; email: string; password?: string }>,
    res: Response
) => {
    if (!req.body.username || !req.body.password || !req.body.email) {
        return res.status(400).send({
            errors: [{ message: 'username, email or password wasnt provided bruv' }]
        })
    }
    const { username, email, password } = req.body
    if (username.length < 3) {
        return res.status(400).send({
            errors: [{ message: 'username is too short' }]
        })
    }
    if (password.length <= 6) {
        return res.status(400).send({
            errors: [{ message: 'password is too short' }]
        })
    }

    const dupUsername = await database.connection.manager.findOneBy(User, { username })
    if (dupUsername) {
        return res.status(400).send({
            errors: [{ message: 'username already exists :P' }]
        })
    }

    const dupUserEmail = await database.connection.manager.findOneBy(User, { email })
    if (dupUserEmail) {
        return res.status(400).send({
            errors: [{ message: 'email is already taken :P' }]
        })
    }

    const hash = await argon2.hash(password)
    const user = database.connection.manager.create(User, {
        username: username,
        email,
        password: hash
    })
    await database.connection.manager.save(user)

    return res.status(201).send({
        user,
        accessToken: createAcessToken(user)
    })
}
