import { useState, useEffect} from 'react';
import axios from 'axios';
import { NonSensitiveDiaryEntry, Weather, Visibility, NewDiaryEntry } from './types';
import EntryList from './components/EntryList';
import { getAllEntries, createEntry } from './services/diaryServices';
// import EntryForm from './components/EntryForm';

const App = () => {
  
  const [entries, setEntries] = useState<NonSensitiveDiaryEntry[] >([]); 
  const [date, setDate] = useState<string>('')
  const [weather, setWeather] = useState<Weather>('' as Weather)
  const [visibility, setVisibility] = useState<Visibility>('' as Visibility)
  const [comment, setComment] = useState<string>('') 

  useEffect(() => {
    getAllEntries().then(data => {
        setEntries(data);
      })
  }, []);

  const entryCreation = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    const entryToAdd = {
      date:  date, 
      weather:  weather, 
      visibility:  visibility, 
      comment:   comment
    }
    
    await createEntry(entryToAdd) 
    await getAllEntries().then(data => {
      setEntries(data);
    })

    setDate('')
    setWeather('' as Weather)
    setVisibility('' as Visibility)
    setComment('')
  };

return (
  <div>
    <h2> Add new entry </h2>
      <form onSubmit={entryCreation}>
        <div>
          Date: <input value={date} onChange={(event) => setDate(event.target.value)} />
        </div>
        <div>
          Visibility: <input value={visibility} onChange={(event) => setVisibility(event.target.value as Visibility)} />
        </div>
        <div>
          Weather: <input value={weather} onChange={(event) => setWeather(event.target.value as Weather)} />
        </div>

        <div>
          Comment: <input value={comment} onChange={(event) => setComment(event.target.value)} />
        </div>
        <button type='submit'>add</button>
      </form>

      <EntryList entries = {entries} /> 
      {/* <EntryForm />  */}
    {/* </EntriesContext.Provider> */}
  </div>
  ); 
}

export default App;
