"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerInputValidator = exports.loginInputValidator = void 0;
const express_validator_1 = require("express-validator");
const loginInputValidator = () => {
    return [
        express_validator_1.body("email")
            .isEmail()
            .normalizeEmail()
            .withMessage("Votre addresse email doit être valide. "),
        express_validator_1.body("password")
            .isLength({ min: 6 })
            .withMessage("Votre mot de passe doit contenir au moins 06 caractères."),
    ];
};
exports.loginInputValidator = loginInputValidator;
const registerInputValidator = () => {
    return [
        express_validator_1.body("name", "Votre nom d'utilisateur est requis ").notEmpty(),
        express_validator_1.body("email")
            .isEmail()
            .normalizeEmail()
            .withMessage("Votre addresse email doit être valide. "),
        express_validator_1.body("password")
            .isLength({ min: 6 })
            .withMessage("Votre mot de passe doit contenir au moins 06 caractères."),
    ];
};
exports.registerInputValidator = registerInputValidator;
//# sourceMappingURL=inputValidator.js.map