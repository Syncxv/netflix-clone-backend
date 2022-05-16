import dotenv from 'dotenv'
dotenv.config()
import apiV1Main from './api/v1'

apiV1Main().catch(err => console.error(err))
