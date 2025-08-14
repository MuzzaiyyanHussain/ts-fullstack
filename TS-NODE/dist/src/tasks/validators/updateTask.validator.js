"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTaskValidator = void 0;
const express_validator_1 = require("express-validator");
exports.updateTaskValidator = (0, express_validator_1.checkSchema)({
    _id: {
        in: ["body"],
        notEmpty: true,
        isMongoId: true,
        errorMessage: "Valid document id is required",
    },
    title: {
        in: ["body", "query"],
        optional: true,
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
        optional: true,
        isString: true,
        trim: true,
    },
    status: {
        in: ["body"],
        optional: true,
        isIn: {
            options: [["todo", "inProgress", "completed"]],
        },
    },
    priority: {
        in: ["body"],
        optional: true,
        isIn: {
            options: [["high", "low", "normal"]],
        },
    },
    dueDate: {
        in: ["body"],
        optional: true,
        isISO8601: true,
    },
});
