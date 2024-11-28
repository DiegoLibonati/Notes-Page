import { Card } from "../entities/vite-env";

import { getLocalStorage } from "./getLocalStorage";

import { LOCAL_STORAGE_CARDS_KEY } from "../constants/constants";

export const getCardsFromLocalStorage = (): Card[] => {
  const cards = getLocalStorage<Card[]>(LOCAL_STORAGE_CARDS_KEY);

  return cards ? cards : [];
};
