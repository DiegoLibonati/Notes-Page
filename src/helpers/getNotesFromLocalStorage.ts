import type { Note } from "@/types/app";

import { getLocalStorage } from "@/helpers/getLocalStorage";

import { LOCAL_STORAGE_NOTES_KEY } from "@/constants/vars";

export const getNotesFromLocalStorage = (): Note[] => {
  const notes = getLocalStorage(LOCAL_STORAGE_NOTES_KEY) as Note[] | null;

  return notes ?? [];
};
