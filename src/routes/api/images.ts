import express, { Request, Response } from 'express';
import path from 'path';
import { promises as fs } from 'fs';
import resizeImage from '../../utilities/imageProcessor';

const images = express.Router();

images.get('/', async (req: Request, res: Response): Promise<void> => {
  const filename = req.query.filename as string;
  const width = parseInt(req.query.width as string);
  const height = parseInt(req.query.height as string);

  if (!filename || isNaN(width) || isNaN(height) || width <= 0 || height <= 0) {
    res.status(400).send('Please provide a valid filename, width, and height.');
    return;
  }

  const fullPath = path.resolve(__dirname, `../../../assets/full/${filename}.jpg`);
  const thumbPath = path.resolve(__dirname, `../../../assets/thumb/${filename}-${width}x${height}.jpg`);

  try {
    await fs.access(fullPath);

    try {
      await fs.access(thumbPath);
      console.log('Serving from cache...');
      res.sendFile(thumbPath);
    } catch {
      console.log('Resizing new image...');
      const result = await resizeImage(filename, width, height);
      if (result) {
        res.sendFile(result);
      } else {
        res.status(500).send('Error occurred during image processing.');
      }
    }
  } catch {
    res.status(404).send('Original image not found.');
  }
});

export default images;