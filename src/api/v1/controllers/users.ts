import { Request, Response } from 'express'
import database from '../connection'
import { User } from '../entities/User'

export const getUsers = async (_req: Request, res: Response) => {
    res.send({ users: await database.connection.manager.find(User) })
}
