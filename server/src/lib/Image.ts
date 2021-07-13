const AWS = require('aws-sdk');
const piexif = require('piexifjs');
const fileType = require('file-type');
import { AWS_SECRET } from '../config/index';
const ApiError = require('../lib/ApiError');

class ImageUpload {
  async upload(image: any, options: object) {
    AWS.config.update({
      accessKeyId: AWS_SECRET.AWS_ACCESS_KEY_ID,
      secretAccessKey: AWS_SECRET.AWS_SECRET_ACCESS_KEY,
    });
    const S3 = new AWS.S3();
    try {
      let fileBuffer: any = Buffer.from(image, 'base64');
      const fileTypeInfo = await fileType.fromBuffer(fileBuffer);
      const type = fileTypeInfo.ext.toLowerCase();
      if (type === 'jpg' || type === 'jpeg') {
        fileBuffer = await this.deleteThumbnailFromExif(fileBuffer);
      }

      const fileName: any = Math.floor(new Date().valueOf() / 1000);
      const filePath = `${fileName}.${fileTypeInfo.ext}`;
      const key = filePath;
      const params = {
        Bucket: AWS_SECRET.S3_BUCKET_NAME,
        Key: key,
        Body: fileBuffer,
        ACL: 'public-read',
        ContentEncoding: 'binary',
        ContentType: fileTypeInfo.mime,
      };
      await S3.putObject(params).promise();

      return `${AWS_SECRET.S3_BUCKET_LINK}/${key}`;
    } catch (err: any) {
      throw new ApiError(err.message);
    }
  }

  deleteThumbnailFromExif(imageBuffer: any) {
    const imageString = imageBuffer.toString('binary');
    const exifObj = piexif.load(imageString);
    delete exifObj.thumbnail;
    delete exifObj['1st'];
    const exifBytes = piexif.dump(exifObj);
    const newImageString = piexif.insert(exifBytes, imageString);
    return Buffer.from(newImageString, 'binary');
  }

  async delete(filePath: string) {
    AWS.config.update({
      accessKeyId: AWS_SECRET.AWS_ACCESS_KEY_ID,
      secretAccessKey: AWS_SECRET.AWS_SECRET_ACCESS_KEY,
    });
    const S3 = new AWS.S3();
    const params = {
      Bucket: AWS_SECRET.S3_BUCKET_NAME,
      Key: filePath,
    };
    await S3.deleteObject(params).promise();
  }
}

module.exports = ImageUpload;
