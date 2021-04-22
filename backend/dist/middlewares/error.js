"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = exports.get404 = void 0;
const get404 = (req, resp, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    resp.status(404);
    next(error);
    console.log(error);
};
exports.get404 = get404;
const handleError = (err, _req, resp, _next) => {
    const statusCode = resp.statusCode === 200 ? 500 : resp.statusCode;
    resp.status(statusCode);
    resp.json({
        message: err.message,
        success: false,
        stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
};
exports.handleError = handleError;
//# sourceMappingURL=error.js.map