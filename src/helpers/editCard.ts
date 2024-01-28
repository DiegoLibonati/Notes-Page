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
