# Notes-Page

## Getting Started

1. Clone the repository
2. Join to the correct path of the clone
3. Install LiveServer extension from Visual Studio Code [OPTIONAL]
4. Click in "Go Live" from LiveServer extension

---

1. Clone the repository
2. Join to the correct path of the clone
3. Open index.html in your favorite navigator

---

1. Clone the repository
2. Join to the correct path of the clone
3. Execute: `yarn install`
4. Execute: `yarn dev`

## Description

I made a web page that allows the user to save notes. With the notes you can add a new one, edit an existing one and delete a specific note. Every time the user performs an action an alert will pop up.

## Technologies used

1. Typescript
2. CSS3
3. HTML5

## Portfolio Link

[`https://www.diegolibonati.com.ar/#/project/43`](https://www.diegolibonati.com.ar/#/project/43)

## Video

https://user-images.githubusercontent.com/99032604/199378785-37ec1990-8cdf-47e6-b88d-44fb63787054.mp4

## Documentation

We obtain the elements of the dom that we are going to use to render the information:

```
export const btnAddNote = document.querySelector(
    ".header_container button"
  ) as HTMLButtonElement;
export const cardsContainer = document.querySelector(
    ".section_container"
  ) as HTMLElement;
export const alertH2 = document.querySelector(
    ".header_container h2"
  ) as HTMLHeadingElement;
```

By clicking on the `btnAddNote` button what we are going to do is to add a new note:

```
btnAddNote.addEventListener("click", () => {

  const card = createCard(uuidv4(), "Ingrese texto")

  cardsContainer.append(card)

  addCardToLocalStorage(card.id, card.textContent!)

  handleAlert("1 note has been successfully created ✅");
  
});
```

The `editCard()` function will allow us to edit the information of a card, the card we click to edit:

```
import { getLocalStorage } from "./getLocalStorage";
import { handleAlert } from "./handleAlert";

export const editCard = (e: MouseEvent) => {
  const cards = getLocalStorage();

  const target = e.target as HTMLElement;

  const editButton = target.parentElement;

  const cardContainer = target.parentElement?.parentElement?.parentElement;

  const idCard = cardContainer?.id;

  const cardTextArea = cardContainer?.children[1]
    .children[0] as HTMLTextAreaElement;
  cardTextArea.disabled = false;

  const actionBtnsContainer = cardContainer?.children[0];

  const buttonFinishEdit = document.createElement("button");

  buttonFinishEdit.setAttribute("class", "btnFinishEdit");
  buttonFinishEdit.setAttribute("type", "button");
  buttonFinishEdit.textContent = "X";

  editButton!.style.display = "none"

  buttonFinishEdit.addEventListener("click", () => {
    const newCards = cards.map((card) => {
      if (card.id === idCard) {
        card.text = cardTextArea.value;
      }
      return card;
    });

    localStorage.setItem("list", JSON.stringify(newCards));

    buttonFinishEdit.remove();
    editButton!.style.display = "block"

    cardTextArea.innerHTML = cardTextArea.value;
    cardTextArea.disabled = true;

    handleAlert("1 note has been successfully edited ✅");
  });

  actionBtnsContainer?.append(buttonFinishEdit);
};
```

The `deleteCard()` function will allow us to delete the card we clicked to delete:

```
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
```

The `addCardToLocalStorage()` function will allow us to add a note to the LocalStorage:

```
import { getLocalStorage } from "./getLocalStorage";

export const addCardToLocalStorage = (id: string, text: string): void => {
  const cardsStorage = getLocalStorage();

  const card = { id: id, text: text };

  cardsStorage.push(card);

  localStorage.setItem("list", JSON.stringify(cardsStorage));
};

```

The `loadCards()` function will allow us to load all the notes if they exist from LocalStorage:

```
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
```
