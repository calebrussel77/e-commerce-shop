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
exports.UserController = void 0;
const response_1 = require("../utils/response");
const express_validator_1 = require("express-validator");
const bcrypt_1 = __importDefault(require("bcrypt"));
const cloudinary_config_1 = require("../utils/cloudinary-config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserController {
    /**
     * @description Creates an instance of product controller.
     * @author Caleb Russel
     * @constructor
     * @param {UserService} userService
     */
    constructor(userService) {
        /**
         * POST login credentials
         * @post
         * @async
         * @public
         */
        this.signInUser = (req, resp) => __awaiter(this, void 0, void 0, function* () {
            const errors = express_validator_1.validationResult(req);
            const signInCredentials = {
                email: req.body.email,
                password: req.body.password,
            };
            if (!errors.isEmpty()) {
                const firstError = errors.array().map((error) => error.msg)[0];
                resp.status(401);
                throw new Error(firstError);
            }
            const userFound = yield this.userService.findUserByEmail(signInCredentials.email);
            if (!userFound) {
                resp.status(400);
                throw new Error("identifiants incorrect.");
            }
            else {
                const match = yield bcrypt_1.default.compare(signInCredentials.password, String(userFound === null || userFound === void 0 ? void 0 : userFound.password));
                if (!match) {
                    resp.status(400);
                    throw new Error("email et/ou mot de passe incorrecte(s)");
                }
                else {
                    const payload = {
                        _id: userFound._id,
                        isAdmin: userFound.isAdmin,
                    };
                    const token = yield jsonwebtoken_1.default.sign(payload, String(process.env.JWT_SECRET_KEY), { expiresIn: "30d" });
                    return response_1.apiResponse(resp, response_1.successResponse({
                        msg: `Ravie de vous revoir ${userFound.name}.`,
                        userLoggedIn: {
                            _id: userFound._id,
                            isAdmin: userFound.isAdmin,
                            image: userFound.image,
                            email: userFound.email,
                            name: userFound.name,
                            website: userFound.website,
                            state: userFound.state,
                            city: userFound.city,
                            zipCode: userFound.zipCode,
                            token: token,
                        },
                        success: true,
                    }), 200);
                }
            }
        });
        /**
         * POST register credentials
         * @post
         * @async
         * @public
         */
        this.registerUser = (req, resp) => __awaiter(this, void 0, void 0, function* () {
            const errors = express_validator_1.validationResult(req);
            const registerCredentials = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            };
            if (!errors.isEmpty()) {
                const firstError = errors.array().map((error) => error.msg)[0];
                resp.status(422);
                throw new Error(firstError);
            }
            const userFound = yield this.userService.findUserByEmail(registerCredentials.email);
            if (userFound) {
                resp.status(400);
                throw new Error("Cet utilisateur existe déjà.");
            }
            else {
                const newPassword = yield bcrypt_1.default.hash(registerCredentials.password, 10);
                const userCreated = yield this.userService.createNewUser({
                    name: registerCredentials.name,
                    email: registerCredentials.email,
                    password: newPassword,
                });
                if (userCreated) {
                    const payload = {
                        _id: userCreated._id,
                        isAdmin: userCreated.isAdmin,
                    };
                    const token = yield jsonwebtoken_1.default.sign(payload, String(process.env.JWT_SECRET_KEY), { expiresIn: "30d" });
                    return response_1.apiResponse(resp, response_1.successResponse({
                        msg: `Bienvenue ${userCreated.name}.`,
                        userRegistered: {
                            _id: userCreated._id,
                            isAdmin: userCreated.isAdmin,
                            image: userCreated.image,
                            email: userCreated.email,
                            name: userCreated.name,
                            website: userCreated.website,
                            state: userCreated.state,
                            city: userCreated.city,
                            zipCode: userCreated.zipCode,
                            token: token,
                        },
                        success: true,
                    }), 200);
                }
                else {
                    resp.status(400);
                    throw new Error("Données de l'utilisateur invalide.");
                }
            }
        });
        /**
         * GET all users
         * @get
         * @async
         * @private/Admin
         */
        this.getAllUsers = (_req, resp) => __awaiter(this, void 0, void 0, function* () {
            const users = yield this.userService.findAllUsers();
            return response_1.apiResponse(resp, response_1.successResponse({
                msg: "Tous les utilisateurs",
                userList: users,
                success: true,
            }), 200);
        });
        /**
         * GET user data by id
         * @get
         * @async
         * @private/Admin
         */
        this.getUserById = (req, resp) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const user = yield this.userService.findUserById((_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id);
            if (user) {
                return response_1.apiResponse(resp, response_1.successResponse({
                    user: user,
                    success: true,
                }), 200);
            }
            else {
                resp.status(404);
                throw new Error("Utilisateur non trouvé.");
            }
        });
        /**
         * UPDATE single user infos
         * @put
         * @async
         * @private/admin
         */
        this.updateUser = (req, resp) => __awaiter(this, void 0, void 0, function* () {
            var _b, _c;
            const userInfo = yield this.userService.findUserById((_b = req === null || req === void 0 ? void 0 : req.params) === null || _b === void 0 ? void 0 : _b.id);
            const fileStr = (_c = req.body) === null || _c === void 0 ? void 0 : _c.image;
            if (userInfo) {
                if (fileStr) {
                    const newImg = yield cloudinary_config_1.cloudinaryUpload(fileStr);
                    userInfo.image = (newImg === null || newImg === void 0 ? void 0 : newImg.secure_url) || userInfo.image;
                }
                userInfo.name = req.body.name || userInfo.name;
                userInfo.email = req.body.email || userInfo.email;
                userInfo.isAdmin = req.body.isAdmin;
                yield userInfo.save();
                return response_1.apiResponse(resp, response_1.successResponse({
                    msg: "Informations de l'utilisateur mis à jour.",
                    success: true,
                }), 200);
            }
            else {
                resp.status(404);
                throw new Error("Utilisateur non trouvé.");
            }
        });
        /**
         * DELETE user
         * @delete
         * @async
         * @private/Admin
         */
        this.deleteUserById = (req, resp) => __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.userId;
            const response = yield this.userService.deleteUserById(userId);
            if (response) {
                return response_1.apiResponse(resp, response_1.successResponse({
                    msg: "L'utilisateur a bien été supprimé.",
                    success: true,
                }), 200);
            }
            else {
                return;
            }
        });
        /**
         * GET user profile infos
         * @get
         * @async
         * @private
         */
        this.getUserProfile = (req, resp) => __awaiter(this, void 0, void 0, function* () {
            var _d;
            const userInfo = yield this.userService.findUserById((_d = req === null || req === void 0 ? void 0 : req.userData) === null || _d === void 0 ? void 0 : _d._id);
            if (userInfo) {
                return response_1.apiResponse(resp, response_1.successResponse({
                    msg: "Information de l'utilisateur",
                    userProfile: userInfo,
                    success: true,
                }), 200);
            }
            else {
                resp.status(404);
                throw new Error("Utilisateur non trouvé.");
            }
        });
        /**
         * UPDATE user profile infos
         * @put
         * @async
         * @private
         */
        this.updateUserProfileInfo = (req, resp) => __awaiter(this, void 0, void 0, function* () {
            var _e;
            const userInfo = yield this.userService.findUserById((_e = req === null || req === void 0 ? void 0 : req.userData) === null || _e === void 0 ? void 0 : _e._id);
            if (userInfo) {
                userInfo.name = req.body.name || userInfo.name;
                userInfo.email = req.body.email || userInfo.email;
                userInfo.city = req.body.city || userInfo.city;
                userInfo.state = req.body.state || userInfo.state;
                userInfo.zipCode = req.body.zipCode || userInfo.zipCode;
                userInfo.website = req.body.website || userInfo.website;
                userInfo.image = req.body.image || userInfo.image;
                if (req.body.password) {
                    const newPassword = yield bcrypt_1.default.hash(req.body.password, 10);
                    userInfo.password = newPassword;
                }
                const updatedProfile = yield userInfo.save();
                return response_1.apiResponse(resp, response_1.successResponse({
                    msg: "Vos informations ont bien été mis à jour.",
                    updatedProfile: {
                        _id: updatedProfile._id,
                        image: updatedProfile.image,
                        email: updatedProfile.email,
                        name: updatedProfile.name,
                        website: updatedProfile.website,
                        state: updatedProfile.state,
                        city: updatedProfile.city,
                        zipCode: updatedProfile.zipCode,
                    },
                    success: true,
                }), 200);
            }
            else {
                resp.status(404);
                throw new Error("Utilisateur non trouvé.");
            }
        });
        this.userService = userService;
        this.signInUser = this.signInUser.bind(this);
        this.registerUser = this.registerUser.bind(this);
        this.getAllUsers = this.getAllUsers.bind(this);
        this.getUserProfile = this.getUserProfile.bind(this);
        this.getUserById = this.getUserById.bind(this);
        this.updateUserProfileInfo = this.updateUserProfileInfo.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.deleteUserById = this.deleteUserById.bind(this);
    }
}
exports.UserController = UserController;
//# sourceMappingURL=userController.js.map