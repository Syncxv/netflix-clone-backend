import { sign } from 'jsonwebtoken'
import { User } from '../entities/User'

export const createAcessToken = (user: User) => {
    return sign({ user: { id: user.id, username: user.username, email: user.email } }, process.env.ACCESS_TOKEN_SECRET!, {
        expiresIn: '1d'
    })
}

export const createRefreshToken = (user: User) => {
    return sign({ user: { id: user.id, username: user.username, email: user.email } }, process.env.ACCESS_TOKEN_SECRET!, {
        expiresIn: '7d'
    })
}
