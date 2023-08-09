import { 
  NewPatientEntry, 
  Gender, 
  Diagnosis, 
  EntryWithoutId,
  BaseEntryWithoutId, 
  SickLeave, 
  Discharge
 } from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isNumber = (text: unknown): text is number => {
  return typeof text === 'number' || text instanceof Number;
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

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error('Incorrect or missing name');
  }
  return name;
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
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

const parseDescription = (description: unknown): string => {
  if (!isString(description)) {
    throw new Error('Incorrect or missing description');
  }
  return description;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!isString(specialist)) {
    throw new Error('Incorrect or missing specialist name');
  }
  return specialist;
};

const parseEmployerName = (employerName: unknown): string => {
  if (!isString(employerName)) {
    throw new Error('Incorrect or missing Employer name');
  }
  return employerName;
};

const parseCriteria = (criteria: unknown): string => {
  if (!isString(criteria)) {
    throw new Error('Incorrect or missing discharge criteria');
  }
  return criteria;
};

const parseHealthCheckRating = (healthCheckRating: unknown): number => {
  if (!isNumber(healthCheckRating) || healthCheckRating > 3) {
    throw new Error('Incorrect or missing healthCheckRating data.');
  }
  return healthCheckRating;
};

const parseSickleave = (object: unknown): SickLeave => {
  // I am assuming data is in the correct format. 
  if ( !object || typeof object !== 'object' || !('sickLeave' in object) ) {
    throw new Error('Incorrect or missing sickleave data');
  }
  console.log("parseSickleave: ", object.sickLeave); 
  return object.sickLeave as SickLeave;
}; 

const parseDischarge = (object: unknown): Discharge => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }
  
  if ('date' in object && 
      'criteria' in object ) {
    const discharge: Discharge = {
      date: parseDate(object.date), 
      criteria: parseCriteria(object.criteria)
    };
    return discharge;
  } 
  throw new Error('Incorrect data: some sickLeave fields are missing');
}; 


export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
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
      occupation: parseOccupation(object.occupation)
    };
    return newEntry;
  } 
  
  throw new Error('Incorrect data: some fields are missing');
};

const toBaseEntry = (object: unknown): BaseEntryWithoutId => { 
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }

  console.log("object: ", object);

  if ('description' in object && 
      'date' in object && 
      'specialist' in object && 
      'type' in object
      )  
  {
    const base: BaseEntryWithoutId = {
      description: parseDescription(object.description),
      date: parseDate(object.date),
      specialist: parseSpecialist(object.specialist), 
    };
    if ('diagnosisCodes' in object) {
      return {
        ...base, 
        diagnosisCodes: parseDiagnosisCodes(object)
      }; 
     } else {
      return base;  
     }
  } 
  throw new Error('Incorrect data: some fields are missing');
}; 

export const toNewEntry = (object: unknown): EntryWithoutId => {

  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }

  const baseEntry = toBaseEntry(object);

  if ('type' in object) {
    switch(object.type) { 
      case "HealthCheck": 
        if ('healthCheckRating' in object) {
          return { 
            ...baseEntry, 
            type: "HealthCheck", 
            healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
            };
          } else {
            throw new Error('Incorrect or missing data for HealthCheck entry');
        }
      case "Hospital": 
        if ('discharge' in object) {   
          return { 
              ...baseEntry, 
              type: "Hospital",
              discharge: parseDischarge(object.discharge)
              };
          } else {
            return { 
              ...baseEntry, 
              type: "Hospital"
              };
            }
      case "OccupationalHealthcare":
        if ('employerName' in object) { 
          return { 
            ...baseEntry,
            type: "OccupationalHealthcare", 
            employerName: parseEmployerName(object.employerName), 
            sickLeave: parseSickleave(object)
            };
          } else {
            throw new Error('Incorrect or missing data for OccupationalHealthcare Entry.'); 
        }
    } 
}
  
  throw new Error('Incorrect data: some fields are missing');
}; 

export default { toNewPatientEntry, toNewEntry }; 