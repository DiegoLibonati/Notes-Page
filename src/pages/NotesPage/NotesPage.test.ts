import { screen, waitFor } from "@testing-library/dom";
import user from "@testing-library/user-event";

import { Note } from "@src/entities/app";

import { NotesPage } from "@src/pages/NotesPage/NotesPage";

import { getNotesFromLocalStorage } from "@src/helpers/getNotesFromLocalStorage";
import { setLocalStorage } from "@src/helpers/setLocalStorage";
import { setAlert } from "@src/helpers/setAlert";

type RenderComponent = {
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const btnAddNote = document.createElement("button");
  btnAddNote.className = "header__btn-add";
  document.body.appendChild(btnAddNote);

  const container = NotesPage();
  document.body.appendChild(container);
  return { container: container };
};

const mockNotes: Note[] = [
  { id: "note-1", text: "First note content" },
  { id: "note-2", text: "Second note content" },
];

jest.mock("uuid", () => ({
  v4: jest.fn(() => "test-uuid-123"),
}));

jest.mock("@src/helpers/getNotesFromLocalStorage");
jest.mock("@src/helpers/setLocalStorage");
jest.mock("@src/helpers/setAlert");

describe("NotesPage.ts", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (getNotesFromLocalStorage as jest.Mock).mockReturnValue([]);
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  describe("General Tests.", () => {
    test("It should render the main component structure", () => {
      const { container } = renderComponent();

      expect(container).toBeInstanceOf(HTMLElement);
      expect(container.className).toBe("notes-page");
    });

    test("It should render notes section", () => {
      renderComponent();

      const notesSection = document.querySelector(".notes");

      expect(notesSection).toBeInTheDocument();
      expect(notesSection?.tagName).toBe("SECTION");
    });

    test("It should call getNotesFromLocalStorage on render", () => {
      renderComponent();

      expect(getNotesFromLocalStorage).toHaveBeenCalled();
    });
  });

  describe("Initial Notes Rendering Tests.", () => {
    test("It should render existing notes from localStorage", () => {
      (getNotesFromLocalStorage as jest.Mock).mockReturnValue(mockNotes);

      renderComponent();

      const note1 = document.getElementById("note-1");
      const note2 = document.getElementById("note-2");

      expect(note1).toBeInTheDocument();
      expect(note2).toBeInTheDocument();
    });

    test("It should render notes with correct content", () => {
      (getNotesFromLocalStorage as jest.Mock).mockReturnValue(mockNotes);

      renderComponent();

      const textareas =
        document.querySelectorAll<HTMLTextAreaElement>(".note__textarea");

      expect(textareas[0].value).toBe("First note content");
      expect(textareas[1].value).toBe("Second note content");
    });

    test("It should render no notes when localStorage is empty", () => {
      (getNotesFromLocalStorage as jest.Mock).mockReturnValue([]);

      renderComponent();

      const notes = document.querySelectorAll(".note");

      expect(notes.length).toBe(0);
    });

    test("It should append notes to notes section", () => {
      (getNotesFromLocalStorage as jest.Mock).mockReturnValue(mockNotes);

      renderComponent();

      const notesSection = document.querySelector(".notes");
      const notesInSection = notesSection?.querySelectorAll(".note");

      expect(notesInSection?.length).toBe(mockNotes.length);
    });
  });

  describe("Add Note Tests.", () => {
    test("It should add a new note when clicking add button", async () => {
      renderComponent();

      const btnAddNote =
        document.querySelector<HTMLButtonElement>(".header__btn-add");

      await user.click(btnAddNote!);

      const notes = document.querySelectorAll(".note");

      expect(notes.length).toBe(1);
    });

    test("It should create note with uuid", async () => {
      renderComponent();

      const btnAddNote =
        document.querySelector<HTMLButtonElement>(".header__btn-add");

      await user.click(btnAddNote!);

      const note = document.getElementById("test-uuid-123");

      expect(note).toBeInTheDocument();
    });

    test("It should create note with default text", async () => {
      renderComponent();

      const btnAddNote =
        document.querySelector<HTMLButtonElement>(".header__btn-add");

      await user.click(btnAddNote!);

      const textarea =
        document.querySelector<HTMLTextAreaElement>(".note__textarea");

      expect(textarea?.value).toBe("Ingrese texto");
    });

    test("It should save note to localStorage", async () => {
      renderComponent();

      const btnAddNote =
        document.querySelector<HTMLButtonElement>(".header__btn-add");

      await user.click(btnAddNote!);

      expect(setLocalStorage).toHaveBeenCalledWith("notes", [
        { id: "test-uuid-123", text: "Ingrese texto" },
      ]);
    });

    test("It should show success alert when adding note", async () => {
      renderComponent();

      const btnAddNote =
        document.querySelector<HTMLButtonElement>(".header__btn-add");

      await user.click(btnAddNote!);

      expect(setAlert).toHaveBeenCalledWith(
        "1 note has been successfully created ✅"
      );
    });

    test("It should add multiple notes", async () => {
      renderComponent();

      const btnAddNote =
        document.querySelector<HTMLButtonElement>(".header__btn-add");

      await user.click(btnAddNote!);
      await user.click(btnAddNote!);

      const notes = document.querySelectorAll(".note");

      expect(notes.length).toBe(2);
    });
  });

  describe("Delete Note Tests.", () => {
    test("It should delete note when clicking delete button", async () => {
      (getNotesFromLocalStorage as jest.Mock).mockReturnValue(mockNotes);

      renderComponent();

      const deleteButtons = screen.getAllByRole("button", {
        name: /button delete/i,
      });

      await user.click(deleteButtons[0]);

      const note1 = document.getElementById("note-1");

      expect(note1).not.toBeInTheDocument();
    });

    test("It should remove note from DOM", async () => {
      (getNotesFromLocalStorage as jest.Mock).mockReturnValue(mockNotes);

      renderComponent();

      const initialNotes = document.querySelectorAll(".note");
      expect(initialNotes.length).toBe(2);

      const deleteButtons = screen.getAllByRole("button", {
        name: /button delete/i,
      });

      await user.click(deleteButtons[0]);

      const remainingNotes = document.querySelectorAll(".note");
      expect(remainingNotes.length).toBe(1);
    });

    test("It should update localStorage when deleting note", async () => {
      (getNotesFromLocalStorage as jest.Mock).mockReturnValue(mockNotes);

      renderComponent();

      const deleteButtons = screen.getAllByRole("button", {
        name: /button delete/i,
      });

      await user.click(deleteButtons[0]);

      expect(setLocalStorage).toHaveBeenCalledWith("notes", [
        { id: "note-2", text: "Second note content" },
      ]);
    });

    test("It should show success alert when deleting note", async () => {
      (getNotesFromLocalStorage as jest.Mock).mockReturnValue(mockNotes);

      renderComponent();

      const deleteButtons = screen.getAllByRole("button", {
        name: /button delete/i,
      });

      await user.click(deleteButtons[0]);

      expect(setAlert).toHaveBeenCalledWith(
        "1 note has been successfully deleted ✅"
      );
    });

    test("It should handle deleting all notes", async () => {
      (getNotesFromLocalStorage as jest.Mock).mockReturnValue(mockNotes);

      renderComponent();

      const deleteButtons = screen.getAllByRole("button", {
        name: /button delete/i,
      });

      await user.click(deleteButtons[0]);

      const remainingDeleteButtons = screen.getAllByRole("button", {
        name: /button delete/i,
      });
      await user.click(remainingDeleteButtons[0]);

      const notes = document.querySelectorAll(".note");
      expect(notes.length).toBe(0);
    });
  });

  describe("Edit Note Tests.", () => {
    test("It should enable textarea when clicking edit button", async () => {
      (getNotesFromLocalStorage as jest.Mock).mockReturnValue(mockNotes);

      renderComponent();

      const editButtons = screen.getAllByRole("button", {
        name: /button edit/i,
      });
      const textarea =
        document.querySelectorAll<HTMLTextAreaElement>(".note__textarea")[0];

      expect(textarea.disabled).toBe(true);

      await user.click(editButtons[0]);

      expect(textarea.disabled).toBe(false);
    });

    test("It should hide edit button and show finish button", async () => {
      (getNotesFromLocalStorage as jest.Mock).mockReturnValue(mockNotes);

      renderComponent();

      const editButtons = screen.getAllByRole("button", {
        name: /button edit/i,
      });

      await user.click(editButtons[0]);

      const finishButton = screen.getByRole("button", { name: /finish edit/i });

      expect(finishButton).toBeInTheDocument();
      expect((editButtons[0] as HTMLButtonElement).style.display).toBe("none");
    });

    test("It should create finish edit button with correct attributes", async () => {
      (getNotesFromLocalStorage as jest.Mock).mockReturnValue(mockNotes);

      renderComponent();

      const editButtons = screen.getAllByRole("button", {
        name: /button edit/i,
      });

      await user.click(editButtons[0]);

      const finishButton = screen.getByRole("button", { name: /finish edit/i });

      expect(finishButton).toHaveClass("note__header-btn");
      expect(finishButton).toHaveClass("note__header-btn-edit-finish");
      expect(finishButton.getAttribute("type")).toBe("button");
      expect(finishButton.textContent).toBe("X");
    });

    test("It should save edited note when clicking finish button", async () => {
      (getNotesFromLocalStorage as jest.Mock).mockReturnValue(mockNotes);

      renderComponent();

      const editButtons = screen.getAllByRole("button", {
        name: /button edit/i,
      });

      await user.click(editButtons[0]);

      const textarea =
        document.querySelectorAll<HTMLTextAreaElement>(".note__textarea")[0];
      await user.clear(textarea);
      await user.type(textarea, "Edited content");

      const finishButton = screen.getByRole("button", { name: /finish edit/i });
      await user.click(finishButton);

      expect(setLocalStorage).toHaveBeenCalledWith("notes", [
        { id: "note-1", text: "Edited content" },
        { id: "note-2", text: "Second note content" },
      ]);
    });

    test("It should disable textarea after finishing edit", async () => {
      (getNotesFromLocalStorage as jest.Mock).mockReturnValue(mockNotes);

      renderComponent();

      const editButtons = screen.getAllByRole("button", {
        name: /button edit/i,
      });

      await user.click(editButtons[0]);

      const textarea =
        document.querySelectorAll<HTMLTextAreaElement>(".note__textarea")[0];

      const finishButton = screen.getByRole("button", { name: /finish edit/i });
      await user.click(finishButton);

      expect(textarea.disabled).toBe(true);
    });

    test("It should remove finish button after completing edit", async () => {
      (getNotesFromLocalStorage as jest.Mock).mockReturnValue(mockNotes);

      renderComponent();

      const editButtons = screen.getAllByRole("button", {
        name: /button edit/i,
      });

      await user.click(editButtons[0]);

      const finishButton = screen.getByRole("button", { name: /finish edit/i });
      await user.click(finishButton);

      expect(
        screen.queryByRole("button", { name: /finish edit/i })
      ).not.toBeInTheDocument();
    });

    test("It should show edit button again after finishing edit", async () => {
      (getNotesFromLocalStorage as jest.Mock).mockReturnValue(mockNotes);

      renderComponent();

      const editButtons = screen.getAllByRole("button", {
        name: /button edit/i,
      });

      await user.click(editButtons[0]);

      const finishButton = screen.getByRole("button", { name: /finish edit/i });
      await user.click(finishButton);

      expect((editButtons[0] as HTMLButtonElement).style.display).toBe("block");
    });

    test("It should show success alert when editing note", async () => {
      (getNotesFromLocalStorage as jest.Mock).mockReturnValue(mockNotes);

      renderComponent();

      const editButtons = screen.getAllByRole("button", {
        name: /button edit/i,
      });

      await user.click(editButtons[0]);

      const finishButton = screen.getByRole("button", { name: /finish edit/i });
      await user.click(finishButton);

      expect(setAlert).toHaveBeenCalledWith(
        "1 note has been successfully edited ✅"
      );
    });
  });

  describe("LocalStorage Integration Tests.", () => {
    test("It should load notes from localStorage on mount", () => {
      (getNotesFromLocalStorage as jest.Mock).mockReturnValue(mockNotes);

      renderComponent();

      expect(getNotesFromLocalStorage).toHaveBeenCalled();
    });

    test("It should save to localStorage when adding note", async () => {
      (getNotesFromLocalStorage as jest.Mock).mockReturnValue([]);

      renderComponent();

      const btnAddNote =
        document.querySelector<HTMLButtonElement>(".header__btn-add");
      await user.click(btnAddNote!);

      expect(setLocalStorage).toHaveBeenCalledWith(
        "notes",
        expect.arrayContaining([
          expect.objectContaining({ text: "Ingrese texto" }),
        ])
      );
    });

    test("It should save to localStorage when deleting note", async () => {
      (getNotesFromLocalStorage as jest.Mock).mockReturnValue(mockNotes);

      renderComponent();

      const deleteButtons = screen.getAllByRole("button", {
        name: /button delete/i,
      });
      await user.click(deleteButtons[0]);

      expect(setLocalStorage).toHaveBeenCalled();
    });

    test("It should save to localStorage when editing note", async () => {
      (getNotesFromLocalStorage as jest.Mock).mockReturnValue(mockNotes);

      renderComponent();

      const editButtons = screen.getAllByRole("button", {
        name: /button edit/i,
      });
      await user.click(editButtons[0]);

      const finishButton = screen.getByRole("button", { name: /finish edit/i });
      await user.click(finishButton);

      expect(setLocalStorage).toHaveBeenCalled();
    });
  });

  describe("CSS.escape Tests.", () => {
    test("It should handle ids with special characters using CSS.escape", async () => {
      const notesWithSpecialIds: Note[] = [
        { id: "note:special", text: "Special ID note" },
      ];

      (getNotesFromLocalStorage as jest.Mock).mockReturnValue(
        notesWithSpecialIds
      );

      renderComponent();

      const note = document.getElementById("note:special");

      expect(note).toBeInTheDocument();
    });

    test("It should delete notes with special character ids", async () => {
      const notesWithSpecialIds: Note[] = [
        { id: "note:123", text: "Note content" },
      ];

      (getNotesFromLocalStorage as jest.Mock).mockReturnValue(
        notesWithSpecialIds
      );

      renderComponent();

      const deleteButton = screen.getByRole("button", {
        name: /button delete/i,
      });
      await user.click(deleteButton);

      const note = document.getElementById("note:123");

      expect(note).not.toBeInTheDocument();
    });
  });

  describe("Button Event Listener Tests.", () => {
    test("It should attach event listener to add button", () => {
      renderComponent();

      const btnAddNote =
        document.querySelector<HTMLButtonElement>(".header__btn-add");

      expect(btnAddNote).toBeInTheDocument();
    });

    test("It should render Note components with correct props", () => {
      (getNotesFromLocalStorage as jest.Mock).mockReturnValue(mockNotes);

      renderComponent();

      const notes = document.querySelectorAll(".note");

      expect(notes.length).toBe(mockNotes.length);
      expect(notes[0].id).toBe("note-1");
      expect(notes[1].id).toBe("note-2");
    });
  });

  describe("Edge Cases Tests.", () => {
    test("It should handle empty localStorage", () => {
      (getNotesFromLocalStorage as jest.Mock).mockReturnValue([]);

      renderComponent();

      const notes = document.querySelectorAll(".note");

      expect(notes.length).toBe(0);
    });

    test("It should handle adding note to existing notes", async () => {
      (getNotesFromLocalStorage as jest.Mock).mockReturnValue(mockNotes);

      renderComponent();

      const initialNotes = document.querySelectorAll(".note");
      expect(initialNotes.length).toBe(2);

      const btnAddNote =
        document.querySelector<HTMLButtonElement>(".header__btn-add");
      await user.click(btnAddNote!);

      const updatedNotes = document.querySelectorAll(".note");
      expect(updatedNotes.length).toBe(3);
    });
  });
});
