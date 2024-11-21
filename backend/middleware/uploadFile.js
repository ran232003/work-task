const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/files");
  },
  filename: (req, file, cb) => {
    //taking only the file extension and put random uuid.
    //that way we can upload the same pic
    cb(null, Date.now() + "." + file.originalname);
  },
});

const upload = multer({ storage: storage });
module.exports = upload;
