"use strict";
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
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
// src/controllers/users.controller.ts
const express_1 = require("express");
const inversify_1 = require("inversify");
const inversify_express_utils_1 = require("inversify-express-utils");
const types_core_1 = require("../core/types.core");
const user_entity_1 = require("../entities/user.entity");
const database_service_1 = require("../services/database.service");
let UsersController = class UsersController {
    constructor(database) {
        this.database = database;
    }
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield this.database.getConnection();
            const userRepository = connection.getRepository(user_entity_1.User);
            const users = yield userRepository.find();
            return res.json(users);
        });
    }
    create(body, req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield this.database.getConnection();
            const userRepository = connection.getRepository(user_entity_1.User);
            const user = new user_entity_1.User();
            user.email = body.email;
            user.password = body.password;
            userRepository.save(user);
            return res.sendStatus(201);
        });
    }
    show(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield this.database.getConnection();
            const userRepository = connection.getRepository(user_entity_1.User);
            return userRepository.findOneBy({ id: userId });
        });
    }
    update(body, userId, req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield this.database.getConnection();
            const userRepository = connection.getRepository(user_entity_1.User);
            const user = yield userRepository.findOneBy({ id: userId });
            user.email = (_a = body.email) !== null && _a !== void 0 ? _a : user.email;
            user.password = (_b = body.password) !== null && _b !== void 0 ? _b : user.password;
            yield userRepository.save(user);
            return res.sendStatus(204);
        });
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, inversify_express_utils_1.httpGet)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _a : Object, typeof (_b = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "index", null);
__decorate([
    (0, inversify_express_utils_1.httpPost)('/'),
    __param(0, (0, inversify_express_utils_1.requestBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_c = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _c : Object, typeof (_d = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _d : Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
__decorate([
    (0, inversify_express_utils_1.httpGet)('/:userId'),
    __param(0, (0, inversify_express_utils_1.requestParam)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "show", null);
__decorate([
    (0, inversify_express_utils_1.httpPut)('/:userId'),
    __param(0, (0, inversify_express_utils_1.requestBody)()),
    __param(1, (0, inversify_express_utils_1.requestParam)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, typeof (_e = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _e : Object, typeof (_f = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _f : Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "update", null);
exports.UsersController = UsersController = __decorate([
    (0, inversify_express_utils_1.controller)('/users'),
    __param(0, (0, inversify_1.inject)(types_core_1.TYPES.DatabaseService)),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], UsersController);
