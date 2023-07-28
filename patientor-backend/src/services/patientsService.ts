import { v1 as uuid } from 'uuid'; 
import patients from '../../data/patients';
import { SanitisedPatientEntry, PatientEntry, NewPatientEntry } from '../types';

export const getEntries = (): PatientEntry[]  => {
  return patients;
};

export const getSanitisedEntry = (): SanitisedPatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

export const addPatient = ( entry: NewPatientEntry ): PatientEntry => {
  const newPatientEntry = {
    id: uuid(),
    ...entry
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getEntries,
  getSanitisedEntry,
  addPatient
};