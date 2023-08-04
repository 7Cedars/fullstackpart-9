import { Typography } from '@mui/material';
import { useEffect, useState } from "react";
import axios from "axios";

import diagnosesService from "../../services/diagnoses"
import { apiBaseUrl } from "../../constants";
import { Patient, Entry, Diagnosis } from '../../types'

interface Props {
  patient: Patient;
}

export const descriptionDiagnosis = (diagnosis: Diagnosis['code'], diagnosesEntries: Diagnosis[] | undefined) => {
  if (diagnosesEntries === undefined) {
    return null 
  
  } else {
    const match = diagnosesEntries.find((entry: Diagnosis) => entry.code === diagnosis)
    return ( match?.name ) 

  }
} 

const EntriesList = ({patient}: Props ) => {

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

  return (
    <>
    <Typography variant="h6" style={{ 
        marginTop: "1.0em",
        marginBottom: "0.5em", 
        fontWeight: "bold"  }}>
      entries
    </Typography>
      {patient.entries.map((entry: Entry) => 
      <>
        <p key = {entry.id} > 
          {entry.date}: <i> {entry.description} </i>  
        </p>
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
      </>
    )} 
   </>
  )
}; 

export default EntriesList; 