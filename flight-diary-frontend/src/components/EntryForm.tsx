import { useState, useEffect } from 'react';
import axios from 'axios';
import { NonSensitiveDiaryEntry, NewDiaryEntry, DiaryEntry, Weather, Visibility } from '../types';

// interface PropsEntryForm {
//   setNewEntry: (newEntry: NewDiaryEntry | undefined) => ({ entry: DiaryEntry }), 
//   newEntry: NewDiaryEntry, 
//   setEntries: (entries: NonSensitiveDiaryEntry[]) => ({ entries: NonSensitiveDiaryEntry[] }),
//   entries: NonSensitiveDiaryEntry[]
// }

const EntryForm = () => {

  const [date, setDate] = useState<string>('')
  const [weather, setWeather] = useState<Weather>()
  const [visibility, setVisibility] = useState<Visibility>()
  const [comment, setComment] = useState<string>('') 

  const createEntry = (event: React.SyntheticEvent) => {
    event.preventDefault()
    // const entryToAdd = {
    //   id: entries.length + 1,
    //   date: date, 
    //   weather: weather, 
    //   visibility: visibility, 
    //   comment: comment
    // }
    setDate('')
    setWeather(undefined)
    setVisibility(undefined)
    setComment('')
  };

  return (
    <div>
      <form onSubmit={createEntry}>
        <input value={date} onChange={(event) => setDate(event.target.value)} />
        <input value={weather} onChange={(event) => setDate(event.target.value)} />
        <input value={visibility} onChange={(event) => setDate(event.target.value)} />
        <input value={comment} onChange={(event) => setDate(event.target.value)} />
        <button type='submit'>add</button>
      </form>
    </div>    

  )
};

export default EntryForm
