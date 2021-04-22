"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = exports.get404 = void 0;
const get404 = (err, _req, resp, _next) => {
    resp
        .status(404)
        .json({ pageTitle: "Page Not Found", status: "404", message: err.message });
};
exports.get404 = get404;
const handleError = (err, _req, resp, _next) => {
    const statusCode = resp.statusCode === 200 ? 500 : resp.statusCode;
    resp.status(statusCode);
    resp.json({
        stack: process.env.NODE_ENV === "production" ? null : err.stack,
        message: err.message,
    });
};
exports.handleError = handleError;
//# sourceMappingURL=error.js.map