import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator'; 

const app = express();
app.use(express.json()); 

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

app.post('/exercises', (req, res) => {
  interface DataRequest {
    daily_exercises: number[], 
    target: number
    }

  const { daily_exercises, target } = req.body as DataRequest;

    try {
      // data check
      const sum = daily_exercises.reduce((partialSum, a) => partialSum + a, 0);
      const test1 = isNaN(sum);
      const test2 = (target / 2) === null;

      if (test1 === true || test2 === true) {
        res.status(500).send(`Error: malformatted or missing parameters.`).end();
      } 

      const result = calculateExercises(daily_exercises, target);
      return res.send( {result} );

    } catch (error) {
      return res.status(500).send(`Error: "parameters missing:" ${error}`);
    }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});