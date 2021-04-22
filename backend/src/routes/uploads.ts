import { Router } from "express";
import multer from "multer";
import path from "path";

const router = Router();

const checkFileType = (
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const fileTypes = /jpg|jpeg|png/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error("Seuls les images sont authorisées."));
  }
};

const storage = multer.diskStorage({
  destination(_req, _file, cb) {
    cb(null, "uploads/images");
  },
  filename(_req, file, cb) {
    cb(
      null,
      `/${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage,
  fileFilter: function (_req, file, cb) {
    checkFileType(file, cb);
  },
});

router.post("/", upload.single("image"), (req, resp) => {
  const splittedPath = req?.file?.path.split("\\");

  const imagePath = `/${splittedPath[0]}/${splittedPath[1]}/${splittedPath[2]}`;

  resp.send(imagePath);
});

export default router;
