/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import { getSanitisedEntry, addPatient } from '../services/patientsService'; 
import toNewPatientEntry from '../utils'; 

const router = express.Router();

router.get('/', (_req, res) => {
  const response = getSanitisedEntry();
  res.send(response);
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);

    const addedEntry = addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'This is an error.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
}); 

export default router; 