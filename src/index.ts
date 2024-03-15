import app from './app';

const port = 3000; // FUTURE: Default to port 3000 after attempting to use the PORT environment variable

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
