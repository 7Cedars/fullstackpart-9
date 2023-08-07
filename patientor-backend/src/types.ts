export enum Gender {
  Female = 'female',
  Male = 'male', 
  Nonbinary = 'nonbinary',
  Other = 'other'
}

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Diagnosis['code'][];

}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}
export interface Discharge {
  date: string; 
  criteria: string; 
}  

export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge?: Discharge; 
}

export interface SickLeave {
  startDate: string; 
  endDate: string; 
}  

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: SickLeave;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  entries: Entry[]; 
  occupation: string;
}

export type SanitisedPatientEntry = Omit<Patient, 'ssn' | 'entries'>; 
export type NewPatientEntry = Omit<Patient, 'id' | 'entries' >; 

// see https://fullstackopen.com/en/part9/grande_finale_patientor#omit-with-unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

export type EntryWithoutId = UnionOmit<Entry, 'id'>;
export type BaseEntryWithoutId = UnionOmit<BaseEntry, 'id'>;

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}