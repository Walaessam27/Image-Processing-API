import express from 'express';
import routes from './routes/index';

const app = express();
const port = 3000;

// استخدام الراوتر الجديد (كل المسارات ستبدأ بـ /api)
app.use('/api', routes);

app.get('/', (req, res) => {
  res.send('Welcome to the Image Processing API! Use /api/images to process images.');
});

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});

export default app;