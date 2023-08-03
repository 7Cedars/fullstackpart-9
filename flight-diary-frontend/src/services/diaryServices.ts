import axios from "axios";
import { NonSensitiveDiaryEntry, NewDiaryEntry } from "../types";

const baseUrl = 'http://localhost:3001/api/diaries/'

export const getAllEntries = async () => {
  return axios
    .get<NonSensitiveDiaryEntry[]>(baseUrl)
    .then(response => response.data);
};

export const createEntry = async (entryToAdd: NewDiaryEntry) => {
  return axios
    .post<NewDiaryEntry>(baseUrl, entryToAdd ) 
    .then(response => response.data);
}; 
