# Welcome

This repo contains my approach and submission to solving a requested take-home coding challenge.

## Getting started

### Review the requirements

- [Express.js](https://expressjs.com) is the preferred framework for their APIs; however any framework can be used
- Create a single endpoint `/{formId}/filteredResponses` to respond to `GET` requests
  - Query parameters accepted should match [https://www.fillout.com/help/fillout-rest-api#620db33e79744413af4acef27e5f0f78](https://www.fillout.com/help/fillout-rest-api#620db33e79744413af4acef27e5f0f78) with the addition of a `filters` parameter

```ts
type FilterClauseType = {
 id: string;
 condition: 'equals' | 'does_not_equal' | 'greater_than' | 'less_than';
 value: number | string;
}

// each of these filters should be applied like an AND in a "where" clause
// in SQL
type ResponseFiltersType = ResponseFilter[];
```

- Design consideration - Fillout forms sometimes have things other than question answers in the responses, but you can assume for this assignment, that the ids to filter by will only ever correspond to form questions, where the values are either string, number, or strings which are ISO dates

- Responses should match the same shape as defined at [https://www.fillout.com/help/fillout-rest-api#d8b24260dddd4aaa955f85e54f4ddb4d](https://www.fillout.com/help/fillout-rest-api#d8b24260dddd4aaa955f85e54f4ddb4d) - Sjust filtering out the responses that don’t match the filters.
  - Note that this means you’ll need to make sure the pagination still works, in the response (i.e. the `totalResponses` and `pageCount` )

#### REFERENCE: Example responses and input

Example responses to a `formId`:

```ts
{
 "responses": [
  {
   "questions": [
    {
     "id": "nameId",
     "name": "What's your name?",
     "type": "ShortAnswer",
     "value": "Timmy"
    },
    {
     "id": "birthdayId",
     "name": "What is your birthday?",
     "type": "DatePicker",
     "value": "2024-02-22T05:01:47.691Z"
    },
   ],
   "submissionId": "abc",
   "submissionTime": "2024-05-16T23:20:05.324Z"
   // please include any additional keys
  },
 ],
 "totalResponses": 1,
 "pageCount": 1
}

```

Example input for filtering:

```json
[
 {
  id: "nameId",
  condition: "equals",
  value: "Timmy",
 },
 {
  id: "birthdayId",
  condition: "greater_than",
  value: "2024-02-23T05:01:47.691Z"
 }
]
```

Output:
No responses are returned, because even though `Timmy` matches the name, the birthday is not greater than the one in our filter.

### Create the initial scaffolding

[TypeScript](https://www.typescriptlang.org) is a solid choice for developing applications. If I'm not creating an application with [Next.js](https://nextjs.org), [Express.js](https://expressjs.com) is my preferred framework for Node.js API development.

For a review of this assignment, it's worth noting that Express is the only dependency installed in the production environment. TypeScript and associated type definitions for TypeScript and Express.js are used for development only.

```sh
# Install dependencies for Express.js and TypeScript
npm install express
npm install --save-dev typescript @types/node @types/express

# Create a new TypeScript configuration file using a convenient method to generate a default configuration file
npx tsc --init

# Define rootDir and outDir values in tsconfig.json

```
