import express, { Request, Response } from 'express';
import { fetchAndSaveFormResponses } from './lib/filterFormResponses';

const app = express();
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  const formId = process.env.FILLOUT_FORM_ID
  res.redirect(`/${formId}/filteredResponses`);
});

app.get('/:formId/filteredResponses', async (req: Request, res: Response) => {
  const { formId } = req.params;
  try {
    const responses = await fetchAndSaveFormResponses(formId);
    res.json(responses);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while fetching form responses.');
  }
});

export default app;
