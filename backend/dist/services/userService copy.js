"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
// import Bluebird from "bluebird";
// import { FiliateModel } from "../models/filiate";
const user_1 = __importDefault(require("../models/user"));
// import { FiliateType } from "../types/types";
/**
 * UserService class handles the logic needed to work with the filiate data.
 * @class
 * @public
 * @author Caleb russel
 */
class UserService {
    /**
     * @description Db of user service
     * @type {DB}
     */
    // private db: DB;
    /**
     * Creates an instance of user service.
     * @author Caleb russel
     * @param {dbObject} db
     */
    constructor() {
        // this.db = dbObject;
        this.addUser = this.addUser.bind(this);
        this.getUsers = this.getUsers.bind(this);
        // this.addFiliate = this.addFiliate.bind(this);
        // this.getEditFiliate = this.getEditFiliate.bind(this);
        // this.updateFiliate = this.updateFiliate.bind(this);
        // this.removeFiliate = this.removeFiliate.bind(this);
    }
    /**
     * get all filiates
     * @public
     * @method {getAllFiliate}
     * @author Caleb russel
     * @returns {Promise<FiliateModel[]>} filiates array
     */
    addUser(user) {
        let newUser = new user_1.default(user);
        return newUser.save();
    }
    /**
     * get all filiates
     * @public
     * @method {getAllFiliate}
     * @author Caleb russel
     * @returns {Promise<FiliateModel[]>} filiates array
     */
    getUsers() {
        return user_1.default.find().then((result) => result);
    }
}
exports.UserService = UserService;
//# sourceMappingURL=userService%20copy.js.map