import { Router, Request, Response } from 'express';
import multer from 'multer';

import UploadFileController from '../controller/UploadFileController';

import uploadConfig from '../config/upload';

const routes = Router();
const upload = multer(uploadConfig.multer);
const uploadFileController = new UploadFileController();

routes.post('/files', upload.single('file'), uploadFileController.create)

export default routes;
