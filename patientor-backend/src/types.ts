export type Gender = 'male' | 'female' | 'undefined';

export interface Patient {
  id: number;
  name: string;
  dateOfBirth: Date;
  gender: Gender;
  ssn: number;
  comment: string;
}

export interface DiagnosisEntry {
  code: string;
  name: string;
  latin?: string;
}