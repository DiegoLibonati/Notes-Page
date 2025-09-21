import { Card } from "@src/entities/vite-env";

import { handleSetAlert } from "@src/handlers/handleSetAlert";
import { setLocalStorage } from "@src/helpers/setLocalStorage";
import { getCardsFromLocalStorage } from "@src/helpers/getCardsFromLocalStorage";

import { LOCAL_STORAGE_CARDS_KEY } from "@src/constants/constants";

export const handleDeleteCard = (e: MouseEvent) => {
  const cards = getCardsFromLocalStorage();

  const target = e.currentTarget as HTMLButtonElement;

  const cardContainer = target.parentElement?.parentElement;

  cardContainer?.remove();

  const idCard = cardContainer?.id;

  const newCards = cards ? cards!.filter((card) => card.id !== idCard) : [];

  setLocalStorage<Card[]>(LOCAL_STORAGE_CARDS_KEY, newCards);

  handleSetAlert("1 note has been successfully deleted ✅");
};
