import { getLocalStorage } from "./getLocalStorage";
import { handleAlert } from "./handleAlert";

export const deleteCard = (e: MouseEvent) => {
  const cards = getLocalStorage();

  const target = e.target as HTMLElement;

  const cardContainer = target.parentElement?.parentElement?.parentElement

  cardContainer?.remove();

  const idCard = cardContainer?.id;

  const newCards = cards.filter((card) => card.id !== idCard);

  localStorage.setItem("list", JSON.stringify(newCards));

  handleAlert("1 note has been successfully deleted ✅");
};
