const multer = require("multer");
const path = require("path");
const multerOptions = {
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "Uploads");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  }),
  fileFilter: function (req, file, next) {
    //can also set limit in multer
    const isPhoto = file.mimetype.match(/\.(jpg|jpeg|png)$/);
    if (isPhoto) {
      next(null, true); //callback function, first value is error, second value gets passed on if no error
    } else
      ({
        message: "That filetype is not allowed",
      }),
        false;
  },
};
exports.upload = multer(multerOptions).single("image");