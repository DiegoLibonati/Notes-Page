import { alertH2 } from "../constants/elements";

export const handleSetAlert = (message: string): void => {
  alertH2.textContent = message;
  alertH2.classList.add("show-data");

  setTimeout(() => {
    alertH2.textContent = "";
    alertH2.classList.remove("show-data");
  }, 1000);
};
