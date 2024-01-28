import { alertH2 } from "../elements";

export const handleAlert = (
  message: string
): void => {
  alertH2.textContent = message;
  alertH2.classList.add("show-data");

  setTimeout(() => {
    alertH2.classList.remove("show-data");
  }, 1000);
};
