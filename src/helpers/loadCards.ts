import { cardsContainer } from "../elements";
import { createCard } from "./createCard";
import { getLocalStorage } from "./getLocalStorage";
import { handleAlert } from "./handleAlert";

export const loadCards = (): void => {
  const cards = getLocalStorage();

  cardsContainer.innerHTML = "";

  cards.forEach((card) => {
    cardsContainer.append(createCard(card.id, card.text));
  });

  handleAlert(`${cards.length} notes were loaded ✅`)

  return;
};
