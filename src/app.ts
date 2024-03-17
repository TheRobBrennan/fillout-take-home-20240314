import express, { Request, Response } from 'express';
import { fetchAndSaveFormResponses } from './lib/filterFormResponses';

const app = express();
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, Express with TypeScript!');
});

app.get('/:formId/filteredResponses', async (req: Request, res: Response) => {
  const { formId } = req.params;
  try {
    const apiKey = process.env.FILLOUT_API_KEY || '';
    const responses = await fetchAndSaveFormResponses(formId, apiKey);
    res.json(responses);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while fetching form responses.');
  }
});

export default app;
