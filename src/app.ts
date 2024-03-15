import express, { Request, Response } from 'express';
// import fetch from 'node-fetch';
// import fs from 'fs';
// import path from 'path';


const app = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, Express with TypeScript!');
});

app.get('/:formId/filteredResponses', async (req: Request, res: Response) => {
  try {
    const apiKey = process.env.FILLOUT_API_KEY;
    const { formId } = req.params;
    const { filters } = req.query;

    // TODO: Parse filters from query string
    // const parsedFilters = JSON.parse(filters as string);

    // const response = await fetch(`https://api.fillout.com/forms/${formId}/responses`, {
    //   method: 'GET',
    //   headers: {
    //     'Authorization': `Bearer ${apiKey}`,
    //     'Content-Type': 'application/json'
    //   }
    // });

    // if (!response.ok) throw new Error('Failed to fetch form responses');

    // const formResponses = await response.json();

    // TODO: Implement filtering logic
    // const filteredResponses = formResponses.filter((response: any) => true); // Placeholder logic
    // res.json(filteredResponses);

    // // Save the form responses to a file
    // const filePath = path.join(__dirname, '..', 'tmp', 'data.json');
    // fs.writeFileSync(filePath, JSON.stringify(formResponses, null, 2), 'utf-8');

    // res.json(formResponses);
    res.json({ formId })
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while processing your request.');
  }
});

export default app;
