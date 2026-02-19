let currentAlertTimeout: number | null = null;

export const setAlert = (message: string): void => {
  const alertH2 = document.querySelector<HTMLHeadingElement>(".header__alert");

  if (!alertH2) return;

  if (currentAlertTimeout !== null) {
    clearTimeout(currentAlertTimeout);
    currentAlertTimeout = null;
  }

  alertH2.textContent = message;
  alertH2.classList.add("header__alert--show");

  currentAlertTimeout = setTimeout(() => {
    alertH2.textContent = "";
    alertH2.classList.remove("header__alert--show");
    currentAlertTimeout = null;
  }, 1000);
};

export const clearAlert = (): void => {
  if (currentAlertTimeout !== null) {
    clearTimeout(currentAlertTimeout);
    currentAlertTimeout = null;
  }

  const alertH2 = document.querySelector<HTMLHeadingElement>(".header__alert");
  if (alertH2) {
    alertH2.textContent = "";
    alertH2.classList.remove("header__alert--show");
  }
};
