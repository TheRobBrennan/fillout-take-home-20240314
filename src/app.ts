import express, { Request, Response } from 'express';
import https from 'https';
import fs from 'fs';
import path from 'path';

const app = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, Express with TypeScript!');
});

app.get('/:formId/filteredResponses', (req: Request, res: Response) => {
  const { formId } = req.params;
  const url = `https://api.fillout.com/v1/api/forms/${formId}`;

  https.get(url, {
    headers: {
      'Authorization': `Bearer ${process.env.FILLOUT_API_KEY}`,
      'Content-Type': 'application/json'
    }
  }, (apiRes) => {
    let data = '';

    apiRes.on('data', (chunk) => {
      data += chunk;
    });

    apiRes.on('end', () => {
      try {
        const formResponses = JSON.parse(data);

        // Save the form responses to a file
        const filePath = path.join(__dirname, '..', 'tmp', 'data.json');
        fs.writeFileSync(filePath, JSON.stringify(formResponses, null, 2), 'utf-8');

        res.json(formResponses);
      } catch (error) {
        console.error(error);
        res.status(500).send('Failed to process the data.');
      }
    });
  }).on('error', (error) => {
    console.error(error);
    res.status(500).send('An error occurred while fetching form responses.');
  });
});

export default app;
