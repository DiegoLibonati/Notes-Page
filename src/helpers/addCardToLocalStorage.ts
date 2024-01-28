import { getLocalStorage } from "./getLocalStorage";

export const addCardToLocalStorage = (id: string, text: string): void => {
  const cardsStorage = getLocalStorage();

  const card = { id: id, text: text };

  cardsStorage.push(card);

  localStorage.setItem("list", JSON.stringify(cardsStorage));
};
