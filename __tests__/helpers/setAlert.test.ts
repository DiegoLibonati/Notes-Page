import { setAlert, clearAlert } from "@/helpers/setAlert";

describe("setAlert", () => {
  beforeEach(() => {
    jest.useFakeTimers();

    const alertElement = document.createElement("h2");
    alertElement.className = "header__alert";
    document.body.appendChild(alertElement);
  });

  afterEach(() => {
    document.body.innerHTML = "";
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it("should display alert message", () => {
    setAlert("Test message");

    const alertH2 =
      document.querySelector<HTMLHeadingElement>(".header__alert");
    expect(alertH2?.textContent).toBe("Test message");
    expect(alertH2).toHaveClass("header__alert--show");
  });

  it("should clear alert after timeout", () => {
    setAlert("Test message");

    const alertH2 =
      document.querySelector<HTMLHeadingElement>(".header__alert");
    expect(alertH2?.textContent).toBe("Test message");

    jest.advanceTimersByTime(1000);

    expect(alertH2?.textContent).toBe("");
    expect(alertH2).not.toHaveClass("header__alert--show");
  });

  it("should replace previous alert message", () => {
    setAlert("First message");

    const alertH2 =
      document.querySelector<HTMLHeadingElement>(".header__alert");
    expect(alertH2?.textContent).toBe("First message");

    setAlert("Second message");

    expect(alertH2?.textContent).toBe("Second message");
  });

  it("should not throw error when alert element does not exist", () => {
    document.body.innerHTML = "";

    expect(() => {
      setAlert("Test message");
    }).not.toThrow();
  });
});

describe("clearAlert", () => {
  beforeEach(() => {
    jest.useFakeTimers();

    const alertElement = document.createElement("h2");
    alertElement.className = "header__alert";
    document.body.appendChild(alertElement);
  });

  afterEach(() => {
    document.body.innerHTML = "";
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it("should clear alert message and class", () => {
    setAlert("Test message");

    const alertH2 =
      document.querySelector<HTMLHeadingElement>(".header__alert");
    expect(alertH2?.textContent).toBe("Test message");
    expect(alertH2).toHaveClass("header__alert--show");

    clearAlert();

    expect(alertH2?.textContent).toBe("");
    expect(alertH2).not.toHaveClass("header__alert--show");
  });

  it("should clear timeout when clearing alert", () => {
    const clearTimeoutSpy = jest.spyOn(global, "clearTimeout");

    setAlert("Test message");
    clearAlert();

    expect(clearTimeoutSpy).toHaveBeenCalled();

    clearTimeoutSpy.mockRestore();
  });

  it("should not throw error when alert element does not exist", () => {
    document.body.innerHTML = "";

    expect(() => {
      clearAlert();
    }).not.toThrow();
  });
});
