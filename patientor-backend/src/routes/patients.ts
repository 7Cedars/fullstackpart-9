/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import { getSanitisedEntry, addPatient } from '../services/patientsService'; 

const router = express.Router();

router.get('/', (_req, res) => {
  const response = getSanitisedEntry();
  res.send(response);
});

router.post('/', (req, res) => {
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;
  const addedEntry = addPatient({
    name,
    dateOfBirth,
    ssn,
    gender, 
    occupation
  });
  res.json(addedEntry);
});

export default router; 