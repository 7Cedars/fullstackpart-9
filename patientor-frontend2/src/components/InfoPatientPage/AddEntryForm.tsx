import { useState, SyntheticEvent, useEffect } from "react";
import { 
  Box, 
  TextField, 
  ToggleButton, 
  ToggleButtonGroup,
  Grid, 
  Button
 } from '@mui/material';
import { EntryWithoutId, SickLeave, Discharge } from '../../types'

const styles = {
  descriptions: { 
    marginTop: ".5em",
    fontColour: "grey",  // correct label? 
    fontWeight: "bold"  
    }, 
  box: {  
      m: .25, 
      marginTop: "0em", 
      padding: ".5em", 
      paddingTop: ".5em", 
      border: "1px dashed", 
      borderColor: "black", 
      borderRadius: 2, 
      typography: 'body2'
    }, 
  grid: {
    paddingTop: "1em", 
    paddingBottom: "3em", 
  }, 
  buttons: {
    paddingTop: "0em", 
    paddingBottom: "1em", 
  }
}

interface Props {
  onSubmit: (values: EntryWithoutId) => void;
}

const AddEntryForm = ({ onSubmit }: Props) => {

  const [selectedForm, setSelectedForm] = useState<string>("HealthCheck");
  const [description, setdescription] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [specialist, setSpecialist] = useState<string>('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[] | undefined>(undefined);
  // Hospital entry specific: 
  const [dischargeDate, setDischargeDate] = useState<string>('');  
  const [dischargeCriteria, setDischargeCriteria] = useState<string>('');
  const [discharge, setDischarge] = useState<Discharge | undefined>(undefined);   
  // OccupationalHealthcare entry specific: 
  const [employerName, setEmployerName] = useState<string>('');
  const [sickLeaveStart, setSickLeaveStart] = useState<string>(''); 
  const [sickLeaveEnd, setSickLeaveEnd] = useState<string>(''); 
  const [sickLeave, setSickLeave] = useState<SickLeave | null>(null); 
  // HealthCheck entry specific: 
  const [healthCheckRating, setHealthCheckRating] = useState<number>(0);

  useEffect(() => {
    setDischarge({date: dischargeDate, criteria: dischargeCriteria})
    console.log("discharge:  ", discharge)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dischargeDate, dischargeCriteria]); 

  useEffect(() => {
    setSickLeave({startDate: sickLeaveStart, endDate: sickLeaveEnd})
    console.log("sickLeave:  ", sickLeave)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sickLeaveStart, sickLeaveEnd]); 

  const baseData = ({
    description,
    date,
    specialist,
    diagnosisCodes
  }) 

  const entryData = (type: string) => {
    switch(type) {
      case "Hospital": 
        return (
          {...baseData,
            type: "Hospital",
            discharge } as EntryWithoutId
          )
      case "OccupationalHealthcare": 
        return (
          {...baseData,
            type: "OccupationalHealthcare",
            employerName,
            sickLeave } as EntryWithoutId
        )
      case "HealthCheck":
        return (
          {...baseData,
            type: "HealthCheck",
            healthCheckRating } as EntryWithoutId
          )
      default: 
        throw new Error('Missing type or data');
    } 
  }

  
  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit(entryData(selectedForm));
    cleanupEntryForm(event); 
  };

  const cleanupEntryForm = (event: SyntheticEvent) => {
    event.preventDefault();
    setdescription('')
    setDate('')
    setSpecialist('')
    setDiagnosisCodes(undefined)
    setDischargeDate('')
    setDischargeCriteria('')
    setDischarge(undefined)
    setEmployerName('')
    setSickLeaveStart('')
    setSickLeaveEnd('')
    setSickLeave(null)
    setHealthCheckRating(0)
  };

  const handleFormSelection = (
    event: React.MouseEvent<HTMLElement>,
    newSelectedForm: string,
  ) => {
    setSelectedForm(newSelectedForm);
  };

  return (
    <Box sx={styles.box}> 
    <ToggleButtonGroup
      sx={styles.buttons}
      value={selectedForm}
      color="primary"
      exclusive
      fullWidth
      size="small" 
      onChange={handleFormSelection}
      aria-label="text alignment"
    >
      <ToggleButton value="HealthCheck" aria-label="left aligned">
        Health Check
      </ToggleButton>
      <ToggleButton value="OccupationalHealthcare" aria-label="centered">
        Occupational
      </ToggleButton>
      <ToggleButton value="Hospital" aria-label="right aligned">
        Hospital
      </ToggleButton>
    </ToggleButtonGroup>
    {/* <b> New HealthCheck Entry </b> */}


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
        { 
          selectedForm === "Hospital" ? 
          <>
            <TextField
              label="Discharge date"
              placeholder="YYYY-MM-DD"
              fullWidth
              margin="dense" 
              value={dischargeDate}
              onChange={({ target }) => setDischargeDate(target.value) }
            />
            <TextField
              label="Discharge criteria"
              fullWidth
              margin="dense" 
              value={dischargeCriteria}
              onChange={({ target }) => setDischargeCriteria(target.value) }
            /> 
          </>
          : null
        }
        { 
          selectedForm === "OccupationalHealthcare" ? 
          <>
            <TextField
              label="Employer name"
              fullWidth
              margin="dense" 
              value={employerName}
              onChange={({ target }) => setEmployerName(target.value) }
            />
            <TextField
              label="Sickleave start"
              placeholder="YYYY-MM-DD"
              fullWidth
              margin="dense" 
              value={sickLeaveStart}
              onChange={({ target }) => setSickLeaveStart(target.value) }
            /> 
            <TextField
              label="Sickleave end"
              placeholder="YYYY-MM-DD"
              fullWidth
              margin="dense" 
              value={sickLeaveEnd}
              onChange={({ target }) => setSickLeaveEnd(target.value) }
            /> 
          </>
          : null
        }
        { 
          selectedForm === "HealthCheck" ? 
            <TextField
              label="HealthCheck rating"
              fullWidth
              margin="dense" 
              value={healthCheckRating}
              onChange={({ target }) => setHealthCheckRating(parseInt(target.value))}
            /> : null 
        }
        
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