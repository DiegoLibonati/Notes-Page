import { getElements } from "@src/helpers/getElements";

import { OFFICIAL_BODY } from "@tests/jest.constants";

describe("getElements.ts", () => {
  describe("General Tests.", () => {
    beforeEach(() => {
      document.body.innerHTML = OFFICIAL_BODY;
    });

    afterEach(() => {
      document.body.innerHTML = "";
    });

    test("It must render the elements of the document that the 'getElements' function exports.", () => {
      const { alertH2, btnAddNote, cardsContainer } = getElements();

      expect(alertH2).toBeInTheDocument();
      expect(btnAddNote).toBeInTheDocument();
      expect(cardsContainer).toBeInTheDocument();
    });
  });
});
