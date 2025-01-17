export const getElements = () => ({
  btnAddNote: document.querySelector(
    ".header button"
  ) as HTMLButtonElement,
  cardsContainer: document.querySelector(".cards") as HTMLElement,
  alertH2: document.querySelector(".header h2") as HTMLHeadingElement,
});
