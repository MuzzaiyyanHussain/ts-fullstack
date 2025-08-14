"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseFormatter = responseFormatter;
const http_status_codes_1 = require("http-status-codes");
function responseFormatter(req, res, next) {
    // Store the original res.json function to a variable
    const originalJson = res.json.bind(res);
    // Override the res.json method
    res.json = (data) => {
        // Ensure it returns Response
        // Check if the status code has been set, use 200 OK if not set
        const statusCode = res.statusCode ? res.statusCode : http_status_codes_1.StatusCodes.OK;
        // Construct the standardized response structure
        const response = {
            status: statusCode >= 200 && statusCode < 300 ? "success" : "error",
            statusCode: statusCode,
            message: (0, http_status_codes_1.getReasonPhrase)(res.statusCode),
        };
        if (statusCode >= 200 && statusCode < 300) {
            response.data = data.meta ? data.data : data;
        }
        if (statusCode >= 300) {
            response.error = data;
        }
        if (data.meta) {
            response.meta = data.meta;
        }
        // Call the original res.json function with the new response structure
        return originalJson(response);
    };
    next();
}
