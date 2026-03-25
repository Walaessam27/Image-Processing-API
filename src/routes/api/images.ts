import express, { Request, Response } from 'express';
import path from 'path';
import { promises as fs } from 'fs';
import resizeImage from '../../utilities/imageProcessor';

const images = express.Router();

images.get('/', async (req: Request, res: Response): Promise<void> => {
  const filename = req.query.filename as string;
  const widthStr = req.query.width as string;
  const heightStr = req.query.height as string;

  if (!filename || !widthStr || !heightStr) {
    res.status(400).send('Error: Missing required parameters (filename, width, height).');
    return;
  }


  const isNumeric = (val: string) => /^\d+$/.test(val) && parseInt(val) > 0;

  if (!isNumeric(widthStr) || !isNumeric(heightStr)) {
    res.status(400).send('Error: Width and height must be positive integers (numbers greater than 0).');
    return;
  }

  const width = parseInt(widthStr);
  const height = parseInt(heightStr);

  const actualFullPath = path.resolve(__dirname, `../../../assets/full/${filename}.jpg`);
  const thumbPath = path.resolve(__dirname, `../../../assets/thumb/${filename}-${width}x${height}.jpg`);

  try {
    await fs.access(actualFullPath);

    try {
      await fs.access(thumbPath);
      res.status(200).sendFile(thumbPath);
    } catch {
      const result = await resizeImage(filename, width, height);
      if (result) {
        res.status(200).sendFile(result);
      } else {
        res.status(500).send('Error: Image processing failed.');
      }
    }
  } catch {
    res.status(404).send('Error: Original image file not found. Please check the filename.');
  }
});

export default images;