import { setAlert } from "@src/helpers/setAlert";

describe("setAlert.ts", () => {
  let alertElement: HTMLHeadingElement;

  beforeEach(() => {
    jest.useFakeTimers();

    alertElement = document.createElement("h2");
    alertElement.className = "header__alert";
    document.body.appendChild(alertElement);
  });

  afterEach(() => {
    document.body.innerHTML = "";
    jest.useRealTimers();
  });

  describe("General Tests.", () => {
    test("It should set the alert message", () => {
      setAlert("Test message");

      expect(alertElement.textContent).toBe("Test message");
    });

    test("It should add the show class", () => {
      setAlert("Alert");

      expect(alertElement.classList.contains("header__alert--show")).toBe(true);
    });

    test("It should find the alert element by class", () => {
      const querySelectorSpy = jest.spyOn(document, "querySelector");

      setAlert("Message");

      expect(querySelectorSpy).toHaveBeenCalledWith(".header__alert");
    });
  });

  describe("Message Display Tests.", () => {
    test("It should display different messages", () => {
      setAlert("First message");
      expect(alertElement.textContent).toBe("First message");

      jest.advanceTimersByTime(1000);

      setAlert("Second message");
      expect(alertElement.textContent).toBe("Second message");
    });

    test("It should handle empty string message", () => {
      setAlert("");

      expect(alertElement.textContent).toBe("");
      expect(alertElement.classList.contains("header__alert--show")).toBe(true);
    });

    test("It should handle long messages", () => {
      const longMessage = "This is a very long alert message ".repeat(5);

      setAlert(longMessage);

      expect(alertElement.textContent).toBe(longMessage);
    });

    test("It should handle special characters in message", () => {
      setAlert("Alert & Message <test>");

      expect(alertElement.textContent).toBe("Alert & Message <test>");
    });
  });

  describe("Class Management Tests.", () => {
    test("It should add header__alert--show class", () => {
      setAlert("Test");

      expect(alertElement).toHaveClass("header__alert--show");
    });

    test("It should not remove other classes when adding show class", () => {
      alertElement.classList.add("custom-class");

      setAlert("Test");

      expect(alertElement).toHaveClass("header__alert");
      expect(alertElement).toHaveClass("custom-class");
      expect(alertElement).toHaveClass("header__alert--show");
    });

    test("It should remove header__alert--show class after timeout", () => {
      setAlert("Test");

      expect(alertElement).toHaveClass("header__alert--show");

      jest.advanceTimersByTime(1000);

      expect(alertElement).not.toHaveClass("header__alert--show");
    });
  });

  describe("Timeout Tests.", () => {
    test("It should clear message after 1000ms", () => {
      setAlert("Temporary message");

      expect(alertElement.textContent).toBe("Temporary message");

      jest.advanceTimersByTime(1000);

      expect(alertElement.textContent).toBe("");
    });

    test("It should not clear message before 1000ms", () => {
      setAlert("Message");

      jest.advanceTimersByTime(999);

      expect(alertElement.textContent).toBe("Message");
      expect(alertElement).toHaveClass("header__alert--show");
    });

    test("It should clear message exactly at 1000ms", () => {
      setAlert("Message");

      jest.advanceTimersByTime(1000);

      expect(alertElement.textContent).toBe("");
      expect(alertElement).not.toHaveClass("header__alert--show");
    });

    test("It should use setTimeout", () => {
      const setTimeoutSpy = jest.spyOn(global, "setTimeout");

      setAlert("Test");

      expect(setTimeoutSpy).toHaveBeenCalledWith(expect.any(Function), 1000);
    });
  });

  describe("Multiple Alerts Tests.", () => {
    test("It should handle multiple consecutive alerts", () => {
      setAlert("First alert");
      expect(alertElement.textContent).toBe("First alert");

      jest.advanceTimersByTime(1000);
      expect(alertElement.textContent).toBe("");

      setAlert("Second alert");
      expect(alertElement.textContent).toBe("Second alert");

      jest.advanceTimersByTime(1000);
      expect(alertElement.textContent).toBe("");
    });

    test("It should override previous alert if called before timeout", () => {
      setAlert("First alert");
      expect(alertElement.textContent).toBe("First alert");

      jest.advanceTimersByTime(500);

      setAlert("Second alert");
      expect(alertElement.textContent).toBe("Second alert");
    });

    test("It should clear all alerts after their respective timeouts", () => {
      setAlert("Alert 1");

      jest.advanceTimersByTime(500);

      setAlert("Alert 2");

      jest.advanceTimersByTime(500);

      expect(alertElement.textContent).toBe("");
    });
  });

  describe("Class Removal Tests.", () => {
    test("It should remove show class after timeout", () => {
      setAlert("Test");

      expect(alertElement.classList.contains("header__alert--show")).toBe(true);

      jest.advanceTimersByTime(1000);

      expect(alertElement.classList.contains("header__alert--show")).toBe(
        false
      );
    });

    test("It should keep base class after timeout", () => {
      setAlert("Test");

      jest.advanceTimersByTime(1000);

      expect(alertElement).toHaveClass("header__alert");
    });

    test("It should not remove other classes after timeout", () => {
      alertElement.classList.add("custom-class");

      setAlert("Test");

      jest.advanceTimersByTime(1000);

      expect(alertElement).toHaveClass("header__alert");
      expect(alertElement).toHaveClass("custom-class");
      expect(alertElement).not.toHaveClass("header__alert--show");
    });
  });

  describe("Text Content Tests.", () => {
    test("It should set textContent property", () => {
      setAlert("Test message");

      expect(alertElement.textContent).toBe("Test message");
    });

    test("It should clear textContent after timeout", () => {
      setAlert("Message to clear");

      jest.advanceTimersByTime(1000);

      expect(alertElement.textContent).toBe("");
    });

    test("It should replace existing textContent", () => {
      alertElement.textContent = "Old message";

      setAlert("New message");

      expect(alertElement.textContent).toBe("New message");
    });
  });

  describe("Element Query Tests.", () => {
    test("It should query for .header__alert element", () => {
      const element =
        document.querySelector<HTMLHeadingElement>(".header__alert");

      setAlert("Test");

      expect(element).toBe(alertElement);
    });

    test("It should work with the queried element", () => {
      setAlert("Working");

      const queriedElement =
        document.querySelector<HTMLHeadingElement>(".header__alert");

      expect(queriedElement?.textContent).toBe("Working");
      expect(queriedElement?.classList.contains("header__alert--show")).toBe(
        true
      );
    });
  });

  describe("Timing Tests.", () => {
    test("It should display alert for exactly 1 second", () => {
      setAlert("Timed message");

      expect(alertElement.textContent).toBe("Timed message");
      expect(alertElement).toHaveClass("header__alert--show");

      jest.advanceTimersByTime(1000);

      expect(alertElement.textContent).toBe("");
      expect(alertElement).not.toHaveClass("header__alert--show");
    });

    test("It should handle rapid successive calls", () => {
      setAlert("Alert 1");
      setAlert("Alert 2");
      setAlert("Alert 3");

      expect(alertElement.textContent).toBe("Alert 3");

      jest.runAllTimers();

      expect(alertElement.textContent).toBe("");
    });
  });

  describe("Edge Cases Tests.", () => {
    test("It should handle numeric messages converted to string", () => {
      setAlert("123");

      expect(alertElement.textContent).toBe("123");
    });

    test("It should handle messages with newlines", () => {
      setAlert("Line 1\nLine 2");

      expect(alertElement.textContent).toBe("Line 1\nLine 2");
    });

    test("It should handle messages with tabs", () => {
      setAlert("Tab\there");

      expect(alertElement.textContent).toContain("Tab");
      expect(alertElement.textContent).toContain("here");
    });
  });
});
