import path from 'path';
import sharp from 'sharp';
import uploadConfig from './upload';
import S3StorageProvider from '../providers/implementations/S3StorageProvider';

const s3StorageProvider = new S3StorageProvider();

export const fileSize = async (fileName: string) => {
  const tempFolder = path.resolve(__dirname, '..', '..', 'tmp');
  const filePath = path.resolve(tempFolder, `${fileName}`);

  const [fileHashName, extension] = path.basename(filePath).split('.');

  uploadConfig.driver === 's3' ? s3StorageProvider.saveFile(fileName) : 'Erro no upload';

  const sizes = [128, 48, 32, 24, 16];

  sizes.forEach(async size => {
    await sharp(filePath)
      .clone()
      .resize({ width: size })
      .toFile(`${tempFolder}/${fileHashName}-${size}.${extension}`)
    uploadConfig.driver === 's3' ? await s3StorageProvider.saveFile(`${fileHashName}-${size}.${extension}`) : 'Não fez o upload';
  });

}
