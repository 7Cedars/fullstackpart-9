import { useState, SyntheticEvent } from "react";
import { 
  Box, 
  TextField, 
  ToggleButton, 
  ToggleButtonGroup,
  Grid, 
  Button,
  Select,  
  SelectChangeEvent, 
  Checkbox, 
  FormControl,
  MenuItem,
  ListItemText
 } from '@mui/material';
import { EntryWithoutId, Diagnosis} from '../../types'

const styles = {
  descriptions: { 
    marginTop: ".5em",
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
  subBox: {  
      m: .25, 
      marginTop: "0em", 
      padding: ".5em", 
      paddingTop: ".5em", 
      typography: 'body2'
    },
  grid: {
    paddingTop: "1em", 
    paddingBottom: "3em", 
  }, 
  buttons: {
    paddingTop: "0em", 
    paddingBottom: "1em", 
    color: "red"
  },
  selectMenu: {
    paddingTop: ".6em", 
    paddingBottom: ".75em", 
    margin: "0.0em",
    PaperProps: {
      style: {
        maxHeight: 200,
        
      },
    },
  }
}

interface Props {
  onSubmit: (values: EntryWithoutId) => void;
  diagnosesEntries: Diagnosis[] | undefined
}

//  behaviour with mixed string / int enum was so odd, that I just decided to hard code it.
const healthCheckOptions = [ 
  { value: 0, label: "Healthy" },
  { value: 1, label: "LowRisk" },
  { value: 2, label: "HighRisk"},
  { value: 3, label: "CriticalRisk"} 
]

const AddEntryForm = ({ onSubmit, diagnosesEntries }: Props) => {

  const [selectedForm, setSelectedForm] = useState<string>("HealthCheck");
  const [description, setdescription] = useState<string>('');
  const [date, setDate] = useState<string>('yyyy-mm-dd');
  const [specialist, setSpecialist] = useState<string>('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  // Hospital entry specific: 
  const [dischargeDate, setDischargeDate] = useState<string>('yyyy-mm-dd');  
  const [dischargeCriteria, setDischargeCriteria] = useState<string>('');
  // OccupationalHealthcare entry specific: 
  const [employerName, setEmployerName] = useState<string>('');
  const [sickLeaveStart, setSickLeaveStart] = useState<string>('yyyy-mm-dd'); 
  const [sickLeaveEnd, setSickLeaveEnd] = useState<string>('yyyy-mm-dd'); 
  // HealthCheck entry specific: 
  const [healthCheckRating, setHealthCheckRating] = useState<number>(0);
  // const [healthCheckRatingOption, setHealthCheckRatingOption] = useState<HealthCheckRatingOption[]>();

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
            discharge: {date: dischargeDate, criteria: dischargeCriteria} } as EntryWithoutId
          )
      case "OccupationalHealthcare": 
        return (
          {...baseData,
            type: "OccupationalHealthcare",
            employerName,
            sickLeave: {startDate: sickLeaveStart, endDate: sickLeaveEnd} } as EntryWithoutId
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
    setDate('yyyy-mm-dd')
    setSpecialist('')
    setDiagnosisCodes([])
    setDischargeDate('yyyy-mm-dd')
    setDischargeCriteria('')
    setEmployerName('')
    setSickLeaveStart('yyyy-mm-dd')
    setSickLeaveEnd('yyyy-mm-dd')
    setHealthCheckRating(0)
  };

  const handleFormSelection = (
    event: React.MouseEvent<HTMLElement>,
    newSelectedForm: string,
  ) => {
    setSelectedForm(newSelectedForm);
  };

  const handleRatingSelection = (event: SelectChangeEvent<typeof healthCheckRating>) => {
     
    const {
      target: { value },
    } = event;
    setHealthCheckRating(
      typeof value === 'string' ? parseInt(value) : value,
    );
  };

  const handleDiagnosesSelection = (event: SelectChangeEvent<typeof diagnosisCodes>) => {
     
    const {
      target: { value },
    } = event;
    console.log("VALUE: ", value)
    setDiagnosisCodes(
      // On autofill we get a stringified value.
      // value
      typeof value === 'string' ? value.split(', ') : value,
    );
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
          fullWidth
          type="date"
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
          <Box sx = {styles.subBox} >
            <div style={{color: "grey"}}>Discharge information</div>
            <TextField
              label="Discharge date"
              type="date"
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
          </Box>
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
            <Box sx = {styles.subBox} >
              <div style = {{color: "grey"}}> Sick leave information </div>
            <TextField
              label="Sickleave start"
              type="date"
              fullWidth
              margin="dense" 
              value={sickLeaveStart}
              onChange={({ target }) => setSickLeaveStart(target.value) }
            /> 
            <TextField
              label="Sickleave end"
              type="date"
              fullWidth
              margin="dense" 
              value={sickLeaveEnd}
              onChange={({ target }) => setSickLeaveEnd(target.value) }
            /> 
            </Box>
          </>
          : null
        }
        { 
          selectedForm === "HealthCheck" ? 
            <Box sx = {styles.subBox} >
              <div style = {{color: "grey"}}> Health check rating </div>
              <FormControl sx={styles.selectMenu} 
                fullWidth
                margin="dense" 
                > 
                <Select
                  labelId="select-healthCheck-rating"
                  id="select-healthCheck-rating"
                  value={healthCheckRating}
                  // label="Healthcheck Rating"
                  onChange={handleRatingSelection}
                  >
                  {healthCheckOptions.map(option => (
                    <MenuItem 
                      value={option.value}> 
                      {option.label} 
                    </MenuItem>
                  ))
                  }
                </Select>
              </FormControl> 
            </Box>
            : null 
          }
        { diagnosesEntries === undefined ? 
        null : 
          <Box sx = {styles.subBox} >
            <div style= {{color: "grey"}}> Diagnoses </div>
            <FormControl sx={styles.selectMenu} 
            fullWidth>
              <Select
                id="checkbox-diagnoses-codes"
                multiple
                value={diagnosisCodes}
                onChange={handleDiagnosesSelection}
               //  input={<OutlinedInput label="Diagnosis Codes" />}
                renderValue={(selected) => selected.join(', ')}
                MenuProps={styles.selectMenu}
              >
                {diagnosesEntries.map((entry: Diagnosis) => (
                  <MenuItem key={entry.code} value={entry.code}>
                    <Checkbox checked={diagnosisCodes.indexOf(entry.code) > -1} />
                    <ListItemText primary={`${entry.code}: ${entry.name}`} />
                  </MenuItem>
                  ))}
                </Select>
              </FormControl>  
            </Box>
        } 
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