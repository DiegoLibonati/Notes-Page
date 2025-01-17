import { getCardsFromLocalStorage } from "./getCardsFromLocalStorage";

import { LOCAL_STORAGE_CARDS_KEY } from "../constants/constants";

import { mocksLocalStorage } from "../tests/jest.constants";

describe("getCardsFromLocalStorage.ts", () => {
  describe("General Tests.", () => {
    test("The getItem of localStorage must be called with key of cards.", () => {
      getCardsFromLocalStorage();

      expect(mocksLocalStorage.getItem).toHaveBeenCalledTimes(1);
      expect(mocksLocalStorage.getItem).toHaveBeenCalledWith(
        LOCAL_STORAGE_CARDS_KEY
      );
    });
  });
});
