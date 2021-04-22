"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const services_1 = require("../services");
const userController = new controllers_1.UserController(new services_1.UserService());
const router = express_1.Router();
router.post("/", userController.addUser);
router.get("/", userController.getUsers);
// router.post("/", filiateController.addFiliate);
// router.get("/edit/:id", filiateController.getEditFiliate);
// router.put("/:id", filiateController.updateFiliate);
// router.delete("/:id", filiateController.removeFiliate);
exports.default = router;
//# sourceMappingURL=user.js.map