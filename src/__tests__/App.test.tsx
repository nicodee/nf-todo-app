import React from "react";
import { render, fireEvent } from "@testing-library/react";
import App from "../App";
import { BrowserRouter } from "react-router-dom";

describe("App on initial load", () => {
  it("renders App component without crashing", () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
  });

  it("renders the correct information on initial load", () => {
    const { getByText, getByTestId, queryByTestId } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

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
    const { getByText, getByTestId } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    fireEvent.click(getByText(/Completed/i));
    expect(getByTestId("nav-button-completed")).toHaveClass("active");
  });
});
