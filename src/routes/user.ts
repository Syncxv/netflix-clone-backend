import { Router } from 'express'
import * as userController from '../controllers/users'

const userRouter = Router()

userRouter.get('/getUsers', userController.getUsers)

export default userRouter
