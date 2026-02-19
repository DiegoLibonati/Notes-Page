import type { Note } from "@/types/app";

import { getNotesFromLocalStorage } from "@/helpers/getNotesFromLocalStorage";

import { mocksLocalStorage } from "@tests/__mocks__/localStorage.mock";

describe("getNotesFromLocalStorage", () => {
  beforeEach(() => {
    mocksLocalStorage.clear();
  });

  afterEach(() => {
    mocksLocalStorage.clear();
  });

  it("should return notes from localStorage", () => {
    const mockNotes: Note[] = [
      { id: "1", text: "Note 1" },
      { id: "2", text: "Note 2" },
    ];

    mocksLocalStorage.setItem("notes", JSON.stringify(mockNotes));

    const result = getNotesFromLocalStorage();

    expect(result).toEqual(mockNotes);
  });

  it("should return empty array when no notes in localStorage", () => {
    const result = getNotesFromLocalStorage();

    expect(result).toEqual([]);
  });

  it("should return empty array when localStorage has null", () => {
    mocksLocalStorage.setItem("notes", "null");

    const result = getNotesFromLocalStorage();

    expect(result).toEqual([]);
  });
});
