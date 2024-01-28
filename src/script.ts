import { btnAddNote, cardsContainer } from "./elements";
import { addCardToLocalStorage } from "./helpers/addCardToLocalStorage";
import { createCard } from "./helpers/createCard";
import { handleAlert } from "./helpers/handleAlert";
import { loadCards } from "./helpers/loadCards";
import {v4 as uuidv4} from "uuid"

btnAddNote.addEventListener("click", () => {

  const card = createCard(uuidv4(), "Ingrese texto")

  cardsContainer.append(card)

  addCardToLocalStorage(card.id, card.textContent!)

  handleAlert("1 note has been successfully created ✅");
  
});

loadCards()