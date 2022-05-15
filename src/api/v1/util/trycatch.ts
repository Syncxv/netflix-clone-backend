import { Request, Response } from 'express'

const tryCatch = (fn: Function) => {
    return (req: Request, res: Response) => {
        try {
            fn(req, res)
        } catch (err) {
            console.error(err)
            res.send({ errors: [{ message: 'SERVER ERROR whoopsie' }] })
        }
    }
}

export default tryCatch
