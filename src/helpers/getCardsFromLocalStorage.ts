import { Card } from "@src/entities/vite-env";

import { getLocalStorage } from "@src/helpers/getLocalStorage";

import { LOCAL_STORAGE_CARDS_KEY } from "@src/constants/constants";

export const getCardsFromLocalStorage = (): Card[] => {
  const cards = getLocalStorage<Card[]>(LOCAL_STORAGE_CARDS_KEY);

  return cards ? cards : [];
};
