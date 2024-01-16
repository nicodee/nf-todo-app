import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import App from "../App";

describe("App on initial load", () => {
  it("renders App component without crashing", () => {
    render(<App />);
  });

  it("renders the correct information on initial load", () => {
    const { getByText, getByTestId, queryByTestId } = render(<App />);

    expect(getByText("Todo")).toBeInTheDocument();
    expect(getByText("All Tasks: 0")).toBeInTheDocument();
    expect(getByText("Completed: 0")).toBeInTheDocument();
    expect(getByText("Incomplete: 0")).toBeInTheDocument();
    expect(queryByTestId("task-list-item")).toBeNull();
    expect(queryByTestId("empty-list-icon")).toBeInTheDocument();
    expect(queryByTestId("task-input")).toBeInTheDocument();
    expect(queryByTestId("add-new-task-button")).toBeInTheDocument();
    expect(getByTestId("nav-button-all")).toHaveClass("active");
  });

  it("renders the correct list on nav button click", () => {
    const { getByText, getByTestId } = render(<App />);

    fireEvent.click(getByText(/Completed/i));
    expect(getByTestId("nav-button-completed")).toHaveClass("active");
    fireEvent.click(getByText(/Incomplete/i));
    expect(getByTestId("nav-button-incomplete")).toHaveClass("active");
    fireEvent.click(getByText(/All Tasks/i));
    expect(getByTestId("nav-button-all")).toHaveClass("active");
  });
});

describe("tests functionality of adding tasks", () => {
  it("Focuses on the input field on click of add new task button", () => {
    const { getByTestId } = render(<App />);

    fireEvent.click(getByTestId("add-new-task-button"));
    expect(getByTestId("task-input")).toHaveFocus();
  });

  it("Adds a new task on enter button after typing text in input", () => {
    const { getByTestId, getByText } = render(<App />);

    fireEvent.click(getByTestId("add-new-task-button"));
    fireEvent.change(getByTestId("task-input"), {
      target: { value: "New Task" },
    });
    fireEvent.keyDown(getByTestId("task-input"), { key: "Enter" });
    expect(getByText("New Task")).toBeInTheDocument();
    expect(getByTestId("task-input")).toHaveValue("");
    expect(getByText("All Tasks: 1")).toBeInTheDocument();
    expect(getByText("Incomplete: 1")).toBeInTheDocument();
    expect(getByText("Completed: 0")).toBeInTheDocument();
  });

  it("Displays multiple tasks in the list", async () => {
    const { getByTestId, getByText, queryAllByTestId } = render(<App />);

    fireEvent.click(getByTestId("add-new-task-button"));
    fireEvent.change(getByTestId("task-input"), {
      target: { value: "New Task 1" },
    });
    fireEvent.keyDown(getByTestId("task-input"), { key: "Enter" });
    fireEvent.keyUp(getByTestId("task-input"), { key: "Enter" });

    fireEvent.change(getByTestId("task-input"), {
      target: { value: "New Task 2" },
    });
    fireEvent.keyDown(getByTestId("task-input"), { key: "Enter" });
    expect(getByText("All Tasks: 2")).toBeInTheDocument();
    expect(getByText("Incomplete: 2")).toBeInTheDocument();
    expect(getByText("Completed: 0")).toBeInTheDocument();
    expect(queryAllByTestId("task-list-item")).toHaveLength(2);
    expect(getByText("New Task 1")).toBeInTheDocument();
    expect(getByText("New Task 2")).toBeInTheDocument();
  });

  it("Displays multiple tasks in the list", async () => {
    const { getByTestId, getByText, queryAllByTestId } = render(<App />);

    fireEvent.click(getByTestId("add-new-task-button"));
    fireEvent.change(getByTestId("task-input"), {
      target: { value: "New Task 1" },
    });
    fireEvent.keyDown(getByTestId("task-input"), { key: "Enter" });
    fireEvent.keyUp(getByTestId("task-input"), { key: "Enter" });

    fireEvent.change(getByTestId("task-input"), {
      target: { value: "New Task 2" },
    });
    fireEvent.keyDown(getByTestId("task-input"), { key: "Enter" });
    expect(getByText("All Tasks: 2")).toBeInTheDocument();
    expect(getByText("Incomplete: 2")).toBeInTheDocument();
    expect(getByText("Completed: 0")).toBeInTheDocument();
    expect(queryAllByTestId("task-list-item")).toHaveLength(2);
    expect(getByText("New Task 1")).toBeInTheDocument();
    expect(getByText("New Task 2")).toBeInTheDocument();

    const listItems = queryAllByTestId("delete-task-button");
    fireEvent.click(listItems[0]);
    fireEvent.click(getByText(/OK/i));
    expect(queryAllByTestId("task-list-item")).toHaveLength(1);
    expect(getByText("New Task 2")).toBeInTheDocument();
    expect(getByText("All Tasks: 1")).toBeInTheDocument();
    expect(getByText("Incomplete: 1")).toBeInTheDocument();
    expect(getByText("Completed: 0")).toBeInTheDocument();
  });
});

