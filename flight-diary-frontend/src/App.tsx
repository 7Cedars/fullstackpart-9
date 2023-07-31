import { useState, useEffect } from 'react';
import axios from 'axios';
import { NonSensitiveDiaryEntry, NewDiaryEntry, Weather, Visibility } from './types';
import EntryList from './components/EntryList';

const App = () => {
  
  useEffect(() => {
    axios.get<NonSensitiveDiaryEntry[]>('http://localhost:3001/api/diaries/')
      .then(response => {
        setEntries(response.data);
      })
  }, [])
  
  const [newEntry, setNewEntry] = useState<NewDiaryEntry>();
  const [entries, setEntries] = useState<NonSensitiveDiaryEntry[]>([
    {
    id: 0,
    date: "2001-01-01",
    weather: "rainy" as Weather,
    visibility: "poor" as Visibility
    }
  ]); 

return (
  <div>
    <EntryList entries = {entries}  /> 
    {/* <ul>
      {entries.map(entry =>
        <li key={entry.id}>{entry.date}</li>
      )}
    </ul> */}
  </div>
)

}

export default App;
