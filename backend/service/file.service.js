import AWS from "aws-sdk";
import dotenv from "dotenv";

dotenv.config();

AWS.config.update({
  accessKeyId: process.env.ACESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});
const s3 = new AWS.S3();

export class FileService {
  static delete = async (req) => {
    console.log(req.params);
    const res = s3.deleteObject(
      {
        Bucket: process.env.BUCKET,
        Key: req.params.key,
      },
      function (err, data) {
        if (err) {
          err.message = "S3 Object delete fail";
          err.status = 400;
          throw err;
        } else return data;
      }
    );
  };
}
