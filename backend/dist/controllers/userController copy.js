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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const response_1 = require("../utils/response");
class UserController {
    /**
     * @description Creates an instance of filiate controller.
     * @author Caleb Russel
     * @constructor
     * @param {FiliateService} filiateService
     */
    constructor(userService) {
        this.userService = userService;
        this.addUser = this.addUser.bind(this);
        this.getUsers = this.getUsers.bind(this);
    }
    /**
     * Gets all the filiate stored at the db
     * @post
     * @async
     * @public
     */
    addUser(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.body;
                console.log(user);
                const data = yield this.userService.addUser(user);
                return response_1.apiResponse(resp, response_1.successResponse("liste des filiales", data), 200);
            }
            catch (error) {
                console.log(error);
                return response_1.apiResponse(resp, response_1.failedResponse("Une erreur s'est produite, veuillez réessayer plus tard !"), 500);
            }
        });
    }
    /**
     * Gets all the filiate stored at the db
     * @get
     * @async
     * @public
     */
    getUsers(_req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.userService.getUsers();
                return response_1.apiResponse(resp, response_1.successResponse("liste des users", { products: data }), 200);
            }
            catch (error) {
                console.log(error);
                return response_1.apiResponse(resp, response_1.failedResponse("Une erreur s'est produite, veuillez réessayer plus tard !"), 500);
            }
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=userController%20copy.js.map