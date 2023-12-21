// src/entities/user.entity.ts
import /* ... */ 'typeorm';
import {Column, Entity, PrimaryGeneratedColumn, Repository} from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    email: string;

    @Column()
    password: string;
}

// export class UserRepository extends Repository<User> {}
