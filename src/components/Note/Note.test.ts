import { screen } from "@testing-library/dom";
import user from "@testing-library/user-event";

import { NoteProps } from "@src/entities/props";

import { Note } from "@src/components/Note/Note";

type RenderComponent = {
  container: HTMLDivElement;
  props: { onClickEdit: jest.Mock; onClickDelete: jest.Mock } & NoteProps;
};

const renderComponent = (
  props: { onClickEdit: jest.Mock; onClickDelete: jest.Mock } & NoteProps
): RenderComponent => {
  const container = Note(props);
  document.body.appendChild(container);
  return { container: container, props: props };
};

describe("Note.ts", () => {
  const mockOnClickEdit = jest.fn();
  const mockOnClickDelete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  describe("General Tests.", () => {
    test("It should render the component structure", () => {
      const props = {
        id: "note-1",
        children: "Test note content",
        onClickEdit: mockOnClickEdit,
        onClickDelete: mockOnClickDelete,
      };

      const { container } = renderComponent(props);

      expect(container).toBeInstanceOf(HTMLDivElement);
      expect(container.className).toBe("note");
    });

    test("It should return HTMLDivElement", () => {
      const props = {
        id: "note-1",
        children: "Test note",
        onClickEdit: mockOnClickEdit,
        onClickDelete: mockOnClickDelete,
      };

      const { container } = renderComponent(props);

      expect(container.tagName).toBe("DIV");
    });

    test("It should render all required elements", () => {
      const props = {
        id: "note-1",
        children: "Test note",
        onClickEdit: mockOnClickEdit,
        onClickDelete: mockOnClickDelete,
      };

      renderComponent(props);

      const header = document.querySelector(".note__header");
      const content = document.querySelector(".note__content");
      const textarea = screen.getByRole("textbox");
      const editButton = screen.getByRole("button", { name: /button edit/i });
      const deleteButton = screen.getByRole("button", {
        name: /button delete/i,
      });

      expect(header).toBeInTheDocument();
      expect(content).toBeInTheDocument();
      expect(textarea).toBeInTheDocument();
      expect(editButton).toBeInTheDocument();
      expect(deleteButton).toBeInTheDocument();
    });

    test("It should have correct CSS classes", () => {
      const props = {
        id: "note-1",
        children: "Test note",
        onClickEdit: mockOnClickEdit,
        onClickDelete: mockOnClickDelete,
      };

      renderComponent(props);

      const header = document.querySelector(".note__header");
      const content = document.querySelector(".note__content");
      const textarea = document.querySelector(".note__textarea");

      expect(header).toBeInTheDocument();
      expect(content).toBeInTheDocument();
      expect(textarea).toBeInTheDocument();
    });
  });

  describe("Props Rendering Tests.", () => {
    test("It should use correct id", () => {
      const props = {
        id: "unique-note-id",
        children: "Note content",
        onClickEdit: mockOnClickEdit,
        onClickDelete: mockOnClickDelete,
      };

      const { container } = renderComponent(props);

      expect(container.id).toBe("unique-note-id");
    });

    test("It should display children content in textarea", () => {
      const props = {
        id: "note-1",
        children: "This is my note content",
        onClickEdit: mockOnClickEdit,
        onClickDelete: mockOnClickDelete,
      };

      renderComponent(props);

      const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;

      expect(textarea.value).toBe("This is my note content");
    });

    test("It should render children as textarea value", () => {
      const content = "Note with multiple lines\nSecond line\nThird line";
      const props = {
        id: "note-1",
        children: content,
        onClickEdit: mockOnClickEdit,
        onClickDelete: mockOnClickDelete,
      };

      renderComponent(props);

      const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;

      expect(textarea.value).toBe(content);
    });
  });

  describe("Textarea Tests.", () => {
    test("It should have textarea with disabled attribute", () => {
      const props = {
        id: "note-1",
        children: "Disabled note",
        onClickEdit: mockOnClickEdit,
        onClickDelete: mockOnClickDelete,
      };

      renderComponent(props);

      const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;

      expect(textarea).toBeDisabled();
      expect(textarea.getAttribute("disabled")).toBe("true");
    });

    test("It should have textarea with correct rows and cols", () => {
      const props = {
        id: "note-1",
        children: "Note content",
        onClickEdit: mockOnClickEdit,
        onClickDelete: mockOnClickDelete,
      };

      renderComponent(props);

      const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;

      expect(textarea.rows).toBe(5);
      expect(textarea.cols).toBe(2);
    });

    test("It should have textarea with correct class", () => {
      const props = {
        id: "note-1",
        children: "Note",
        onClickEdit: mockOnClickEdit,
        onClickDelete: mockOnClickDelete,
      };

      renderComponent(props);

      const textarea = screen.getByRole("textbox");

      expect(textarea).toHaveClass("note__textarea");
    });
  });

  describe("Button Tests.", () => {
    test("It should render edit button with correct attributes", () => {
      const props = {
        id: "note-1",
        children: "Note",
        onClickEdit: mockOnClickEdit,
        onClickDelete: mockOnClickDelete,
      };

      renderComponent(props);

      const editButton = screen.getByRole("button", { name: /button edit/i });

      expect(editButton).toBeInTheDocument();
      expect(editButton).toHaveClass("note__header-btn");
      expect(editButton).toHaveClass("note__header-btn-edit");
      expect(editButton.getAttribute("type")).toBe("button");
    });

    test("It should render delete button with correct attributes", () => {
      const props = {
        id: "note-1",
        children: "Note",
        onClickEdit: mockOnClickEdit,
        onClickDelete: mockOnClickDelete,
      };

      renderComponent(props);

      const deleteButton = screen.getByRole("button", {
        name: /button delete/i,
      });

      expect(deleteButton).toBeInTheDocument();
      expect(deleteButton).toHaveClass("note__header-btn");
      expect(deleteButton).toHaveClass("note__header-btn-delete");
      expect(deleteButton.getAttribute("type")).toBe("button");
    });

    test("It should render edit button with icon", () => {
      const props = {
        id: "note-1",
        children: "Note",
        onClickEdit: mockOnClickEdit,
        onClickDelete: mockOnClickDelete,
      };

      renderComponent(props);

      const editButton = screen.getByRole("button", { name: /button edit/i });
      const icon = editButton.querySelector("i");

      expect(icon).toBeInTheDocument();
      expect(icon).toHaveClass("fa-solid");
      expect(icon).toHaveClass("fa-pen-to-square");
    });

    test("It should render delete button with icon", () => {
      const props = {
        id: "note-1",
        children: "Note",
        onClickEdit: mockOnClickEdit,
        onClickDelete: mockOnClickDelete,
      };

      renderComponent(props);

      const deleteButton = screen.getByRole("button", {
        name: /button delete/i,
      });
      const icon = deleteButton.querySelector("i");

      expect(icon).toBeInTheDocument();
      expect(icon).toHaveClass("fa-solid");
      expect(icon).toHaveClass("fa-trash");
    });
  });

  describe("Edit Click Event Tests.", () => {
    test("It should call onClickEdit when edit button is clicked", async () => {
      const props = {
        id: "note-1",
        children: "Note content",
        onClickEdit: mockOnClickEdit,
        onClickDelete: mockOnClickDelete,
      };

      const { props: componentProps } = renderComponent(props);

      const editButton = screen.getByRole("button", { name: /button edit/i });

      await user.click(editButton);

      expect(componentProps.onClickEdit).toHaveBeenCalledTimes(1);
    });

    test("It should pass event and id to onClickEdit", async () => {
      const props = {
        id: "note-123",
        children: "Note content",
        onClickEdit: mockOnClickEdit,
        onClickDelete: mockOnClickDelete,
      };

      const { props: componentProps } = renderComponent(props);

      const editButton = screen.getByRole("button", { name: /button edit/i });

      await user.click(editButton);

      expect(componentProps.onClickEdit).toHaveBeenCalledWith(
        expect.any(MouseEvent),
        "note-123"
      );
    });

    test("It should call onClickEdit with correct id parameter", async () => {
      const props = {
        id: "specific-note-id",
        children: "Content",
        onClickEdit: mockOnClickEdit,
        onClickDelete: mockOnClickDelete,
      };

      const { props: componentProps } = renderComponent(props);

      const editButton = screen.getByRole("button", { name: /button edit/i });

      await user.click(editButton);

      const callArgs = componentProps.onClickEdit.mock.calls[0];
      expect(callArgs[1]).toBe("specific-note-id");
    });

    test("It should call onClickEdit multiple times on multiple clicks", async () => {
      const props = {
        id: "note-1",
        children: "Note",
        onClickEdit: mockOnClickEdit,
        onClickDelete: mockOnClickDelete,
      };

      const { props: componentProps } = renderComponent(props);

      const editButton = screen.getByRole("button", { name: /button edit/i });

      await user.click(editButton);
      await user.click(editButton);
      await user.click(editButton);

      expect(componentProps.onClickEdit).toHaveBeenCalledTimes(3);
    });
  });

  describe("Delete Click Event Tests.", () => {
    test("It should call onClickDelete when delete button is clicked", async () => {
      const props = {
        id: "note-1",
        children: "Note content",
        onClickEdit: mockOnClickEdit,
        onClickDelete: mockOnClickDelete,
      };

      const { props: componentProps } = renderComponent(props);

      const deleteButton = screen.getByRole("button", {
        name: /button delete/i,
      });

      await user.click(deleteButton);

      expect(componentProps.onClickDelete).toHaveBeenCalledTimes(1);
    });

    test("It should pass event and id to onClickDelete", async () => {
      const props = {
        id: "note-456",
        children: "Note content",
        onClickEdit: mockOnClickEdit,
        onClickDelete: mockOnClickDelete,
      };

      const { props: componentProps } = renderComponent(props);

      const deleteButton = screen.getByRole("button", {
        name: /button delete/i,
      });

      await user.click(deleteButton);

      expect(componentProps.onClickDelete).toHaveBeenCalledWith(
        expect.any(MouseEvent),
        "note-456"
      );
    });

    test("It should call onClickDelete with correct id parameter", async () => {
      const props = {
        id: "delete-test-id",
        children: "Content",
        onClickEdit: mockOnClickEdit,
        onClickDelete: mockOnClickDelete,
      };

      const { props: componentProps } = renderComponent(props);

      const deleteButton = screen.getByRole("button", {
        name: /button delete/i,
      });

      await user.click(deleteButton);

      const callArgs = componentProps.onClickDelete.mock.calls[0];
      expect(callArgs[1]).toBe("delete-test-id");
    });

    test("It should call onClickDelete multiple times on multiple clicks", async () => {
      const props = {
        id: "note-1",
        children: "Note",
        onClickEdit: mockOnClickEdit,
        onClickDelete: mockOnClickDelete,
      };

      const { props: componentProps } = renderComponent(props);

      const deleteButton = screen.getByRole("button", {
        name: /button delete/i,
      });

      await user.click(deleteButton);
      await user.click(deleteButton);

      expect(componentProps.onClickDelete).toHaveBeenCalledTimes(2);
    });
  });

  describe("Multiple Notes Tests.", () => {
    test("It should render multiple notes independently", () => {
      const props1 = {
        id: "note-1",
        children: "First note",
        onClickEdit: jest.fn(),
        onClickDelete: jest.fn(),
      };

      const props2 = {
        id: "note-2",
        children: "Second note",
        onClickEdit: jest.fn(),
        onClickDelete: jest.fn(),
      };

      renderComponent(props1);
      renderComponent(props2);

      const note1 = document.getElementById("note-1");
      const note2 = document.getElementById("note-2");
      const allNotes = document.querySelectorAll(".note");

      expect(note1).toBeInTheDocument();
      expect(note2).toBeInTheDocument();
      expect(allNotes.length).toBe(2);
    });

    test("It should maintain separate content for each note", () => {
      const props1 = {
        id: "note-1",
        children: "Content A",
        onClickEdit: jest.fn(),
        onClickDelete: jest.fn(),
      };

      const props2 = {
        id: "note-2",
        children: "Content B",
        onClickEdit: jest.fn(),
        onClickDelete: jest.fn(),
      };

      const { container: note1 } = renderComponent(props1);
      const { container: note2 } = renderComponent(props2);

      const textarea1 = note1.querySelector("textarea") as HTMLTextAreaElement;
      const textarea2 = note2.querySelector("textarea") as HTMLTextAreaElement;

      expect(textarea1.value).toBe("Content A");
      expect(textarea2.value).toBe("Content B");
    });

    test("It should have unique ids for each note", () => {
      const props1 = {
        id: "unique-1",
        children: "Note 1",
        onClickEdit: jest.fn(),
        onClickDelete: jest.fn(),
      };

      const props2 = {
        id: "unique-2",
        children: "Note 2",
        onClickEdit: jest.fn(),
        onClickDelete: jest.fn(),
      };

      const { container: note1 } = renderComponent(props1);
      const { container: note2 } = renderComponent(props2);

      expect(note1.id).not.toBe(note2.id);
    });
  });

  describe("Different IDs Tests.", () => {
    test("It should handle simple string id", () => {
      const props = {
        id: "simple",
        children: "Content",
        onClickEdit: mockOnClickEdit,
        onClickDelete: mockOnClickDelete,
      };

      const { container } = renderComponent(props);

      expect(container.id).toBe("simple");
    });

    test("It should handle id with dashes", () => {
      const props = {
        id: "note-with-dashes",
        children: "Content",
        onClickEdit: mockOnClickEdit,
        onClickDelete: mockOnClickDelete,
      };

      const { container } = renderComponent(props);

      expect(container.id).toBe("note-with-dashes");
    });

    test("It should handle id with underscores", () => {
      const props = {
        id: "note_with_underscores",
        children: "Content",
        onClickEdit: mockOnClickEdit,
        onClickDelete: mockOnClickDelete,
      };

      const { container } = renderComponent(props);

      expect(container.id).toBe("note_with_underscores");
    });

    test("It should handle numeric id", () => {
      const props = {
        id: "note-123",
        children: "Content",
        onClickEdit: mockOnClickEdit,
        onClickDelete: mockOnClickDelete,
      };

      const { container } = renderComponent(props);

      expect(container.id).toBe("note-123");
    });
  });

  describe("Content Tests.", () => {
    test("It should handle empty content", () => {
      const props = {
        id: "empty-note",
        children: "",
        onClickEdit: mockOnClickEdit,
        onClickDelete: mockOnClickDelete,
      };

      renderComponent(props);

      const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;

      expect(textarea.value).toBe("");
    });

    test("It should handle long content", () => {
      const longContent = "This is a very long note content ".repeat(20);
      const props = {
        id: "long-note",
        children: longContent,
        onClickEdit: mockOnClickEdit,
        onClickDelete: mockOnClickDelete,
      };

      renderComponent(props);

      const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;

      expect(textarea.value).toBe(longContent);
    });

    test("It should handle multiline content", () => {
      const multilineContent = "Line 1\nLine 2\nLine 3";
      const props = {
        id: "multiline-note",
        children: multilineContent,
        onClickEdit: mockOnClickEdit,
        onClickDelete: mockOnClickDelete,
      };

      renderComponent(props);

      const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;

      expect(textarea.value).toBe(multilineContent);
    });

    test("It should handle special characters in content", () => {
      const props = {
        id: "special-note",
        children: "Content & Special <chars>",
        onClickEdit: mockOnClickEdit,
        onClickDelete: mockOnClickDelete,
      };

      renderComponent(props);

      const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;

      expect(textarea.value).toContain("Content & Special");
    });
  });

  describe("DOM Structure Tests.", () => {
    test("It should have correct header structure", () => {
      const props = {
        id: "note-1",
        children: "Content",
        onClickEdit: mockOnClickEdit,
        onClickDelete: mockOnClickDelete,
      };

      renderComponent(props);

      const header = document.querySelector(".note__header");
      const buttons = header?.querySelectorAll(".note__header-btn");

      expect(header).toBeInTheDocument();
      expect(buttons?.length).toBe(2);
    });

    test("It should nest content inside note", () => {
      const props = {
        id: "note-1",
        children: "Content",
        onClickEdit: mockOnClickEdit,
        onClickDelete: mockOnClickDelete,
      };

      const { container } = renderComponent(props);

      const content = container.querySelector(".note__content");
      const textarea = content?.querySelector("textarea");

      expect(content).toBeInTheDocument();
      expect(textarea).toBeInTheDocument();
    });

    test("It should have buttons inside header", () => {
      const props = {
        id: "note-1",
        children: "Content",
        onClickEdit: mockOnClickEdit,
        onClickDelete: mockOnClickDelete,
      };

      renderComponent(props);

      const header = document.querySelector(".note__header");
      const editButton = header?.querySelector(".note__header-btn-edit");
      const deleteButton = header?.querySelector(".note__header-btn-delete");

      expect(editButton).toBeInTheDocument();
      expect(deleteButton).toBeInTheDocument();
    });
  });

  describe("Accessibility Tests.", () => {
    test("It should have aria-label on edit button", () => {
      const props = {
        id: "note-1",
        children: "Content",
        onClickEdit: mockOnClickEdit,
        onClickDelete: mockOnClickDelete,
      };

      renderComponent(props);

      const editButton = screen.getByRole("button", { name: /button edit/i });

      expect(editButton).toHaveAttribute("aria-label", "button edit");
    });

    test("It should have aria-label on delete button", () => {
      const props = {
        id: "note-1",
        children: "Content",
        onClickEdit: mockOnClickEdit,
        onClickDelete: mockOnClickDelete,
      };

      renderComponent(props);

      const deleteButton = screen.getByRole("button", {
        name: /button delete/i,
      });

      expect(deleteButton).toHaveAttribute("aria-label", "button delete");
    });

    test("It should be keyboard accessible", () => {
      const props = {
        id: "note-1",
        children: "Content",
        onClickEdit: mockOnClickEdit,
        onClickDelete: mockOnClickDelete,
      };

      renderComponent(props);

      const editButton = screen.getByRole("button", { name: /button edit/i });

      editButton.focus();
      expect(document.activeElement).toBe(editButton);
    });
  });
});
