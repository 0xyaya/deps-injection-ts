// src/core/container.core.ts
import {Container} from 'inversify';
import {Logger} from '../services/logger.service';
import {DatabaseService} from '../services/database.service';
import {TYPES} from './types.core';
import '../controllers/home.controller';
import '../controllers/users.controller';

export const container = new Container();
container.bind(TYPES.Logger).to(Logger);
container.bind(TYPES.DatabaseService).to(DatabaseService);
