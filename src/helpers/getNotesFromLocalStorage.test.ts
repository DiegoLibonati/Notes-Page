import { getNotesFromLocalStorage } from "@src/helpers/getNotesFromLocalStorage";

import { LOCAL_STORAGE_NOTES_KEY } from "@src/constants/vars";

import { mocksLocalStorage } from "@tests/jest.constants";

describe("getNotesFromLocalStorage.ts", () => {
  describe("General Tests.", () => {
    test("The getItem of localStorage must be called with key of notes.", () => {
      getNotesFromLocalStorage();

      expect(mocksLocalStorage.getItem).toHaveBeenCalledTimes(1);
      expect(mocksLocalStorage.getItem).toHaveBeenCalledWith(
        LOCAL_STORAGE_NOTES_KEY
      );
    });
  });
});
