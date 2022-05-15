import { DataSource } from 'typeorm'
import { User } from './entities/User'

class DB {
    dataSource: DataSource
    dbDataSource: DataSource
    constructor() {
        this.dataSource = new DataSource({
            type: 'postgres',
            database: 'netflix',
            username: 'postgres',
            password: '1705',
            logging: true,
            synchronize: true,
            entities: [User]
        })
    }

    async initalize() {
        this.dbDataSource = await this.dataSource.initialize()
    }

    get connection() {
        return this.dbDataSource
    }
}
const database = new DB()
export default database
