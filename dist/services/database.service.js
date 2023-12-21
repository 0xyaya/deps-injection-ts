"use strict";
// src/services/database.service.ts
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var DatabaseService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseService = void 0;
const inversify_1 = require("inversify");
const typeorm_1 = require("typeorm");
const types_core_1 = require("../core/types.core");
const logger_service_1 = require("./logger.service");
const user_entity_1 = require("../entities/user.entity");
const appDataSource = new typeorm_1.DataSource({
    type: 'better-sqlite3',
    database: './main.sqlite',
    synchronize: true,
    logging: true,
    entities: [user_entity_1.User],
    subscribers: [],
    migrations: []
});
exports.default = appDataSource;
// ...
let DatabaseService = DatabaseService_1 = class DatabaseService {
    constructor(logger) {
        this.logger = logger;
    }
    getConnection() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if ((_a = DatabaseService_1.appDataSource) === null || _a === void 0 ? void 0 : _a.isInitialized) {
                this.logger.log('INFO', 'Connection Already Established!');
                return DatabaseService_1.appDataSource;
            }
            try {
                DatabaseService_1.appDataSource = yield appDataSource.initialize();
                this.logger.log('INFO', `Connection established`);
                return DatabaseService_1.appDataSource;
            }
            catch (e) {
                this.logger.log('ERROR', 'Cannot establish database connection');
                process.exit(1);
            }
        });
    }
};
exports.DatabaseService = DatabaseService;
exports.DatabaseService = DatabaseService = DatabaseService_1 = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_core_1.TYPES.Logger)),
    __metadata("design:paramtypes", [logger_service_1.Logger])
], DatabaseService);
