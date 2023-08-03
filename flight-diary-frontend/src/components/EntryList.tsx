import { NonSensitiveDiaryEntry, PropsEntries } from '../types';

const EntryList = ({ entries } : PropsEntries ) => {
  
    return (
      <> 
      <h2> Diary entries </h2>
      { entries.map((entry: NonSensitiveDiaryEntry) => (
          <div key = {entry.id}>
            <h3> {entry.date} </h3>
            <div> visibility: {entry.visibility}  </div>
            <div> weather: {entry.weather}  </div>
          </div>
        ))
      }  
      </>
    )
};

export default EntryList;
