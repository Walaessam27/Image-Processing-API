import resizeImage from '../utilities/imageProcessor';

describe('Test image processing utility', () => {
  it('should resolve and not throw an error with valid input', async () => {
    const result = await resizeImage('fjord', 100, 100);
    expect(result).not.toBeNull();
  });

  it('should return null if the image does not exist', async () => {
    const result = await resizeImage('nonexistent', 100, 100);
    expect(result).toBeNull();
  });
});