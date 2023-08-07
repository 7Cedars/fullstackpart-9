import { Typography } from '@mui/material';
import EntryDetails from './EntryDetails';
import { Patient, Entry } from '../../types'

interface Props {
  patient: Patient;
}

const EntriesList = ({patient}: Props ) => {


  const entries = patient.entries.length 

  return (
    <>
    <Typography variant="h6" style={{ 
        marginTop: "1.0em",
        marginBottom: "0.5em", 
        fontWeight: "bold"  }}>
      entries
    </Typography>
      {patient.entries.map((entry: Entry) => 
        <EntryDetails entry = { entry } /> 
      )}
    </>
  )
}; 

export default EntriesList; 