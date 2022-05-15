import { Express } from 'express'
import userRouter from './user'
export const initializeRouters = (app: Express) => {
    app.use('/users', userRouter)
}
