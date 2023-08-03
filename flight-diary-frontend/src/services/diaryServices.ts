import axios from "axios";
import { NonSensitiveDiaryEntry, NewDiaryEntry } from "../types";

const baseUrl = 'http://localhost:3001/api/diaries/'

export const getAllEntries = async () => {
  return axios
    .get<NonSensitiveDiaryEntry[]>(baseUrl)
    .then(response => response.data);
};

export const createEntry = async (entryToAdd: NewDiaryEntry) => {
  try {
    const response = axios.post<NewDiaryEntry>(baseUrl, entryToAdd ) 
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("THIS IS AN ERROR!", error.status)
      return "this is an error"
      // console.error(error.response);
      // Do something with this error...
    } else {
      console.log("THIS IS AN ERROR!", error)
      // console.error(error);
    }
  }
}; 
