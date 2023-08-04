import diagnoses from '../../data/diagnoses';
import { Diagnosis } from '../types';

export const getEntries = (): Diagnosis[] => {
  return diagnoses;
};

export const addDiagnosis = () => {
  return null;
};

export default {
  getEntries,
  addDiagnosis
};