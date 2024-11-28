import { screen } from "@testing-library/dom";
import user from "@testing-library/user-event";

import fs from "fs";
import path from "path";

import { LOCAL_STORAGE_CARDS_KEY } from "./constants/constants";

import { LOCAL_STORAGE_MOCKS } from "./tests/jest.setup";

const INITIAL_HTML: string = fs.readFileSync(
  path.resolve(__dirname, "../index.html"),
  "utf8"
);

beforeEach(() => {
  jest.resetModules();
  jest.resetAllMocks();
  const body = INITIAL_HTML.match(/<body[^>]*>([\s\S]*?)<\/body>/i)![1];

  document.body.innerHTML = body;
  require("./index.ts");
  document.dispatchEvent(new Event("DOMContentLoaded"));
});

afterEach(() => {
  document.body.innerHTML = "";
});

test("It should render the '+' button.", () => {
  const btnAddNote = screen.getByRole("button", { name: /add note/i });

  expect(btnAddNote).toBeInTheDocument();
});

test("It must create and add a note when '+' is clicked, add it to localStorage and have an alert pop up.", async () => {
  const userEvent = user.setup({
    advanceTimers: jest.advanceTimersByTime,
  });

  jest.useFakeTimers();

  const cardsContainer = document.querySelector(".section_container");
  const btnAddNote = screen.getByRole("button", { name: /add note/i });

  expect(btnAddNote).toBeInTheDocument();
  expect(cardsContainer).toBeInTheDocument();
  expect(cardsContainer?.children).toHaveLength(0);

  await userEvent.click(btnAddNote);

  expect(cardsContainer?.children).toHaveLength(1);

  const articles = screen.getAllByRole("article");
  const card = articles.find((article) => article.classList.contains("card"));
  const alert = screen.getByText("1 note has been successfully created ✅");

  expect(card).toBeInTheDocument();
  expect(LOCAL_STORAGE_MOCKS.setItem).toHaveBeenCalledTimes(1);
  expect(LOCAL_STORAGE_MOCKS.setItem).toHaveBeenCalledWith(
    LOCAL_STORAGE_CARDS_KEY,
    JSON.stringify([{ id: card?.id, text: card?.textContent }])
  );
  expect(alert).toBeInTheDocument();
  expect(alert.classList.contains("show-data")).toBeTruthy();

  await jest.advanceTimersByTimeAsync(1000);

  expect(alert).toBeEmptyDOMElement();
  expect(alert.classList.contains("show-data")).toBeFalsy();

  jest.useRealTimers();
});

test("It should remove a note when the trash can is clicked and an alert should pop up.", async () => {
  const userEvent = user.setup({
    advanceTimers: jest.advanceTimersByTime,
  });

  jest.useFakeTimers();

  const cardsContainer = document.querySelector(".section_container");
  const btnAddNote = screen.getByRole("button", { name: /add note/i });

  expect(btnAddNote).toBeInTheDocument();
  expect(cardsContainer).toBeInTheDocument();
  expect(cardsContainer?.children).toHaveLength(0);

  await userEvent.click(btnAddNote);

  expect(cardsContainer?.children).toHaveLength(1);
  expect(LOCAL_STORAGE_MOCKS.setItem).toHaveBeenCalledTimes(1);

  const buttonDelete = screen.getByRole("button", { name: /button delete/i });

  expect(buttonDelete).toBeInTheDocument();

  await userEvent.click(buttonDelete);

  expect(cardsContainer?.children).toHaveLength(0);
  expect(LOCAL_STORAGE_MOCKS.setItem).toHaveBeenCalledTimes(2);
  expect(LOCAL_STORAGE_MOCKS.setItem).toHaveBeenCalledWith(
    LOCAL_STORAGE_CARDS_KEY,
    JSON.stringify([])
  );

  const alert = screen.getByText("1 note has been successfully deleted ✅");

  expect(alert).toBeInTheDocument();
  expect(alert.classList.contains("show-data")).toBeTruthy();

  await jest.advanceTimersByTimeAsync(1000);

  expect(alert).toBeEmptyDOMElement();
  expect(alert.classList.contains("show-data")).toBeFalsy();

  jest.useRealTimers();
});

test("It should edit a note when you click on the edit icon and then on the cross to finish editing. An alert should also pop up.", async () => {
  const userEvent = user.setup({
    advanceTimers: jest.advanceTimersByTime,
  });
  const text = "Hola pepe";

  jest.useFakeTimers();

  const cardsContainer = document.querySelector(".section_container");
  const btnAddNote = screen.getByRole("button", { name: /add note/i });

  expect(btnAddNote).toBeInTheDocument();
  expect(cardsContainer).toBeInTheDocument();
  expect(cardsContainer?.children).toHaveLength(0);

  await userEvent.click(btnAddNote);

  expect(cardsContainer?.children).toHaveLength(1);
  expect(LOCAL_STORAGE_MOCKS.setItem).toHaveBeenCalledTimes(1);

  const buttonEdit = screen.getByRole("button", { name: /button edit/i });

  expect(buttonEdit).toBeInTheDocument();

  const textArea = screen.getByRole("textbox");

  expect(textArea).toBeInTheDocument();

  await userEvent.click(buttonEdit);

  expect(textArea).not.toBeDisabled();

  await userEvent.clear(textArea);
  await userEvent.click(textArea);
  await userEvent.keyboard(text);

  const buttonFinishEdit = screen.getByRole("button", { name: /finish edit/i });

  expect(buttonFinishEdit).toBeInTheDocument();

  await userEvent.click(buttonFinishEdit);

  expect(buttonFinishEdit).not.toBeInTheDocument();
  expect(textArea.textContent).toBe(text);
  expect(textArea).toBeDisabled();
  expect(LOCAL_STORAGE_MOCKS.setItem).toHaveBeenCalledTimes(2);

  const alert = screen.getByText("1 note has been successfully edited ✅");

  expect(alert).toBeInTheDocument();
  expect(alert.classList.contains("show-data")).toBeTruthy();

  await jest.advanceTimersByTimeAsync(1000);

  expect(alert).toBeEmptyDOMElement();
  expect(alert.classList.contains("show-data")).toBeFalsy();

  jest.useRealTimers();
});