"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
// import { IUser } from "../models/user";
const users = [
    {
        name: "Caleb Russel",
        email: "admin@test.fr",
        password: bcrypt_1.default.hashSync("123456", 10),
        isAdmin: true,
    },
    {
        name: "John Doe",
        email: "john@test.fr",
        city: "Freemont street",
        state: "Californie",
        zipCode: "2345 Las vegas",
        website: "johndoe.com",
        password: bcrypt_1.default.hashSync("123456", 10),
    },
    {
        name: "Jane Doe",
        email: "jane@test.fr",
        city: "Freemont street",
        state: "Californie",
        zipCode: "2345 Las vegas",
        website: "janedoe.com",
        password: bcrypt_1.default.hashSync("123456", 10),
    },
];
exports.default = users;
//# sourceMappingURL=users.data.js.map