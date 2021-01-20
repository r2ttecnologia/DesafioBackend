import aws, { S3 } from 'aws-sdk';
import path from 'path';
import fs from 'fs';
import mime from 'mime';

import IStorageProvider from '../models/IStorageProvider';
import uploadConfig from '../../config/upload';

class S3StorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new aws.S3({
      region: 'us-east-1',
    });
  }

  public async saveFile(file: string): Promise<string> {
    const uploadPath = path.resolve(uploadConfig.tmpFolder, file);

    const contentType = mime.getType(uploadPath);

    if (!contentType) {
      throw new Error('File not found');
    }

    const fileContent = await fs.promises.readFile(uploadPath);

    await this.client
      .putObject({
        Bucket: uploadConfig.config.aws.bucket,
        Key: file,
        ContentType: contentType,
        ACL: 'public-read',
        Body: fileContent,
        ContentDisposition: `inline; filename-${file}`,
      }).promise();

    await fs.promises.unlink(uploadPath);

    return file;
  }
}

export default S3StorageProvider;
