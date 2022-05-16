import { Router } from 'express'
import * as userController from '../controllers/users'
import tryCatch from '../util/trycatch'

const userRouter = Router()

userRouter.get('/getUsers', tryCatch(userController.getUsers))
userRouter.post('/register', tryCatch(userController.register))
userRouter.post('/login', tryCatch(userController.login))

export default userRouter
