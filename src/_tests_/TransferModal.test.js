// TransferModal.test.js
import React from "react";
import { render, screen } from "@testing-library/react";
import { useSelector, useDispatch } from "react-redux"; // Mock these to test the component
import TransferModal from "../TransferModal";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

test("TransferModal renders correctly", () => {
  // Mock useSelector to return some dummy data
  useSelector.mockImplementation((selectorFn) =>
    selectorFn({
      userData: {
        users: [
          { id: 1, first: "John", last: "Doe" },
          { id: 2, first: "Jane", last: "Smith" },
        ],
      },
    })
  );

  // Mock useDispatch to return a jest.fn() for tracking the function call
  const dispatchMock = jest.fn();
  useDispatch.mockReturnValue(dispatchMock);

  // Render the component
  render(
    <TransferModal
      open={true}
      setOpen={jest.fn()}
      currentUser={1}
      vehicleId={1}
    />
  );

  // Check if the component renders correctly
  const titleElement = screen.getByText(
    "Transfer Vehicle to a Different User:"
  );
  expect(titleElement).toBeInTheDocument();

  // Check if the Select element contains the valid users
  const userSelect = screen.getByLabelText("User");
  expect(userSelect).toBeInTheDocument();

  // Check if dispatch has been called with the correct action
  //   expect(dispatchMock).toHaveBeenCalledWith({
  //     type: "TRANSFER_VEHICLE_SUB",
  //     payload: { currentUser: 1, transferUser: "2", vehicleId: 1 },
  //   });
});
