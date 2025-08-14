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
exports.TasksRouter = exports.tasksRouter = void 0;
const express_1 = require("express");
const task_controller_1 = require("./task.controller");
const createTask_validator_1 = require("./validators/createTask.validator");
const inversify_1 = require("inversify");
const express_validator_1 = require("express-validator");
const getTasks_validator_1 = require("./validators/getTasks.validator");
const http_status_codes_1 = require("http-status-codes");
const updateTask_validator_1 = require("./validators/updateTask.validator");
exports.tasksRouter = (0, express_1.Router)();
let TasksRouter = class TasksRouter {
    constructor(taskController) {
        this.taskController = taskController;
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get("/", getTasks_validator_1.getTasksValidator, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = (0, express_validator_1.validationResult)(req);
            if (result.isEmpty()) {
                const allTasks = yield this.taskController.handleGetTask(req, res);
                res.status(http_status_codes_1.StatusCodes.OK).json(allTasks);
            }
            else {
                res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(result.array());
            }
        }));
        this.router.post("/create", createTask_validator_1.createTaskValidator, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = (0, express_validator_1.validationResult)(req);
            if (result.isEmpty()) {
                const newTask = yield this.taskController.handlePostTask(req, res);
                res.locals.meta = { count: 1 };
                res.status(http_status_codes_1.StatusCodes.CREATED).json(newTask);
            }
            else {
                res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(result.array());
            }
        }));
        this.router.patch("/update", updateTask_validator_1.updateTaskValidator, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = (0, express_validator_1.validationResult)(updateTask_validator_1.updateTaskValidator);
            if (result.isEmpty()) {
                const updatedTask = yield this.taskController.handlePatchTasks(req, res);
                res.status(http_status_codes_1.StatusCodes.OK).json(updatedTask);
            }
            else {
                res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(result.array());
            }
        }));
    }
};
exports.TasksRouter = TasksRouter;
exports.TasksRouter = TasksRouter = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(task_controller_1.TasksController)),
    __metadata("design:paramtypes", [task_controller_1.TasksController])
], TasksRouter);
