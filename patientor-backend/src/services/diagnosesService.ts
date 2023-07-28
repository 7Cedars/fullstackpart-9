import diagnoses from '../../data/diagnoses';
import { DiagnosisEntry } from '../types';

export const getEntries = (): DiagnosisEntry[] => {
  return diagnoses;
};

export const addDiagnosis = () => {
  return null;
};

export default {
  getEntries,
  addDiagnosis
};