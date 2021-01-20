import path from 'path';
import sharp from 'sharp';

export const fileSize = async (fileName: string) => {
  const tempFolder = path.resolve(__dirname, '..', '..', 'tmp');
  const filePath = path.resolve(__dirname, '..', '..', 'tmp', `${fileName}`);

  const [fileHashName, extension] = path.basename(filePath).split('.');

  const destination = `${tempFolder}/uploads`;

  const sizes = [128, 48, 32, 24, 16];

  sizes.forEach(async size => {
    await sharp(filePath)
    .clone()
    .resize({ width: size })
    .toFile(`${destination}/${fileHashName}-${size}.${extension}`)
  })
}
