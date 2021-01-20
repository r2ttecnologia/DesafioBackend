import { Router, Request, Response } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';
import { fileSize } from '../config/compressFileConfig';

const routes = Router();
const upload = multer(uploadConfig);

routes.post('/files', upload.single('file'), async (request: Request, response: Response) => {
  await fileSize(request.file);

  return response.json(request.file);
});

export default routes;
