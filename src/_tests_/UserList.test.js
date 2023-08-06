// TransferModal.test.js
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { useSelector, useDispatch } from "react-redux"; // Mock these to test the component
import UserList from "../UserList";
import userEvent from "@testing-library/user-event"; // Import userEvent
import { MemoryRouter } from "react-router-dom";
jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

test("UserList renders correctly", () => {
  // Mock useSelector to return some dummy data
  useSelector.mockImplementation((selectorFn) =>
    selectorFn({
      userData: {
        users: [
          { id: "123-456-789", first: "John", last: "Doe" },
          { id: "987-654-321", first: "Jane", last: "Smith" },
        ],
      },
    })
  );

  // Mock useDispatch to return a jest.fn() for tracking the function call
  const dispatchMock = jest.fn();
  useDispatch.mockReturnValue(dispatchMock);

  // Render the component
  render(
    <MemoryRouter>
      <UserList />
    </MemoryRouter>
  );

  // Check if the component renders correctly

  expect(screen.getByText("Last Name")).toBeInTheDocument();
  expect(screen.getByText("First Name")).toBeInTheDocument();
  expect(screen.getByText("User Id")).toBeInTheDocument();
  expect(screen.getByText("John")).toBeInTheDocument();
  expect(screen.getByText("Doe")).toBeInTheDocument();
  expect(screen.getByText("123-456-789")).toBeInTheDocument();
  expect(screen.getByText("Jane")).toBeInTheDocument();
  expect(screen.getByText("Smith")).toBeInTheDocument();
  expect(screen.getByText("987-654-321")).toBeInTheDocument();

  const AddButton = screen.queryByText("Add User");
  expect(AddButton).toBeInTheDocument();

  expect(screen.queryAllByText("See details")).toHaveLength(2);
});
