import { Express } from 'express';
import crypto from 'crypto';
import path from 'path';
import sharp from 'sharp';

const sizes = [128, 48, 32, 24, 16];

export const fileSize = async (file: Express.Multer.File) => {
  const tempFolder = path.resolve(__dirname, '..', '..', 'tmp');
  const filePath = path.resolve(__dirname, '..', '..', 'tmp', `${file.originalname}`);

  const [fileOriginalName, extension] = path.basename(filePath).split('.');
  const fileHash = crypto.randomBytes(10).toString('hex');

  const fileHashName = `${fileHash}-${fileOriginalName}`;

  const destination = `${tempFolder}/uploads`;

  const sizes = [128, 48, 32, 24, 16];

  sizes.forEach(async size => {
    await sharp(filePath)
    .clone()
    .resize({ width: size })
    .toFile(`${destination}/${fileHashName}-${size}.${extension}`)
    .then(info => {
      console.log(info)
    }).catch(err => console.log(err))
  })
}
