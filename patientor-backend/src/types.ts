export enum Gender {
  Female = 'female',
  Male = 'male', 
  Nonbinary = 'nonbinary',
  Other = 'other'
}

export interface PatientEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
}

export type SanitisedPatientEntry = Omit<PatientEntry, 'ssn'>; 
export type NewPatientEntry = Omit<PatientEntry, 'id'>; 

export interface DiagnosisEntry {
  code: string;
  name: string;
  latin?: string;
}