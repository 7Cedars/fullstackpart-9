import { Patient, Entry } from '../../types'
import { Typography } from '@mui/material';

interface Props {
  patient: Patient;
}

const EntriesList = ({patient}: Props ) => {

  return (
    <>
    <Typography variant="h6" style={{ 
        marginTop: "1.0em",
        marginBottom: "0.5em", 
        fontWeight: "bold"  }}>
      entries
    </Typography>
      {patient.entries.map((entry: Entry) => 
        <p key = {entry.id} > 
          {entry.date}: <i> {entry.description} </i>  
          {entry.diagnosisCodes?
            <ul> 
              {entry.diagnosisCodes.map(diagnosis => 
                <li key = {diagnosis} > {diagnosis} </li> 
              )}
            </ul>
            : null  
          }
        </p>
      ) } 
   </>
  )
}; 

export default EntriesList; 