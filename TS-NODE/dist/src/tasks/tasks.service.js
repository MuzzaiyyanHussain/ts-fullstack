"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
exports.TaskService = void 0;
const inversify_1 = require("inversify");
const task_schema_1 = require("./task.schema");
let TaskService = class TaskService {
    constructor() {
        this.taskModel = task_schema_1.Task;
    }
    createTask(taskData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new this.taskModel(taskData).save();
        });
    }
    findById(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.taskModel.findById(_id);
        });
    }
    findActive(pagination) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.taskModel
                .find({ status: { $in: ["todo", "inProgress"] } })
                .limit(pagination.limit)
                .skip(pagination.page - 1)
                .sort({ createdAt: pagination.order === "asc" ? 1 : -1 });
        });
    }
    findAll(pagination) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.taskModel
                .find()
                .limit(pagination.limit)
                .skip(pagination.page - 1)
                .sort({ createdAt: pagination.order === "asc" ? 1 : -1 });
        });
    }
    countDocuments(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.taskModel.countDocuments(filter);
        });
    }
};
exports.TaskService = TaskService;
exports.TaskService = TaskService = __decorate([
    (0, inversify_1.injectable)()
], TaskService);