describe("tests functionality of deleting tasks", () => {
  it("deletes a single task", () => {
    const { getByTestId, getByText, queryByTestId } = render(<App />);

    fireEvent.click(getByTestId("add-new-task-button"));
    fireEvent.change(getByTestId("task-input"), {
      target: { value: "New Task" },
    });
    fireEvent.keyDown(getByTestId("task-input"), { key: "Enter" });
    expect(getByText("All Tasks: 1")).toBeInTheDocument();
    expect(getByText("Incomplete: 1")).toBeInTheDocument();
    expect(getByText("Completed: 0")).toBeInTheDocument();

    fireEvent.click(getByTestId("delete-task-button"));
    fireEvent.click(getByText(/OK/i));
    expect(queryByTestId("task-list-item")).toBeNull();
    expect(getByText("All Tasks: 0")).toBeInTheDocument();
    expect(getByText("Incomplete: 0")).toBeInTheDocument();
    expect(getByText("Completed: 0")).toBeInTheDocument();
  });

  it("does not delete a task on clicking on cancel button", () => {
    const { getByTestId, getByText, queryByTestId } = render(<App />);

    fireEvent.click(getByTestId("add-new-task-button"));
    fireEvent.change(getByTestId("task-input"), {
      target: { value: "New Task" },
    });
    fireEvent.keyDown(getByTestId("task-input"), { key: "Enter" });
    expect(getByText("All Tasks: 1")).toBeInTheDocument();
    expect(getByText("Incomplete: 1")).toBeInTheDocument();
    expect(getByText("Completed: 0")).toBeInTheDocument();

    fireEvent.click(getByTestId("delete-task-button"));
    fireEvent.click(getByText(/Cancel/i));
    expect(queryByTestId("task-list-item")).toBeInTheDocument();
    expect(getByText("All Tasks: 1")).toBeInTheDocument();
    expect(getByText("Incomplete: 1")).toBeInTheDocument();
    expect(getByText("Completed: 0")).toBeInTheDocument();
  });

  it("tests the functionality of deleting a task from a list of multiple items", async () => {
    const { getByTestId, getByText, queryAllByTestId } = render(<App />);

    fireEvent.click(getByTestId("add-new-task-button"));
    fireEvent.change(getByTestId("task-input"), {
      target: { value: "New Task 1" },
    });
    fireEvent.keyDown(getByTestId("task-input"), { key: "Enter" });
    fireEvent.keyUp(getByTestId("task-input"), { key: "Enter" });

    fireEvent.change(getByTestId("task-input"), {
      target: { value: "New Task 2" },
    });
    fireEvent.keyDown(getByTestId("task-input"), { key: "Enter" });
    expect(getByText("All Tasks: 2")).toBeInTheDocument();
    expect(getByText("Incomplete: 2")).toBeInTheDocument();
    expect(getByText("Completed: 0")).toBeInTheDocument();
    expect(queryAllByTestId("task-list-item")).toHaveLength(2);
    expect(getByText("New Task 1")).toBeInTheDocument();
    expect(getByText("New Task 2")).toBeInTheDocument();

    const listItems = queryAllByTestId("delete-task-button");
    fireEvent.click(listItems[1]);
    fireEvent.click(getByText(/OK/i));
    expect(queryAllByTestId("task-list-item")).toHaveLength(1);
    expect(getByText("New Task 1")).toBeInTheDocument();
    expect(getByText("All Tasks: 1")).toBeInTheDocument();
    expect(getByText("Incomplete: 1")).toBeInTheDocument();
    expect(getByText("Completed: 0")).toBeInTheDocument();
  });

  it("correctly cancels the deletion of a task when there are multiple tasks in the list", async () => {
    const { getByTestId, getByText, queryAllByTestId } = render(<App />);

    fireEvent.click(getByTestId("add-new-task-button"));
    fireEvent.change(getByTestId("task-input"), {
      target: { value: "New Task 1" },
    });
    fireEvent.keyDown(getByTestId("task-input"), { key: "Enter" });
    fireEvent.keyUp(getByTestId("task-input"), { key: "Enter" });

    fireEvent.change(getByTestId("task-input"), {
      target: { value: "New Task 2" },
    });
    fireEvent.keyDown(getByTestId("task-input"), { key: "Enter" });
    expect(getByText("All Tasks: 2")).toBeInTheDocument();
    expect(getByText("Incomplete: 2")).toBeInTheDocument();
    expect(getByText("Completed: 0")).toBeInTheDocument();
    expect(queryAllByTestId("task-list-item")).toHaveLength(2);
    expect(getByText("New Task 1")).toBeInTheDocument();
    expect(getByText("New Task 2")).toBeInTheDocument();

    const listItems = queryAllByTestId("delete-task-button");
    fireEvent.click(listItems[1]);
    fireEvent.click(getByText(/Cancel/i));
    expect(queryAllByTestId("task-list-item")).toHaveLength(2);
    expect(getByText("New Task 1")).toBeInTheDocument();
    expect(getByText("New Task 2")).toBeInTheDocument();
    expect(getByText("All Tasks: 2")).toBeInTheDocument();
    expect(getByText("Incomplete: 2")).toBeInTheDocument();
    expect(getByText("Completed: 0")).toBeInTheDocument();
  });
});

