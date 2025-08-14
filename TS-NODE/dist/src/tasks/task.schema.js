"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const mongoose_1 = require("mongoose");
const TaskSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, "Task title is required"],
        maxLength: [100, "Title cannot be more than 100 characters"],
        trim: true,
    },
    description: {
        type: String,
        required: true,
        maxlength: 500,
        trim: true,
    },
    status: {
        type: String,
        required: true,
        enum: ["todo", "inProgress", "completed"],
        default: "todo",
    },
    priority: {
        type: String,
        required: true,
        enum: ["low", "normal", "high"],
        default: "normal",
    },
    dueDate: {
        type: Date,
        required: true,
    },
}, {
    timestamps: true,
});
exports.Task = (0, mongoose_1.model)("Task", TaskSchema);
