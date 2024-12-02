export const getElements = () => ({
  btnAddNote: document.querySelector(
    ".header_container button"
  ) as HTMLButtonElement,
  cardsContainer: document.querySelector(".section_container") as HTMLElement,
  alertH2: document.querySelector(".header_container h2") as HTMLHeadingElement,
});
