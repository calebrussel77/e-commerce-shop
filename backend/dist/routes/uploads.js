"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const router = express_1.Router();
const checkFileType = (file, cb) => {
    const fileTypes = /jpg|jpeg|png/;
    const extname = fileTypes.test(path_1.default.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);
    if (extname && mimetype) {
        return cb(null, true);
    }
    else {
        cb(new Error("Seuls les images sont authorisées."));
    }
};
const storage = multer_1.default.diskStorage({
    destination(_req, _file, cb) {
        cb(null, "uploads/images");
    },
    filename(_req, file, cb) {
        cb(null, `/${file.fieldname}-${Date.now()}${path_1.default.extname(file.originalname)}`);
    },
});
const upload = multer_1.default({
    storage,
    fileFilter: function (_req, file, cb) {
        checkFileType(file, cb);
    },
});
router.post("/", upload.single("image"), (req, resp) => {
    var _a;
    const splittedPath = (_a = req === null || req === void 0 ? void 0 : req.file) === null || _a === void 0 ? void 0 : _a.path.split("\\");
    const imagePath = `/${splittedPath[0]}/${splittedPath[1]}/${splittedPath[2]}`;
    resp.send(imagePath);
});
exports.default = router;
//# sourceMappingURL=uploads.js.map