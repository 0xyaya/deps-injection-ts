// src/services/database.service.ts

import {inject, injectable} from 'inversify';
import {DataSource, ObjectType, Repository} from 'typeorm';
import {TYPES} from '../core/types.core';
import {Logger} from './logger.service';
import {User} from '../entities/user.entity';

const appDataSource = new DataSource({
    type: 'better-sqlite3',
    database: './main.sqlite',
    synchronize: true,
    logging: true,
    entities: [User],
    subscribers: [],
    migrations: []
});

export default appDataSource;

// ...
@injectable()
export class DatabaseService {
    private static appDataSource: DataSource;

    public constructor(@inject(TYPES.Logger) private readonly logger: Logger) {}

    public async getConnection(): Promise<DataSource> {
        if (DatabaseService.appDataSource?.isInitialized) {
            this.logger.log('INFO', 'Connection Already Established!');
            return DatabaseService.appDataSource;
        }

        try {
            DatabaseService.appDataSource = await appDataSource.initialize();
            this.logger.log('INFO', `Connection established`);
            return DatabaseService.appDataSource;
        } catch (e) {
            this.logger.log('ERROR', 'Cannot establish database connection');
            process.exit(1);
        }
    }

    // public async getRepository<T>(repository: T): Promise<Repository<T> {
    //     const connection = await this.getConnection();
    //     return await connection.getRepository<T>(repository);
    // }
}
