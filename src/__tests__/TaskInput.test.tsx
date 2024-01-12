import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { TaskInput } from "../Components/TaskInput";
import { BrowserRouter } from "react-router-dom";

describe("TaskInput", () => {
  it("renders the input field", () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <TaskInput />
      </BrowserRouter>,
    );
    const inputElement = getByTestId("task-input");
    expect(inputElement).toBeInTheDocument();
  });

  it("updates the task value when input changes", () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <TaskInput />
      </BrowserRouter>,
    );
    const inputElement = getByTestId("task-input");
    fireEvent.change(inputElement, { target: { value: "New Task" } });
    expect(inputElement).toHaveValue("New Task");
  });
});
