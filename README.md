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
const btnAddNote = document.querySelector(".header_container");
const cardsContainer = document.querySelector(".section_container");
const dataHeaderContainer = document.querySelector(".header_container h2");
```

By clicking on the `btnAddNote` button what we are going to do is to add a new note:

```
btnAddNote.addEventListener("click", () => {
  let i = setIdCards();
  newCard = true;

  cardsContainer.innerHTML += `

        <div class="card" id="card-${i}">
            <div class="card_header">
                <button type="button" class="btnEdit"><i class="fa-solid fa-pen-to-square"></i></button>
                <button type="button" class="btnDelete"><i class="fa-solid fa-trash"></i></button>
            </div>

            <div class="card_container">
                <textarea rows="5" cols="2" disabled>Ingrese texto</textarea>
            </div>
        </div>

    `;

  actionAds();
  editCard();
  deleteCard();
  newCard = false;
});
```

The `editCard()` function will allow us to edit the information of a card, the card we click to edit:

```
function editCard() {
  editedCard = true;
  const btnsEdit = document.querySelectorAll(".btnEdit");
  let cardsStorage = getLocalStorage();

  btnsEdit.forEach(function (btnEdit) {
    btnEdit.addEventListener("click", () => {
      let cardId = btnEdit.parentElement.parentElement.id;
      const cardFinalId = cardId.slice(5);

      let cardTextArea =
        btnEdit.parentElement.parentElement.children[1].children[0];
      cardTextArea.disabled = false;

      let cardContainerBtns = btnEdit.parentElement.parentElement.children[0];
      cardContainerBtns.innerHTML += `<button type="button" class="btnFinishEdit">✓</button>`;

      const btnFinishEdit = document.querySelector(".btnFinishEdit");

      btnFinishEdit.addEventListener("click", () => {
        for (let i = 0; i < cardsStorage.length; i++) {
          console.log(cardFinalId, cardsStorage[i].id);
          if (cardFinalId == cardsStorage[i].id) {
            cardsStorage[i].text = cardTextArea.value;
            localStorage.setItem("list", JSON.stringify(cardsStorage));
          }
        }

        cardContainerBtns.children[2].remove();
        cardTextArea.innerHTML = cardTextArea.value;
        cardTextArea.disabled = true;

        actionAds();
        editCard();
        deleteCard();
        editedCard = false;
      });
    });
  });
}
```

The `deleteCard()` function will allow us to delete the card we clicked to delete:

```
function deleteCard() {
  deletedCard = true;
  const btnsDelete = document.querySelectorAll(".btnDelete");
  let cardsStorage = getLocalStorage();

  btnsDelete.forEach(function (btnDelete) {
    btnDelete.addEventListener("click", () => {
      btnDelete.parentElement.parentElement.remove();

      const cardId = btnDelete.parentElement.parentElement.id.slice(5);

      for (let i = 0; i < cardsStorage.length; i++) {
        if (cardId == cardsStorage[i].id) {
          const index = cardsStorage.indexOf(cardsStorage[i]);

          cardsStorage.splice(index, 1);

          localStorage.setItem("list", JSON.stringify(cardsStorage));
        }
      }
      actionAds();
      deletedCard = false;
    });
  });
}
```

The `addCardToLocalStorage()` function will allow us to add a note to the LocalStorage:

```
function addCardToLocalStorage(id, text) {
  let cardsStorage = getLocalStorage();

  const card = { id: id, text: text };

  cardsStorage.push(card);

  localStorage.setItem("list", JSON.stringify(cardsStorage));
}

function getLocalStorage() {
  return localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : [];
}
```

The `setIdCards()` function will allow us to add a unique id to each note we add in the LocalStorage, it will take as id the length of localstorage plus one:

```
function setIdCards() {
  let cardsStorage = getLocalStorage();

  if (cardsStorage == null) {
    let contador = 1;
    contador++;
    addCardToLocalStorage(contador, "Ingrese texto");
    return contador;
  } else {
    let contador = cardsStorage.length;
    contador++;
    addCardToLocalStorage(contador, "Ingrese texto");
    return contador;
  }
}
```

The `loadCardsInLocalStorage()` function will allow us to load all the notes if they exist from LocalStorage:

```
function loadCardsInLocalStorage() {
  let cardsStorage = getLocalStorage();

  for (let i = 0; i < cardsStorage.length; i++) {
    cardsContainer.innerHTML += `

        <div class="card" id="card-${cardsStorage[i].id}">
            <div class="card_header">
                <button type="button" class="btnEdit"><i class="fa-solid fa-pen-to-square"></i></button>
                <button type="button" class="btnDelete"><i class="fa-solid fa-trash"></i></button>
            </div>

            <div class="card_container">
                <textarea rows="5" cols="2" disabled>${cardsStorage[i].text}</textarea>
            </div>
        </div>

    `;
  }

  actionAds();
  editCard();
  deleteCard();
}
```
