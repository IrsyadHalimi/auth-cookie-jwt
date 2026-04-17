import app from './app';

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`
  🚀 Server berjalan mulus!
  📡 URL: http://localhost:${PORT}
  `);
});