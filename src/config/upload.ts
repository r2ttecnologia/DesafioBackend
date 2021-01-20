import { Request, Express } from 'express';
import path from 'path';
import crypto from 'crypto';
import multer, { FileFilterCallback } from 'multer';

const tempFolder = path.resolve(__dirname, '..', '..', 'tmp');
const uploadsFolder = path.resolve(tempFolder, 'uploads');

export default {
  storage: multer.diskStorage({
    destination: tempFolder,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('hex');
      const fileName = `${file.originalname}`;

      return callback(null, fileName);
    },
  }),
}
