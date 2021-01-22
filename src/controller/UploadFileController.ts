import { Request, Response } from 'express';

import FileSize from '../config/compressFileConfig';
import S3StorageProvider from '../providers/implementations/S3StorageProvider';
import DiskStorageProvider from '../providers/implementations/DiskStorageProvider';
import UrlUploadsRepository from '../database/mongodb/typeorm/repositories/UrlUploadsRepository';
import uploadConfig from '../config/upload';


const s3StorageProvider = new S3StorageProvider();
const diskStorageProvider = new DiskStorageProvider();

export default class UploadFileController {
  public async create(request: Request, response: Response): Promise<Response> {
    const fileName = request.file.filename;

    const urlUploadsRepository = new UrlUploadsRepository();
    const storageProvider =
      uploadConfig.driver === 's3' ? s3StorageProvider : diskStorageProvider;

    const fileSize = new FileSize(urlUploadsRepository, storageProvider);

    await fileSize.execute(fileName);

    return response.json({ fileName });
  }
}
