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

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}
interface Discharge {
  date: string; 
  criteria: string; 
}  

interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  specialist: string;
  discharge?: Discharge; 
}

interface SickLeave {
  startDate: string; 
  endDate: string; 
}  

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  specialist: string;
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

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}