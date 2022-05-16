import { Request, Response } from 'express'

const tryCatch = (fn: Function) => {
    return async (req: Request, res: Response) => {
        try {
            await fn(req, res)
        } catch (err) {
            console.error(err)
            res.status(500).send({ errors: [{ message: 'SERVER ERROR whoopsie' }] })
        }
    }
}

export default tryCatch
