import { NewPatientEntry, Gender } from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(param);
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
}; 

const isSsn = (ssn: string): boolean => {
  console.log(ssn); 
  return Boolean(ssn.length > 5); // in reality this should be much more precise obv. 
}; 

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error('Incorrect or missing name');
  }
  return name;
};

const parseDate = (dateOfBirth: unknown): string => {
  if (!isString(dateOfBirth) || !isDate(dateOfBirth)) {
      throw new Error('Incorrect or missing date: ' + dateOfBirth);
  }
  return dateOfBirth;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn) || !isSsn(ssn) ) {
      throw new Error('Incorrect or missing ssn: ' + ssn);
  }
  return ssn;
};

const parseGender = (gender: unknown): string => {
  if (!isString(gender) || !isGender(gender)) {
      throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
      throw new Error('Incorrect or missing occupation: ' + occupation);
  }
  return occupation;
};


const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }

  if ('name' in object && 
      'dateOfBirth' in object && 
      'ssn' in object && 
      'gender' in object && 
      'occupation' in object
      )  
  {
    const newEntry: NewPatientEntry = {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
    };
    return newEntry;

  } 
  
  throw new Error('Incorrect data: some fields are missing');
};

export default toNewPatientEntry;