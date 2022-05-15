import { Express } from 'express'
import userRouter from './user'
export const initializeRouters = (app: Express) => {
    app.use('/api/v1/users', userRouter)
}
