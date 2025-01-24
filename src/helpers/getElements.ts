export const getElements = () => ({
  btnAddNote: document.querySelector(
    ".header__add"
  ) as HTMLButtonElement,
  cardsContainer: document.querySelector(".cards") as HTMLElement,
  alertH2: document.querySelector(".header__alert") as HTMLHeadingElement,
});
