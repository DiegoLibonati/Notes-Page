import { getElements } from "../helpers/getElements";

export const handleSetAlert = (message: string): void => {
  const { alertH2 } = getElements();

  alertH2.textContent = message;
  alertH2.classList.add("show-data");

  setTimeout(() => {
    alertH2.textContent = "";
    alertH2.classList.remove("show-data");
  }, 1000);
};
