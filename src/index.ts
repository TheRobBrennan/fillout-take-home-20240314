import 'dotenv/config';
import app from './app';

// Use the PORT environment variable, default to 3000 if not set
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
