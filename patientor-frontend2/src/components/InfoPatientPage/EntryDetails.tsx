import {  Entry, Diagnosis, HealthCheckEntry, OccupationalHealthcareEntry, HospitalEntry } from '../../types'
import {  Box } from '@mui/material';
import HospitalIcon from '@mui/icons-material/LocalHospital';
import HealthCheckIcon from '@mui/icons-material/FavoriteBorder';
import ApartmentIcon from '@mui/icons-material/Apartment';
import HeartIcon from '@mui/icons-material/Favorite';

import { useEffect, useState } from "react";
import axios from "axios";
import diagnosesService from "../../services/diagnoses"
import { apiBaseUrl } from "../../constants";

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

const DescriptionDiagnoses: React.FC<{entry: Entry}> = ({entry}) => {
  const [diagnosesEntries, setDiagnosesEntries] = useState<Diagnosis[]>();

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);
  
    const fetchEntries = async () => {
        const entries = await diagnosesService.getAll();
        console.log("ENTRIES FETCHED: ", entries )
        setDiagnosesEntries(entries);
      }
    
    void fetchEntries();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


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

const OccHealthEntry: React.FC<{entry: OccupationalHealthcareEntry}> = ({entry}) => {
 
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
      <DescriptionDiagnoses entry = {entry} /> 
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

const HealthChkEntry: React.FC<{entry: HealthCheckEntry}> = ({entry}) => {

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
      <DescriptionDiagnoses entry = {entry} /> 
      <HealthRatingIcon healthCheckRating = {healthCheck} /> 
      <div style = {{paddingTop: ".7rem"}}>
          Diagnosed by: {entry.specialist} 
      </div>
    </Box>
  )
}

const HospiEntry: React.FC<{entry: HospitalEntry}> = ({entry}) => {

  return (
    <Box sx={styles.box}> 
      <div>
        {entry.date} 
        <HospitalIcon /> 
      </div>
      <div> 
        <i> {entry.description} </i>
      </div>
      <DescriptionDiagnoses entry = {entry} /> 
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

const EntryDetails: React.FC<{entry: Entry}> = ({entry}) => {
  switch(entry.type) { 
    case "OccupationalHealthcare": 
      return <OccHealthEntry entry = {entry} />
    case "HealthCheck": 
      return <HealthChkEntry entry = {entry} />
    case "Hospital": 
      return <HospiEntry entry = {entry} />
  default: 
   return assertNever(entry)
  }
}

export default EntryDetails