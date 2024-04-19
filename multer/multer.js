const multer = require("multer")

const storage = multer.diskStorage({

  

    destination: function (req, file, cb) { 
      console.log("j bayeni ")
      return cb(null, './public')
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}_${file.originalname}`)
    }
  });

  function fileFilter(req, file, cb) {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/webp") {
      cb(null, true);
    } else {
      //prevent to upload
      cb({ message: "Unsupported File Format" }, false);
    }
  }
  
  const upload = multer({ storage: storage, fileFilter: fileFilter });
  module.exports = upload;  