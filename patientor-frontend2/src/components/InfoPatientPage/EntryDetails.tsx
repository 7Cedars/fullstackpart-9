import {  Entry, 
  Diagnosis, 
  HealthCheckEntry, 
  OccupationalHealthcareEntry, 
  HospitalEntry} from '../../types'
import {  Box } from '@mui/material';
import HospitalIcon from '@mui/icons-material/LocalHospital';
import HealthCheckIcon from '@mui/icons-material/FavoriteBorder';
import ApartmentIcon from '@mui/icons-material/Apartment';
import HeartIcon from '@mui/icons-material/Favorite';

const assertNever = (entry: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(entry)}`
    );
}

const styles = {
  title: { 
    marginTop: "1.0em",
    marginBottom: "0.5em", 
    fontWeight: "bold"  
    }, 
  box: { p: .5, 
      m: .25, 
      border: 1, 
      borderColor: "black", 
      borderRadius: 2
    }
}

const HealthRatingIcon: React.FC<{healthCheckRating: number}> = ({healthCheckRating}) => {
  switch(healthCheckRating) { 
    case 0: 
      return <div style= {{color: "green"}}> <HeartIcon/> </div>
    case 1: 
      return <div style= {{color: "yellow"}}> <HeartIcon/> </div>
    case 2: 
      return <div style= {{color: "red"}}> <HeartIcon/> </div>
    case 3: 
      return <div style= {{color: "black"}}> <HeartIcon/> </div>
    default: 
      return <div> </div>
     }
  }

  
const DescriptionDiagnoses: React.FC<{entry: Entry, diagnosesEntries: Diagnosis[]}> = ({entry, diagnosesEntries}) => {

  const descriptionDiagnosis = (diagnosis: Diagnosis['code'], diagnosesEntries: Diagnosis[] | undefined) => {
    if (diagnosesEntries === undefined) {
      return null 
    
    } else {
      const match = diagnosesEntries.find((entry: Diagnosis) => entry.code === diagnosis)
      return ( match?.name ) 
    }
  } 

  return (
    <div>
    {entry.diagnosisCodes?
      <ul> 
        {entry.diagnosisCodes.map(diagnosis => 
          <li key = {diagnosis} > {diagnosis}
          <> {descriptionDiagnosis(diagnosis, diagnosesEntries)} </> 
          </li>
        )}
      </ul>
      : null  
    }
    </div>
  )
}

const OccHealthEntry: React.FC<{entry: OccupationalHealthcareEntry, diagnosesEntries: Diagnosis[]}> = ({entry, diagnosesEntries}) => {
 
  return (
    <Box sx={styles.box}> 
      <div>
        {entry.date} 
        <ApartmentIcon /> 
        {entry.employerName}
      </div>
      <div> 
        <i> {entry.description} </i>
      </div>
      <DescriptionDiagnoses entry = {entry} diagnosesEntries={diagnosesEntries}/> 
      {entry.sickLeave ?
      <div> 
        Sick leave start: {entry.sickLeave.startDate},  
        sick leave end: {entry.sickLeave.endDate},       
      </div>
        : null  
      }   
      <div style = {{paddingTop: ".7rem"}}>
          Diagnosed by: {entry.specialist} 
      </div>
    </Box>
  )
}

const HealthChkEntry: React.FC<{entry: HealthCheckEntry, diagnosesEntries: Diagnosis[]}> = ({entry, diagnosesEntries}) => {

  const healthCheck = entry.healthCheckRating

  return (
    <Box sx={styles.box}> 
      <div>
        {entry.date} 
        <HealthCheckIcon /> 
      </div>
      <div> 
        <i> {entry.description} </i>
      </div>
      <DescriptionDiagnoses entry = {entry} diagnosesEntries={diagnosesEntries}/> 
      <HealthRatingIcon healthCheckRating = {healthCheck} /> 
      <div style = {{paddingTop: ".7rem"}}>
          Diagnosed by: {entry.specialist} 
      </div>
    </Box>
  )
}

const HospiEntry: React.FC<{entry: HospitalEntry, diagnosesEntries: Diagnosis[]}> = ({entry, diagnosesEntries}) => {

  return (
    <Box sx={styles.box}> 
      <div>
        {entry.date} 
        <HospitalIcon /> 
      </div>
      <div> 
        <i> {entry.description} </i>
      </div>
      <DescriptionDiagnoses entry = {entry} diagnosesEntries={diagnosesEntries}/> 
      {entry.discharge ?
      <div> 
        Discharge date: {entry.discharge.date},  
        criteria: {entry.discharge.criteria}       
      </div>
        : null  
      }      
      <div style = {{paddingTop: ".7rem"}}>
          Diagnosed by: {entry.specialist} 
      </div>
    </Box>
  )
}

const EntryDetails: React.FC<{entry: Entry, diagnosesEntries: Diagnosis[]}> = ({entry, diagnosesEntries}) => {
  switch(entry.type) { 
    case "OccupationalHealthcare": 
      return <OccHealthEntry entry = {entry} diagnosesEntries={diagnosesEntries}/>
    case "HealthCheck": 
      return <HealthChkEntry entry = {entry} diagnosesEntries={diagnosesEntries}/>
    case "Hospital": 
      return <HospiEntry entry = {entry} diagnosesEntries={diagnosesEntries} />
  default: 
   return assertNever(entry)
  }
}

export default EntryDetails