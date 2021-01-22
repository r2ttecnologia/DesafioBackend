import { Request, Response } from 'express';

import FileSize from '../config/compressFileConfig';
import UrlUploadsRepository from '../database/mongodb/typeorm/repositories/UrlUploadsRepository';

export default class UploadFileController {
  public async create(request: Request, response: Response): Promise<Response> {
    const fileName = request.file.filename;

    const urlUploadsRepository = new UrlUploadsRepository();
    const fileSize = new FileSize(urlUploadsRepository);

    await fileSize.execute(fileName);

    return response.json({ fileName });
  }
}
