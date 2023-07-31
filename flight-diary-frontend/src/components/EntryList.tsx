import { NonSensitiveDiaryEntry } from '../types';

interface PropsEntries {
  entries: NonSensitiveDiaryEntry[] 
}

const EntryList = ({ entries } : PropsEntries ) => {
  
  console.log("Entries: ", entries); 

  console.log("Entries Rendered: ", entries); 
    return (
      <> 
      <h1> Diary Entries </h1>
      { entries.map((entry: NonSensitiveDiaryEntry) => (
          <>
            <h3> {entry.date} </h3>
            <div> visibility: {entry.visibility}  </div>
            <div> weather: {entry.weather}  </div>
          </>
          )
      )} 
      </>
    )
  
};

export default EntryList;
