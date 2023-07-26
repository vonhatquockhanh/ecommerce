import { uploadService } from '../services/upload.service';
import express from 'express';

const router = express.Router();

router.post('/ckeditor/upload', async (_, res) => {
  const result = await uploadService(_.files.file);
  return res.json(result.urls);
});
router.get('/ckeditor/token', async (_, res) => {
  return res.json(_.cookies['payload-token']);
});

export default router;
