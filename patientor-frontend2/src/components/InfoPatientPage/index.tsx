import { Box, Typography } from '@mui/material';
import { useEffect, useState } from "react";
import { PathMatch, useMatch } from "react-router-dom"
import axios from "axios";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';

import { Patient } from "../../types";
import { apiBaseUrl } from "../../constants";
import patientService from "../../services/patients";
import EntriesList from './EntriesList';

const InfoPatientPage = () => {

  const [patient, setPatient] = useState<Patient>();
  const match = useMatch('/patients/:id')

  const icon = (patient: Patient) => {
    if (patient.gender === 'female') { return <FemaleIcon /> }  
    if (patient.gender === 'male') { return <MaleIcon /> } 
    return null 
  }
  
  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);
  
    const fetchPatient = async (match: PathMatch<"id"> | null ) => {
      if (match === null) { } 
      else {
        const patient = await patientService.getSingle(match.params.id);
        setPatient(patient);
      }
    };
    void fetchPatient(match);
    console.log("MATCH: ", match, "PATIENT: ", patient)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (patient === undefined) {
    return (
      <> Missing Data </> // this should actually be a proper error notification. 
    )
  }
  
  return (
      <Box>
        <Typography variant="h5" style={{ 
            marginBottom: "0.5em", 
            marginTop: "1.0em", 
            fontWeight: "bold"  }}>
          {patient.name} 
          {icon(patient)}
        </Typography>
            <div> ssn: {patient.ssn} </div>
            <div> occupation: {patient.occupation} </div>
         <EntriesList patient= {patient}/> 
      </Box>
     
    )
};

export default InfoPatientPage;
