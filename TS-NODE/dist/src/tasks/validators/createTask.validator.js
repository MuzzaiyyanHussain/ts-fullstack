"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTaskValidator = void 0;
const express_validator_1 = require("express-validator");
exports.createTaskValidator = (0, express_validator_1.checkSchema)({
    title: {
        in: ["body", "query"],
        notEmpty: true,
        errorMessage: "title is required",
        isString: true,
        isLength: {
            options: {
                max: 100,
            },
            errorMessage: "title should be of max 100 chars",
        },
        trim: true,
    },
    description: {
        in: ["body"],
        notEmpty: true,
        isString: true,
        trim: true,
    },
    status: {
        in: ["body"],
        notEmpty: true,
        isIn: {
            options: [["todo", "inProgress", "completed"]],
        },
    },
    priority: {
        in: ["body"],
        notEmpty: true,
        isIn: {
            options: [["high", "low", "normal"]],
        },
    },
    dueDate: {
        in: ["body"],
        notEmpty: true,
        isISO8601: true,
    },
});
