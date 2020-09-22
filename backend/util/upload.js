import multer from "multer";
import multerS3 from "multer-s3";
import AWS from "aws-sdk";

const s3 = new AWS.S3();

exports.upload = multer({
  storage: multerS3({
    s3,
    bucket: "spectrum-file",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: "public-read",
    key: (req, file, cb) => {
      cb(null, Date.now().toString() + file.originalname);
    },
  }),
  limits: { fileSize: 10 * 1024 * 1024 },
});
