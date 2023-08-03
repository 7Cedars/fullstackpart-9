export enum Weather {
  Sunny = 'sunny',
  Rainy = 'rainy',
  Cloudy = 'cloudy',
  Stormy = 'stormy',
  Windy = 'windy',
}

export enum Visibility {
  Great = 'great',
  Good = 'good',
  Ok = 'ok',
  Poor = 'poor',
}

export interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment: string;
}

// export type IEntriesContext = {
//   // setNewEntry: (newEntry: NewDiaryEntry | undefined) => ({ entry: DiaryEntry }), 
//   // newEntry: NewDiaryEntry, 
//   entries: NonSensitiveDiaryEntry[] | null 
//   setEntries: (entries: NonSensitiveDiaryEntry[]) => ({ entries: NonSensitiveDiaryEntry[] | void }),
  
// }

// export interface IProviderProps {
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   children?: any;
// }

export type NewDiaryEntry = Omit<DiaryEntry, 'id'>;

export type NonSensitiveDiaryEntry = Omit<DiaryEntry, 'comment'>;

export default "default"