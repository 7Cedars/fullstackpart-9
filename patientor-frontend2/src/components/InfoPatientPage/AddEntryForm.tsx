import { useState, SyntheticEvent } from "react";
import { 
  Box, 
  TextField, 
  InputLabel, 
  MenuItem,
  Grid, 
  Select, 
  Button
 } from '@mui/material';
import { EntryWithoutId } from '../../types'


const styles = {
  descriptions: { 
    marginTop: ".5em",
    fontColour: "grey",  // correct label? 
    fontWeight: "bold"  
    }, 
  box: {  
      m: .25, 
      marginTop: "1em", 
      padding: ".5em", 
      paddingTop: "1.5em", 
      border: "1px dashed", 
      borderColor: "black", 
      borderRadius: 2, 
      typography: 'body2'
    }, 
  grid: {
    paddingTop: "1em", 
    paddingBottom: "3em", 
  }
}

interface Props {
  onSubmit: (values: EntryWithoutId) => void;
}

const AddEntryForm = ({ onSubmit }: Props) => {

  const [description, setdescription] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [specialist, setSpecialist] = useState<string>('');
  const [healthCheckRating, setHealthCheckRating] = useState<number>(0);
 // const [type, setType] = useState("HealthCheck");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[] | undefined>(undefined);

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      description,
      date,
      specialist,
      type:"HealthCheck",
      healthCheckRating, 
      diagnosisCodes
    });
    console.log("diagnosisCodes: ", diagnosisCodes)
    cleanupEntryForm(event); 
  };

  const cleanupEntryForm = (event: SyntheticEvent) => {
    event.preventDefault();
    setdescription('')
    setDate('')
    setSpecialist('')
    setHealthCheckRating(0)
    setDiagnosisCodes(undefined)
  };

  return (
    <Box sx={styles.box}> 
    <b> New HealthCheck Entry </b>
    <form onSubmit={addEntry}>
        <TextField
          label="Description"
          fullWidth 
          margin="dense" 
          value={description}
          onChange={({ target }) => setdescription(target.value)}
        />
        <TextField
          label="Date"
          placeholder="YYYY-MM-DD"
          fullWidth
          margin="dense" 
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          label="Specialist"
          fullWidth
          margin="dense" 
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <TextField
          label="HealthCheck rating"
          fullWidth
          margin="dense" 
          value={healthCheckRating}
          onChange={({ target }) => setHealthCheckRating(parseInt(target.value))}
        />
        <TextField
          label="Diagnosis Codes"
          fullWidth
          margin="dense" 
          value={diagnosisCodes}
          onChange={({ target }) => setDiagnosisCodes(target.value.split(','))}
        />

        <Grid sx={styles.grid}>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={cleanupEntryForm}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
  </Box>
  )
}; 

export default AddEntryForm; 