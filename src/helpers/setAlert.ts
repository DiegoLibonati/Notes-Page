export const setAlert = (message: string): void => {
  const alertH2 = document.querySelector<HTMLHeadingElement>(".header__alert");

  alertH2!.textContent = message;
  alertH2!.classList.add("header__alert--show");

  setTimeout(() => {
    alertH2!.textContent = "";
    alertH2!.classList.remove("header__alert--show");
  }, 1000);
};
