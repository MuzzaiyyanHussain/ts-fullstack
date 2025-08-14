"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTasksValidator = void 0;
const express_validator_1 = require("express-validator");
exports.getTasksValidator = (0, express_validator_1.checkSchema)({
    limit: {
        in: ["query"],
        optional: true,
        isInt: {
            options: {
                min: 1,
            },
        },
        toInt: true,
    },
    page: {
        in: ["query"],
        optional: true,
        isInt: {
            options: {
                min: 1,
            },
        },
        toInt: true,
    },
    order: {
        in: ["query"],
        optional: true,
        isIn: {
            options: [["asc", "dsc"]],
        },
    },
});
