import { NewPatientEntry, Gender, Entry } from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isArray = (array: unknown): array is Array<unknown> => {
  return array instanceof Array;
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

const isNotEntryArray = (entries: Array<unknown>): boolean => {
  const stringCheck = entries.map(entry => (isString(entry)));
  return Boolean(stringCheck.includes(false));
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

const parseEntries = (entries: unknown): Array<Entry>  => {
  if (isArray(entries))  {
    if (!isNotEntryArray(entries)) {
      return entries as Entry[]; 
    }
  }
  throw new Error('Incorrect or missing entries: ' + entries);
};


const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }

  if ('name' in object && 
      'dateOfBirth' in object && 
      'ssn' in object && 
      'gender' in object && 
      'occupation' in object && 
      'entries' in object
      )  
  {
    const newEntry: NewPatientEntry = {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: parseEntries(object.entries)
    };
    return newEntry;
  } 
  
  throw new Error('Incorrect data: some fields are missing');
};

export default toNewPatientEntry;