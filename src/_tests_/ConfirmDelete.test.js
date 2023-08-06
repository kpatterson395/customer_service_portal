// DeleteConfirm.test.js
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // For additional DOM matchers
import DeleteConfirm from "../DeleteConfirm";

test("DeleteConfirm renders correctly and calls handleDelete and onClose on Confirm Deletion click", () => {
  const onCloseMock = jest.fn();
  const handleDeleteMock = jest.fn();
  const open = true;

  render(
    <DeleteConfirm
      onClose={onCloseMock}
      handleDelete={handleDeleteMock}
      open={open}
    />
  );

  // Check if the confirmation dialog title is present
  expect(
    screen.getByText("Are you sure you want to delete?")
  ).toBeInTheDocument();

  // Click on the Confirm Deletion button
  const confirmButton = screen.getByText("Confirm Deletion");
  fireEvent.click(confirmButton);

  // Check if handleDelete and onClose functions are called
  expect(handleDeleteMock).toHaveBeenCalledTimes(1);
  expect(onCloseMock).toHaveBeenCalledTimes(1);
});

test("DeleteConfirm calls onClose on Cancel click", () => {
  const onCloseMock = jest.fn();
  const handleDeleteMock = jest.fn();
  const open = true;

  render(
    <DeleteConfirm
      onClose={onCloseMock}
      handleDelete={handleDeleteMock}
      open={open}
    />
  );

  // Click on the Cancel button
  const cancelButton = screen.getByText("Cancel");
  fireEvent.click(cancelButton);

  // Check if onClose function is called
  expect(onCloseMock).toHaveBeenCalledTimes(1);
});

test("DeleteConfirm does not call handleDelete and onClose when not open", () => {
  const onCloseMock = jest.fn();
  const handleDeleteMock = jest.fn();
  const open = false;

  render(
    <DeleteConfirm
      onClose={onCloseMock}
      handleDelete={handleDeleteMock}
      open={open}
    />
  );

  // Confirm Deletion button should not be present when the dialog is closed
  const confirmButton = screen.queryByText("Confirm Deletion");
  expect(confirmButton).not.toBeInTheDocument();

  // Cancel button should not be present when the dialog is closed
  const cancelButton = screen.queryByText("Cancel");
  expect(cancelButton).not.toBeInTheDocument();

  // handleDelete and onClose should not be called when the dialog is closed
  expect(handleDeleteMock).not.toHaveBeenCalled();
  expect(onCloseMock).not.toHaveBeenCalled();
});
