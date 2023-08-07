/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import {  getSanitisedEntries, 
          addPatient, 
          getSinglePatientEntry, 
          addEntry } from '../services/patientsService'; 
import {  toNewPatientEntry, 
          toNewEntry } from '../utils'; 

const router = express.Router();

router.get('/', (_req, res) => {
  const response = getSanitisedEntries();
  res.send(response);
});

router.get('/:id', (req, res) => {
  const response = getSinglePatientEntry(req.params.id);
  res.send(response);
});

router.post('/:id/entries', (req, res) => {
  try {
    const newEntry = toNewEntry(req.body);

    const addedEntry = addEntry(req.params.id, newEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'This is an error.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
}); 

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);

    const addedPatientEntry = addPatient(newPatientEntry);
    res.json(addedPatientEntry);
  } catch (error: unknown) {
    let errorMessage = 'This is an error.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
}); 

export default router; 