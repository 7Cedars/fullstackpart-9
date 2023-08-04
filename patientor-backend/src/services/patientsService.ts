import { v1 as uuid } from 'uuid'; 
import patients from '../../data/patients';
import { SanitisedPatientEntry, PatientEntry, NewPatientEntry } from '../types';

export const getEntries = (): PatientEntry[]  => {
  return patients;
  
};

export const getSinglePatientEntry = ( id: string ): PatientEntry | undefined  => {
  const patient = patients.find(patient => patient.id === id); 
  return patient;
};

export const getSanitisedEntries = (): SanitisedPatientEntry[] => {
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
    ...entry, 
    entries: []
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getEntries,
  getSinglePatientEntry,
  getSanitisedEntries,
  addPatient
};