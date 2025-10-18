import { NotesPage } from "@src/pages/NotesPage/NotesPage";

const onInit = () => {
  const app = document.querySelector<HTMLDivElement>("#app")!;
  const notesPage = NotesPage();
  app.appendChild(notesPage);
};

document.addEventListener("DOMContentLoaded", onInit);
