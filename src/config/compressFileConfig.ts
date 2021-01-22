import path from 'path';
import sharp from 'sharp';
import uploadConfig from './upload';
import S3StorageProvider from '../providers/implementations/S3StorageProvider';
import DiskStorageProvider from '../providers/implementations/DiskStorageProvider';
import IUrlUploadsRepository from '../database/repositories/IUrlUploadsRepository';

const s3StorageProvider = new S3StorageProvider();
const diskStorageProvider = new DiskStorageProvider();

class FileSize {
  constructor(
    private urlUploadsRepository: IUrlUploadsRepository,
  ){}

  public async execute(fileName: string): Promise<string> {
    const tempFolder = path.resolve(__dirname, '..', '..', 'tmp');
    const filePath = path.resolve(tempFolder, `${fileName}`);

    const [fileHashName, extension] = path.basename(filePath).split('.');

    const urlUploas =
      `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${fileName}`;

    uploadConfig.driver === 's3' ?
      s3StorageProvider.saveFile(fileName) &&
      this.urlUploadsRepository.create(urlUploas)
      : diskStorageProvider;

    const sizes = [128, 48, 32, 24, 16];

    sizes.forEach(async size => {
      const newFile = `${fileHashName}-${size}.${extension}`;

        await sharp(filePath)
          .clone()
          .resize({ width: size })
          .toFile(`${tempFolder}/${newFile}`)

      uploadConfig.driver === 's3' ?
        await this.urlUploadsRepository
          .create(`https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${newFile}`)
         && await s3StorageProvider.saveFile(newFile)
          : await diskStorageProvider.saveFile(newFile);
    });

    return fileName;
    }
}

export default FileSize;
