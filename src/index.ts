import { handleCreateCard } from "@src/handlers/handleCreateCard";
import { handleSetAlert } from "@src/handlers/handleSetAlert";
import { handleAddCart } from "@src/handlers/handleAddCart";

import { getCardsFromLocalStorage } from "@src/helpers/getCardsFromLocalStorage";
import { getElements } from "@src/helpers/getElements";

export const loadCards = (): void => {
  const { cardsContainer } = getElements();
  const cards = getCardsFromLocalStorage();

  cardsContainer.innerHTML = "";

  cards.forEach((card) =>
    cardsContainer.append(handleCreateCard(card.id, card.text))
  );

  handleSetAlert(`${cards.length} notes were loaded ✅`);
};

const onInit = () => {
  const { btnAddNote } = getElements();

  loadCards();

  btnAddNote.addEventListener("click", handleAddCart);
};

document.addEventListener("DOMContentLoaded", onInit);
