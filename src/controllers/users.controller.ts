// src/controllers/users.controller.ts
import {Request, Response} from 'express';
import {inject} from 'inversify';
import {
    controller,
    httpDelete,
    httpGet,
    httpPost,
    httpPut,
    requestBody,
    requestParam
} from 'inversify-express-utils';
import {TYPES} from '../core/types.core';
import {User} from '../entities/user.entity';
import {DatabaseService} from '../services/database.service';

interface CreateUserBody {
    email: string;
    password: string;
}

interface UpdateUserBody {
    email: string;
    password: string;
}

@controller('/users')
export class UsersController {
    public constructor(
        @inject(TYPES.DatabaseService)
        private readonly database: DatabaseService
    ) {}

    @httpGet('/')
    public async index(req: Request, res: Response) {
        const connection = await this.database.getConnection();

        const userRepository = connection.getRepository(User);

        const users = await userRepository.find();
        return res.json(users);
    }

    @httpPost('/')
    public async create(
        @requestBody() body: CreateUserBody,
        req: Request,
        res: Response
    ) {
        const connection = await this.database.getConnection();
        const userRepository = connection.getRepository(User);
        const user = new User();
        user.email = body.email;
        user.password = body.password;
        userRepository.save(user);
        return res.sendStatus(201);
    }

    @httpGet('/:userId')
    public async show(@requestParam('userId') userId: number) {
        const connection = await this.database.getConnection();
        const userRepository = connection.getRepository(User);
        return userRepository.findOneBy({id: userId});
    }

    @httpPut('/:userId')
    public async update(
        @requestBody() body: UpdateUserBody,
        @requestParam('userId') userId: number,
        req: Request,
        res: Response
    ) {
        const connection = await this.database.getConnection();
        const userRepository = connection.getRepository(User);
        const user = await userRepository.findOneBy({id: userId});
        user.email = body.email ?? user.email;
        user.password = body.password ?? user.password;
        await userRepository.save(user);
        return res.sendStatus(204);
    }

    @httpDelete('/:userId')
    public async destroy(
        @requestParam('userId') userId: number,
        req: Request,
        res: Response
    ) {
        const connection = await this.database.getConnection();
        const userRepository = connection.getRepository(User);
        const user = await userRepository.findOneBy({id: userId});
        await userRepository.delete(user);
        return res.sendStatus(204);
    }
}
