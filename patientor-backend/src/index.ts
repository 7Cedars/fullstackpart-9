import express from 'express';
import diagnosesRouter from './routes/diagnoses';
import patientsRouter from './routes/patients';
import cors = require("cors");

const app = express();
const allowedOrigins = ['http://localhost:3000'];
const options: cors.CorsOptions = {
  origin: allowedOrigins
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors(options));
app.use(express.json());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});