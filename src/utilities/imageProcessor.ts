import sharp from 'sharp';
import path from 'path';
import { promises as fs } from 'fs';

const fullPath = path.resolve(__dirname, '../../assets/full');
const thumbPath = path.resolve(__dirname, '../../assets/thumb');

const resizeImage = async (
  filename: string,
  width: number,
  height: number,
): Promise<string | null> => {
  const inputPath = `${fullPath}/${filename}.jpg`;
  const outputPath = `${thumbPath}/${filename}-${width}x${height}.jpg`;

  try {
    try {
      await fs.access(thumbPath);
    } catch {
      await fs.mkdir(thumbPath);
    }

    await sharp(inputPath)
      .resize(width, height)
      .toFile(outputPath);

    return outputPath; 
  } catch (error) {
    console.error('Error processing image:', error);
    return null;
  }
};

export default resizeImage;