// Use Node.js's built-in https and fs modules
import https from 'https';
import fs from 'fs';
import path from 'path';

export const fetchAndSaveFormResponses = (formId: string, apiKey: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    const url = `https://api.fillout.com/v1/api/forms/${formId}`;

    https.get(url, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    }, response => {
      let data = '';
      response.on('data', chunk => data += chunk);
      response.on('end', () => {
        try {
          const formResponses = JSON.parse(data);
          const filePath = path.join(__dirname, '../..', 'tmp', 'data.json');
          fs.writeFileSync(filePath, JSON.stringify(formResponses, null, 2), 'utf-8');
          resolve(formResponses);
        } catch (error) {
          reject(error);
        }
      });
    }).on('error', error => reject(error));
  });
};
