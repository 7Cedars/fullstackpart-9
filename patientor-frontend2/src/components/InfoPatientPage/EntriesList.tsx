import { Typography } from '@mui/material';
import { useState, useEffect } from "react";
import EntryDetails from './EntryDetails';
import AddEntryForm from './AddEntryForm';
import { Patient, Entry, EntryWithoutId } from '../../types'
import patientService from "../../services/patients";
import axios from 'axios';
import ErrorMessage from '../Messages/ErrorMessage';

interface Props {
  patient: Patient
}

const EntriesList = ({ patient}: Props ) => {

  const [error, setError] = useState<string>();
  const [entries, setEntries] = useState<Entry[]>([]) 

  useEffect(() => {
    setEntries(patient.entries)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const submitNewEntry = async (entry: EntryWithoutId) => {
    console.log("New Entry", entry)
    
    try {
      const newEntry = await patientService.addEntry(patient.id, entry);
      setEntries(entries.concat(newEntry as Entry));
      console.log("New entries list: ", entries)
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace('Something went wrong. Error: ', '');
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  return (
    <>
    {error ? <ErrorMessage error = {error} /> : null } 
    <Typography variant="h6" style={{ 
        marginTop: "1.0em",
        marginBottom: "0.5em", 
        fontWeight: "bold"  }}>
     New Entry
    </Typography>
    <AddEntryForm onSubmit={submitNewEntry} /> 
    <Typography variant="h6" style={{ 
        marginTop: "1.0em",
        marginBottom: "0.5em", 
        fontWeight: "bold"  }}>
      Existing entries
    </Typography>
      
      {/* onCancel={onClose}  */}
      {entries.map((entry: Entry) => 
        <EntryDetails entry = { entry } /> 
      )}
    </>
  )
}; 

export default EntriesList; 