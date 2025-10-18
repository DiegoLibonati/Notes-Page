import { v4 as uuidv4 } from "uuid";

import { Note as NoteT } from "@src/entities/app";
import { Note } from "@src/components/Note/Note";

import { getNotesFromLocalStorage } from "@src/helpers/getNotesFromLocalStorage";
import { setLocalStorage } from "@src/helpers/setLocalStorage";
import { setAlert } from "@src/helpers/setAlert";

import { LOCAL_STORAGE_NOTES_KEY } from "@src/constants/vars";

import "@src/pages/NotesPage/NotesPage.css";

const handleEditNote = (e: MouseEvent, id: string) => {
  const target = e.target as HTMLButtonElement;
  const note = document.querySelector<HTMLDivElement>(`#${CSS.escape(id)}`);
  const notes = getNotesFromLocalStorage();

  const cardTextArea = note?.children[1].children[0] as HTMLTextAreaElement;
  cardTextArea.disabled = false;
  const actionBtnsContainer = note?.children[0];

  const buttonFinishEdit = document.createElement("button");

  buttonFinishEdit.className = "note__header-btn note__header-btn-edit-finish";
  buttonFinishEdit.type = "button";
  buttonFinishEdit.textContent = "X";
  buttonFinishEdit.setAttribute("aria-label", "finish edit");

  target!.style.display = "none";

  buttonFinishEdit.addEventListener("click", () => {
    const newCards = notes
      ? notes!.map((note) => {
          if (note.id === id) {
            note.text = cardTextArea.value;
          }
          return note;
        })
      : [];

    setLocalStorage<NoteT[]>(LOCAL_STORAGE_NOTES_KEY, newCards);

    buttonFinishEdit.remove();
    target!.style.display = "block";

    cardTextArea.innerHTML = cardTextArea.value;
    cardTextArea.disabled = true;

    setAlert("1 note has been successfully edited ✅");
  });

  actionBtnsContainer?.append(buttonFinishEdit);
};

const handleDeleteNote = (_: MouseEvent, id: string) => {
  const notes = getNotesFromLocalStorage();
  const note = document.querySelector<HTMLDivElement>(`#${CSS.escape(id)}`);

  note?.remove();

  const newCards = notes ? notes!.filter((note) => note.id !== id) : [];

  setLocalStorage<NoteT[]>(LOCAL_STORAGE_NOTES_KEY, newCards);

  setAlert("1 note has been successfully deleted ✅");
};

const handleAddNote = () => {
  const notes = document.querySelector<HTMLElement>(".notes");

  const note: NoteT = {
    id: uuidv4(),
    text: "Ingrese texto",
  };

  const noteComponent = Note({
    id: note.id,
    children: note.text,
    onClickDelete: handleDeleteNote,
    onClickEdit: handleEditNote,
  });

  const notesLocalStorage = getNotesFromLocalStorage();

  notes!.append(noteComponent);

  setLocalStorage<NoteT[]>(
    LOCAL_STORAGE_NOTES_KEY,
    notesLocalStorage ? [...notesLocalStorage, note] : [note]
  );

  setAlert("1 note has been successfully created ✅");
};

export const NotesPage = (): HTMLElement => {
  const main = document.createElement("main");
  main.className = "notes-page";

  main.innerHTML = `
    <section class="notes"></section>
  `;

  const notes = main.querySelector<HTMLElement>(".notes");
  const btnAddNote =
    document.querySelector<HTMLButtonElement>(".header__btn-add");

  btnAddNote?.addEventListener("click", handleAddNote);

  getNotesFromLocalStorage().forEach((note) => {
    const noteComponent = Note({
      id: note.id,
      children: note.text,
      onClickDelete: handleDeleteNote,
      onClickEdit: handleEditNote,
    });

    notes?.append(noteComponent);
  });

  return main;
};
