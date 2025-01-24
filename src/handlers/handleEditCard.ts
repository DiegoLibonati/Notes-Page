import { Card } from "../entities/vite-env";

import { handleSetAlert } from "./handleSetAlert";
import { setLocalStorage } from "../helpers/setLocalStorage";
import { getCardsFromLocalStorage } from "../helpers/getCardsFromLocalStorage";

import { LOCAL_STORAGE_CARDS_KEY } from "../constants/constants";

export const handleEditCard = (e: MouseEvent) => {
  const cards = getCardsFromLocalStorage();

  const target = e.currentTarget as HTMLButtonElement;

  const cardContainer = target.parentElement?.parentElement;

  const idCard = cardContainer?.id;

  const cardTextArea = cardContainer?.children[1]
    .children[0] as HTMLTextAreaElement;
  cardTextArea.disabled = false;

  const actionBtnsContainer = cardContainer?.children[0];

  const buttonFinishEdit = document.createElement("button");

  buttonFinishEdit.setAttribute("class", "card__header-btn card__header-btn-edit-finish");
  buttonFinishEdit.setAttribute("type", "button");
  buttonFinishEdit.setAttribute("aria-label", "finish edit");
  buttonFinishEdit.textContent = "X";

  target!.style.display = "none";

  buttonFinishEdit.addEventListener("click", () => {
    const newCards = cards
      ? cards!.map((card) => {
          if (card.id === idCard) {
            card.text = cardTextArea.value;
          }
          return card;
        })
      : [];

    setLocalStorage<Card[]>(LOCAL_STORAGE_CARDS_KEY, newCards);

    buttonFinishEdit.remove();
    target!.style.display = "block";

    cardTextArea.innerHTML = cardTextArea.value;
    cardTextArea.disabled = true;

    handleSetAlert("1 note has been successfully edited ✅");
  });

  actionBtnsContainer?.append(buttonFinishEdit);
};
