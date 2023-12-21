// src/main.ts
import 'reflect-metadata';
import 'typeorm';
import 'reflect-metadata';
import {server} from './core/server';

// @Entity()
// export class InfuzedAccount {
//     @PrimaryGeneratedColumn()
//     id: number;

//     @Column({unique: true})
//     wallet: string;

//     @Column({unique: true})
//     txId: string;
// }

// class Logger {
//     log(message: string): void {
//         const time = new Date().toISOString();
//         console.log(`${time} -- ${message}`);
//     }
// }

// class InfuzedAccountService {
//     private dataSource: DataSource;
//     private logger: Logger;

//     constructor() {
//         this.logger = new Logger();
//     }

//     async createInfuzedAccount(): Promise<InfuzedAccount> {
//         if (this.dataSource === undefined) {
//             this.logger.log('Initialize connection');
//             this.dataSource = await DataSource();
//         }
//     }
// }

const port = 3000;

server
    .build()
    .listen(port, () => console.log(`Listen on http://localhost:${port}/`));
