import { v1 as uuid } from 'uuid'; 
import patients from '../../data/patients';
import { SanitisedPatientEntry, Patient, NewPatientEntry } from '../types';

export const getEntries = (): Patient[]  => {
  return patients;
  
};

export const getSinglePatientEntry = ( id: string ): Patient | undefined  => {
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

export const addPatient = ( entry: NewPatientEntry ): Patient => {
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