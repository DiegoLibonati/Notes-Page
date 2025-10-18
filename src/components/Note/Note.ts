import { NoteProps } from "@src/entities/props";

import "@src/components/Note/Note.css";

export const Note = ({
  id,
  children,
  onClickDelete,
  onClickEdit,
}: NoteProps): HTMLDivElement => {
  const divRoot = document.createElement("div");
  divRoot.className = "note";
  divRoot.id = id;

  divRoot.innerHTML = `
    <div class="note__header">
        <button type="button" class="note__header-btn note__header-btn-edit" aria-label="button edit">
            <i class="fa-solid fa-pen-to-square"></i>
        </button>
        <button type="button" class="note__header-btn note__header-btn-delete" aria-label="button delete">
            <i class="fa-solid fa-trash"></i>
        </button>
    </div>

    <div class="note__content">
        <textarea rows="5" cols="2" disabled="true" class="note__textarea">${children}</textarea>
    </div>
  `;

  const noteBtnEdit = divRoot.querySelector<HTMLButtonElement>(
    ".note__header-btn-edit"
  );
  const noteBtnDelete = divRoot.querySelector<HTMLButtonElement>(
    ".note__header-btn-delete"
  );

  noteBtnEdit?.addEventListener("click", (e) => onClickEdit(e, id));
  noteBtnDelete?.addEventListener("click", (e) => onClickDelete(e, id));

  return divRoot;
};
