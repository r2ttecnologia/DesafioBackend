import path from 'path';
import sharp from 'sharp';
import uploadConfig from './upload';
import IStorageProvider from '../providers/models/IStorageProvider';
import IUrlUploadsRepository from '../database/repositories/IUrlUploadsRepository';

class FileSize {
  constructor(
    private urlUploadsRepository: IUrlUploadsRepository,

    private storageProvider: IStorageProvider,
  ){}

  public async execute(fileName: string): Promise<string> {
    const tempFolder = path.resolve(__dirname, '..', '..', 'tmp');
    const filePath = path.resolve(tempFolder, `${fileName}`);

    const [fileHashName, extension] = path.basename(filePath).split('.');

    const urlUploas =
      `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${fileName}`;

    const [http, , url] = urlUploas.split('/');
    const newPath = `${http}//${url}/`;

      this.storageProvider.saveFile(fileName)
      this.urlUploadsRepository.create(urlUploas)

    const sizes = [128, 48, 32, 24, 16];

    sizes.forEach(async size => {
      const newFile = `${fileHashName}-${size}.${extension}`;

        await sharp(filePath)
          .clone()
          .resize({ width: size })
          .toFile(`${tempFolder}/${newFile}`)

      await this.urlUploadsRepository
          .create(`${newPath}${newFile}`)

      await this.storageProvider.saveFile(newFile)
    });

    return fileName;
    }
}

export default FileSize;
