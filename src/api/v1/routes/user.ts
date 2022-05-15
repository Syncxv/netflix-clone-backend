import { Router } from 'express'
import * as userController from '../controllers/users'
import tryCatch from '../util/trycatch'

const userRouter = Router()

userRouter.get('/getUsers', tryCatch(userController.getUsers))

export default userRouter
