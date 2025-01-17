import { getElements } from "../helpers/getElements";

export const handleSetAlert = (message: string): void => {
  const { alertH2 } = getElements();

  alertH2.textContent = message;
  alertH2.classList.add("alert--show");

  setTimeout(() => {
    alertH2.textContent = "";
    alertH2.classList.remove("alert--show");
  }, 1000);
};
