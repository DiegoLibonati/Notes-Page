import { v4 as uuidv4 } from "uuid";

import { Card } from "../entities/vite-env";

import { handleCreateCard } from "./handleCreateCard";
import { handleSetAlert } from "./handleSetAlert";

import { setLocalStorage } from "../helpers/setLocalStorage";
import { getCardsFromLocalStorage } from "../helpers/getCardsFromLocalStorage";
import { getElements } from "../helpers/getElements";

import { LOCAL_STORAGE_CARDS_KEY } from "../constants/constants";

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
