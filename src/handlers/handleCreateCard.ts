import { handleDeleteCard } from "./handleDeleteCard";
import { handleEditCard } from "./handleEditCard";

export const handleCreateCard = (id: string, text: string): HTMLElement => {
  const parent = document.createElement("article");

  parent.setAttribute("class", "card");
  parent.setAttribute("id", id);

  const cardHeader = document.createElement("div");

  cardHeader.setAttribute("class", "card__header");

  const buttonEdit = document.createElement("button");
  const buttonDelete = document.createElement("button");

  buttonEdit.setAttribute("type", "button");
  buttonDelete.setAttribute("type", "button");

  buttonEdit.setAttribute("class", "card__btn__edit");
  buttonDelete.setAttribute("class", "card__btn__delete");

  buttonEdit.setAttribute("aria-label", "button edit");
  buttonDelete.setAttribute("aria-label", "button delete");

  buttonEdit.addEventListener("click", (e) => handleEditCard(e));
  buttonDelete.addEventListener("click", (e) => handleDeleteCard(e));

  const iconEdit = document.createElement("i");
  const iconDelete = document.createElement("i");

  iconEdit.setAttribute("class", "fa-solid fa-pen-to-square");
  iconDelete.setAttribute("class", "fa-solid fa-trash");

  buttonEdit.append(iconEdit);
  buttonDelete.append(iconDelete);

  cardHeader.append(buttonEdit);
  cardHeader.append(buttonDelete);

  const cardContent = document.createElement("div");

  cardContent.setAttribute("class", "card__content");

  const textArea = document.createElement("textarea");
  textArea.rows = 5;
  textArea.cols = 2;
  textArea.disabled = true;
  textArea.textContent = text;

  cardContent.append(textArea);

  parent.append(cardHeader);
  parent.append(cardContent);

  return parent;
};
