import * as React from "react";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";

const DeleteConfirm = ({ onClose, handleDelete, open }) => {
  const handleSelect = () => {
    handleDelete();
    onClose();
  };

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Are you sure you want to delete?</DialogTitle>
      <Button autoFocus color="error" onClick={() => handleSelect()}>
        Confirm Deletion
      </Button>
      <Button autoFocus onClick={() => onClose()}>
        Cancel
      </Button>
    </Dialog>
  );
};

export default DeleteConfirm;
