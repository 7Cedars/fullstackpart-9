export enum Gender {
  Female = 'female',
  Male = 'male', 
  Nonbinary = 'nonbinary',
  Other = 'other'
}

export interface Entry {
  entry: string;
}

export interface PatientEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  entries: Entry[]; 
  occupation: string;
}

export type SanitisedPatientEntry = Omit<PatientEntry, 'ssn' | 'entries'>; 
export type NewPatientEntry = Omit<PatientEntry, 'id' | 'entries' >; 

export interface DiagnosisEntry {
  code: string;
  name: string;
  latin?: string;
}