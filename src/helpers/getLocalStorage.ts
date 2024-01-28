import { Card } from "../vite-env";

export const getLocalStorage = (): Card[] => {
  return localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list")!)
    : [];
};
