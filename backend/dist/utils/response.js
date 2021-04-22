"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiResponse = exports.successResponse = void 0;
const successResponse = (respData) => {
    return respData;
};
exports.successResponse = successResponse;
const apiResponse = (resp, data, statusCode) => {
    return resp.status(statusCode).json(data);
};
exports.apiResponse = apiResponse;
//# sourceMappingURL=response.js.map