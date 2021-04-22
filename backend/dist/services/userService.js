"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_1 = __importDefault(require("../models/user"));
/**
 * UserService class handles the logic needed to work with the user data.
 * @class
 * @public
 * @author Caleb russel
 */
class UserService {
    /**
     * Creates an instance of user service.
     * @author Caleb russel
     */
    constructor() {
        this.findUserByEmail = this.findUserByEmail.bind(this);
        this.findUserById = this.findUserById.bind(this);
        this.createNewUser = this.createNewUser.bind(this);
        this.findAllUsers = this.findAllUsers.bind(this);
        this.deleteUserById = this.deleteUserById.bind(this);
    }
    findUserByEmail(email) {
        return user_1.default.findOne({ email }).then((result) => result);
    }
    findAllUsers() {
        return user_1.default.find().then((result) => result);
    }
    deleteUserById(userId) {
        return user_1.default.findByIdAndRemove(userId).then((result) => result);
    }
    findUserById(id) {
        return user_1.default.findById(id)
            .select("-password")
            .then((result) => result);
    }
    createNewUser(user) {
        const userCreated = new user_1.default(user);
        return userCreated.save().then((result) => result);
    }
}
exports.UserService = UserService;
//# sourceMappingURL=userService.js.map