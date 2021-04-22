"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const services_1 = require("../services");
exports.default = express_async_handler_1.default((req, resp, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        req.userData = null;
        const userService = new services_1.UserService();
        const token = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization.split(" ")[1];
        const decodedToken = jsonwebtoken_1.default.verify(token, String(process.env.JWT_SECRET_KEY));
        req.userData = yield userService.findUserById(decodedToken._id);
        next();
    }
    catch (err) {
        resp.status(401);
        throw new Error("Vous n'êtes pas auhentifié pour avoir accès à cette ressource. ");
    }
}));
//# sourceMappingURL=checkAuth%20copy.js.map