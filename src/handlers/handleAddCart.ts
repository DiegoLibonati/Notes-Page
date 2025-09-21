import { v4 as uuidv4 } from "uuid";

import { Card } from "@src/entities/vite-env";

import { handleCreateCard } from "@src/handlers/handleCreateCard";
import { handleSetAlert } from "@src/handlers/handleSetAlert";

import { setLocalStorage } from "@src/helpers/setLocalStorage";
import { getCardsFromLocalStorage } from "@src/helpers/getCardsFromLocalStorage";
import { getElements } from "@src/helpers/getElements";

import { LOCAL_STORAGE_CARDS_KEY } from "@src/constants/constants";

export const handleAddCart = () => {
  const { cardsContainer } = getElements();

  const cardElement = handleCreateCard(uuidv4(), "Ingrese texto");
  const cards = getCardsFromLocalStorage();

  cardsContainer.append(cardElement);

  const card = { id: cardElement.id!, text: cardElement.textContent! };

  setLocalStorage<Card[]>(
    LOCAL_STORAGE_CARDS_KEY,
    cards ? [...cards, card] : [card]
  );

  handleSetAlert("1 note has been successfully created ✅");
};
