import express from 'express';

const app = express();
const port = 3000;

// تعريف مسار بسيط (Route)
app.get('/', (req, res) => {
  res.send('Server is running successfully!');
});

// تشغيل السيرفر
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});

export default app; // سنحتاجه لاحقاً للاختبارات