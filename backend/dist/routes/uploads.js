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
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const cloudinary_config_1 = require("../utils/cloudinary-config");
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
        cb(null, `${file.fieldname}-${Date.now()}${path_1.default.extname(file.originalname)}`);
    },
});
const upload = multer_1.default({
    storage,
    fileFilter: function (_req, file, cb) {
        checkFileType(file, cb);
    },
});
router.post("/", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body.image);
    const urls = [];
    const files = req.body.image;
    for (const file of files) {
        const newPath = yield cloudinary_config_1.cloudinaryUpload(file);
        console.log({ newPath });
        urls.push(newPath);
        // fs.unlinkSync(file.path);
    }
    console.log({ urls });
    resp.send(urls);
}));
exports.default = router;
//# sourceMappingURL=uploads.js.map