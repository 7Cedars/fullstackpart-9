import express from 'express';
import { calculateBmi } from './bmiCalculator';

const app = express();

app.get('/bmi', (request, response) => {

  const height = Number(request.query.height);
  const weight = Number(request.query.weight);

  if (Number.isNaN(height) || height === 0 || Number.isNaN(weight) || weight === 0 ) {
    response.status(500).send(`Error: malformatted parameters!`);
  } else {
    const res = calculateBmi(height, weight);
    response.send(res);
  } 
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});