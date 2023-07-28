import express from 'express';
import { getEntries } from '../services/diagnosesService'; 

const router = express.Router();

router.get('/', (_req, res) => {
  const response = getEntries();
  res.send(response);
});

router.post('/', (_req, res) => {
  res.send('Saving a diagnosis! (WIP)');
});

export default router; 