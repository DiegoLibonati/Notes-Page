import { Note } from "@src/entities/app";

import { getLocalStorage } from "@src/helpers/getLocalStorage";

import { LOCAL_STORAGE_NOTES_KEY } from "@src/constants/vars";

export const getNotesFromLocalStorage = (): Note[] => {
  const notes = getLocalStorage<Note[]>(LOCAL_STORAGE_NOTES_KEY);

  return notes ? notes : [];
};
