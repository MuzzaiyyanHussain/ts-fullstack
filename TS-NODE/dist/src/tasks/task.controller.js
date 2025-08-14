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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksController = void 0;
const inversify_1 = require("inversify");
const user_controller_1 = require("../user/user.controller");
const tasks_service_1 = require("./tasks.service");
const updateTask_provider_1 = require("./providers/updateTask.provider");
const express_validator_1 = require("express-validator");
const getTask_provider_1 = require("./providers/getTask.provider");
let TasksController = class TasksController {
    constructor(userController, taskService, updateTaskProvider, getTaskProvider) {
        this.userController = userController;
        this.taskService = taskService;
        this.updateTaskProvider = updateTaskProvider;
        this.getTaskProvider = getTaskProvider;
    }
    handleGetTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const validatedData = (0, express_validator_1.matchedData)(req);
            try {
                const tasks = yield this.getTaskProvider.findAllTasks(validatedData);
                return tasks;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    handlePostTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const validatedData = (0, express_validator_1.matchedData)(req);
            try {
                const task = yield this.taskService.createTask(validatedData);
                return task;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    handlePatchTasks(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const validatedData = (0, express_validator_1.matchedData)(req);
            try {
                return yield this.updateTaskProvider.updateTask(validatedData);
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
};
exports.TasksController = TasksController;
exports.TasksController = TasksController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(user_controller_1.UserController)),
    __param(1, (0, inversify_1.inject)(tasks_service_1.TaskService)),
    __param(2, (0, inversify_1.inject)(updateTask_provider_1.updateTaskProvider)),
    __param(3, (0, inversify_1.inject)(getTask_provider_1.getTaskProvider)),
    __metadata("design:paramtypes", [user_controller_1.UserController,
        tasks_service_1.TaskService,
        updateTask_provider_1.updateTaskProvider,
        getTask_provider_1.getTaskProvider])
], TasksController);
