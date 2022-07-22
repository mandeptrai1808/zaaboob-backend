//upload file
const mkdirp = require("mkdirp");
const multer = require("multer");

const uploadImg = (type) => {
  // set up cho luu file va ten file mac dinh
  const made = mkdirp.sync(`./Public/Images/${type}`);
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `./Public/Images/${type}`);
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "_" + file.originalname);
    },
  });

  const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
      console.log({ reqUP: req.body });
      const extensionImg = [".png", ".jpg", "jfif", "jpeg"];
      const extension = file.originalname.slice(-4);
      const check = extensionImg.includes(extension);
      if (check) {
        cb(null, true);
      } else {
        cb(new Error("File not available!"));
      }
    },
  });

  return upload.single(type);
};



module.exports = { uploadImg };
