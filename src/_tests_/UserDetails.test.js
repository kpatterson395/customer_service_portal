// TransferModal.test.js
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { useSelector, useDispatch } from "react-redux"; // Mock these to test the component
import UserDetails from "../UserDetails";
import userEvent from "@testing-library/user-event"; // Import userEvent
import { MemoryRouter, Route } from "react-router-dom";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    id: "123-456-789",
  }),
  useRouteMatch: () => ({ url: "/company/company-id1/team/team-id1" }),
}));

test("UserDetails renders correctly", () => {
  // Mock useSelector to return some dummy data
  useSelector.mockImplementation((selectorFn) =>
    selectorFn({
      userData: {
        users: [
          {
            id: "123-456-789",
            first: "John",
            last: "Doe",
            email: "test@gmail.com",
            phone: "777-777-7777",
          },
          {
            id: "987-654-321",
            first: "Jane",
            last: "Smith",
            email: "test2@gmail.com",
            phone: "772-777-7777",
          },
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
      <UserDetails />
    </MemoryRouter>
  );

  // Check if the component renders correctly
  expect(screen.getByText("Doe, John")).toBeInTheDocument();
  expect(screen.getByText("test@gmail.com")).toBeInTheDocument();
  expect(screen.getByText("777-777-7777")).toBeInTheDocument();
});