describe("Dragging and dropping a task", () => {
  it("Tests drag and drop functionality", async () => {
    const { getByTestId, getByText, queryAllByTestId } = render(<App />);

    fireEvent.click(getByTestId("add-new-task-button"));
    fireEvent.change(getByTestId("task-input"), {
      target: { value: "Task 1" },
    });
    fireEvent.keyDown(getByTestId("task-input"), { key: "Enter" });
    fireEvent.keyUp(getByTestId("task-input"), { key: "Enter" });

    fireEvent.change(getByTestId("task-input"), {
      target: { value: "Task 2" },
    });
    fireEvent.keyDown(getByTestId("task-input"), { key: "Enter" });
    expect(getByText("All Tasks: 2")).toBeInTheDocument();
    expect(getByText("Incomplete: 2")).toBeInTheDocument();
    expect(getByText("Completed: 0")).toBeInTheDocument();
    expect(queryAllByTestId("task-list-item")).toHaveLength(2);
    expect(getByText("Task 1")).toBeInTheDocument();
    expect(getByText("Task 2")).toBeInTheDocument();

    const listItems = queryAllByTestId("task-list-item");
    fireEvent.dragStart(listItems[0]);
    fireEvent.dragEnter(listItems[1]);
    fireEvent.dragEnd(listItems[0]);
    expect(getByText("Task 2")).toBeInTheDocument();
    expect(getByText("Task 1")).toBeInTheDocument();
    const listItemsAfterDrag = queryAllByTestId("task-list-item");
    expect(listItemsAfterDrag[0]).toHaveTextContent("Task 2");
    expect(listItemsAfterDrag[1]).toHaveTextContent("Task 1");
  });
});

describe("Marking a task as complete", () => {
  it("Tests the functionality of marking a task as complete", () => {
    const { getByTestId, getByText, queryByTestId } = render(<App />);

    fireEvent.click(getByTestId("add-new-task-button"));
    fireEvent.change(getByTestId("task-input"), {
      target: { value: "New Task" },
    });
    fireEvent.keyDown(getByTestId("task-input"), { key: "Enter" });
    fireEvent.click(screen.getByRole("checkbox"));
    expect(getByText("All Tasks: 1")).toBeInTheDocument();
    expect(getByText("Incomplete: 0")).toBeInTheDocument();
    expect(getByText("Completed: 1")).toBeInTheDocument();

    fireEvent.click(getByText(/Completed: 1/i));
    expect(getByTestId("nav-button-completed")).toHaveClass("active");
    expect(screen.getByRole("checkbox")).toBeChecked();

    fireEvent.click(getByText(/Incomplete/i));
    expect(getByTestId("nav-button-incomplete")).toHaveClass("active");
    expect(getByText("Incomplete: 0")).toBeInTheDocument();
    expect(queryByTestId("task-list-item")).toBeNull();

    fireEvent.click(getByText(/All Tasks/i));
    expect(getByTestId("nav-button-all")).toHaveClass("active");
    expect(screen.getByRole("checkbox")).toBeChecked();
  });
});
