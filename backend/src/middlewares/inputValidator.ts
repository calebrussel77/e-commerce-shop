import { body } from "express-validator";

export const loginInputValidator = () => {
  return [
    body("email")
      .isEmail()
      .normalizeEmail()
      .withMessage("Votre addresse email doit être valide. "),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Votre mot de passe doit contenir au moins 06 caractères."),
  ];
};

export const registerInputValidator = () => {
  return [
    body("name", "Votre nom d'utilisateur est requis ").notEmpty(),
    body("email")
      .isEmail()
      .normalizeEmail()
      .withMessage("Votre addresse email doit être valide. "),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Votre mot de passe doit contenir au moins 06 caractères."),
  ];
};
