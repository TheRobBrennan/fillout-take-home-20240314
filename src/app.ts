import express, { Request, Response } from 'express';
import fetch from 'node-fetch';

const app = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, Express with TypeScript!');
});

app.get('/:formId/filteredResponses', async (req: Request, res: Response) => {
  try {
    const { formId } = req.params;
    const { filters } = req.query;
    const parsedFilters = JSON.parse(filters as string);

    const response = await fetch(`https://api.fillout.com/forms/${formId}/responses`, {
      method: 'GET',
      headers: {
        // Add necessary headers here
      }
    });

    if (!response.ok) throw new Error('Failed to fetch form responses');

    const formResponses = await response.json();

    // Implement filtering logic on formResponses based on parsedFilters
    const filteredResponses = formResponses.filter((response: any) => true); // Placeholder logic

    res.json(filteredResponses);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while processing your request.');
  }
});

export default app;
