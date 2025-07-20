import type { NewNoteData, Note } from "../types/note";
import axios from "axios";

const myKey = import.meta.env.VITE_NOTEHUB_TOKEN;
const BASE_URL = "https://notehub-public.goit.study/api";

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  page: number,
  perPage: number,
  search: string = ""
): Promise<FetchNotesResponse> => {
  const response = await axios.get<FetchNotesResponse>(`${BASE_URL}/notes`, {
    params: {
      page,
      perPage,
      ...(search.trim() ? { search } : {}),
    },
    headers: {
      Authorization: `Bearer ${myKey}`,
    },
  });

  return response.data;
};

export const createNote = async (noteData: NewNoteData): Promise<Note> => {
  const response = await axios.post<Note>(`${BASE_URL}/notes`, noteData, {
    headers: {
      Authorization: `Bearer ${myKey}`,
    },
  });

  return response.data;
};

export const deleteNote = async (noteId: number): Promise<Note> => {
  const response = await axios.delete<Note>(`${BASE_URL}/notes/${noteId}`, {
    headers: {
      Authorization: `Bearer ${myKey}`,
    },
  });
  return response.data;
};
