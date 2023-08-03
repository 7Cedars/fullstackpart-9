// import React, { createContext, useContext, useState } from "react";
// import { IEntriesContext, DiaryEntry, IProviderProps, NonSensitiveDiaryEntry, NewDiaryEntry, Weather, Visibility } from '../types'

// // https://stackoverflow.com/questions/58193424/passing-state-with-usecontext-in-typescript 
// const appDefaultValue = {
//   entries: 
//     [{
//       id: 0,
//       date: "2001-01-01",
//       weather: "rainy" as Weather,
//       visibility: "poor" as Visibility
//     }],
//   setEntries: () => {[]}
// };

// export const AppContext = createContext(appDefaultValue);

// export const EntriesProvider = (props: IProviderProps) => {
//   const [entries, setEntries] = useState(appDefaultValue.entries);

//   return (
//     // memoize `value` to optimize performance, if AppProvider is re-rendered often 
//     <AppContext.Provider value={{ entries, setEntries }}>
//       {props.children}
//     </AppContext.Provider>
//   );
// };

export {} 