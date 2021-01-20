import { Request, Response } from 'express';

import { fileSize } from '../config/compressFileConfig';

export default class UploadFileController {
  public async create(request: Request, response: Response): Promise<Response> {
    const fileName = request.file.filename;

    await fileSize(fileName);


    return response.json({ fileName });
  }
}
