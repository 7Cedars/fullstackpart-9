import { useState, useEffect} from 'react';
import axios from 'axios';
import { NonSensitiveDiaryEntry, Weather, Visibility, ValidationError } from './types';
import EntryList from './components/EntryList';
import { getAllEntries, createEntry } from './services/diaryServices';

const App = () => {
  
  const [entries, setEntries] = useState<NonSensitiveDiaryEntry[] >([]); 
  const [errorMessage, setErrorMessage] = useState<string | undefined>(); 
  const [date, setDate] = useState<string>('');
  const [weather, setWeather] = useState<Weather>('' as Weather);
  const [visibility, setVisibility] = useState<Visibility>('' as Visibility);
  const [comment, setComment] = useState<string>('');

  useEffect(() => {
    getAllEntries().then(data => {
        setEntries(data);
      })
      console.log(Object.values(Visibility))
  }, []);

  const entryCreation = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    const entryToAdd = {
      date:  date, 
      weather:  weather, 
      visibility:  visibility, 
      comment:   comment
    };

    try {
      await createEntry(entryToAdd);
      const data = await getAllEntries();
      
      setEntries(data);
      setDate('');
      setWeather('' as Weather);
      setVisibility('' as Visibility);
      setComment('');
      setErrorMessage(undefined);
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {       
        setErrorMessage(` ${error.response?.data}`); 
      } else {
        console.error(error);
      }
    }
  };

return (

  <div>
    <h2> Add new entry </h2>

    { errorMessage ? <p style = {{ color: "red" }}> { errorMessage } </p> : null };  
      
      <form onSubmit={entryCreation}>
        <div>
          <label >Flight date: </label>
          <input type="date" id="date" name="flight-date" value={date} min="2000-01-01" max="2023-12-31" 
                 onChange={(event) => setDate(event.target.value)}/>
        </div>
        <div>
          Visibility:    
          {Object.values(Visibility).map(visibilityType => (
              <label key = {visibilityType}> {visibilityType} 
                <input type="radio" id={visibilityType} name="contact0" value={visibilityType} 
                  onChange={(event) => setVisibility(event.target.value as Visibility)}/>
              </label>
            ))
          };
        </div>
        <div>
          Weather:
          {Object.values(Weather).map(weatherType => (
              <label key = {weatherType}> {weatherType} 
                <input type="radio" id={weatherType} name="contact1" value={weatherType} 
                  onChange={(event) => setWeather(event.target.value as Weather)}/>
              </label>
            )) 
          };    
        </div>
        <div>
          Comment: <input value={comment} onChange={(event) => setComment(event.target.value)} />
        </div>
        <button type='submit'>add</button>
      </form>
      <EntryList entries = {entries} /> 
  </div>
  ); 
}

export default App;
