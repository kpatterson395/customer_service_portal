import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import { transferVehicleSub } from "./redux/userData";

const TransferModal = ({ open, setOpen, currentUser, vehicleId }) => {
  const { users } = useSelector((state) => state.userData);
  const dispatch = useDispatch();
  const validUsers = users.filter((u) => u.id !== currentUser);

  const [transferUser, setTransferUser] = useState("");

  const handleChange = (e) => setTransferUser(e.target.value);
  const handleSubmitChanges = () => {
    dispatch(transferVehicleSub({ currentUser, transferUser, vehicleId }));
    handleClose();
  };
  const handleClose = () => setOpen(false);
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        Transfer Vehicle to a Different User:
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            {/* <InputLabel>User</InputLabel> */}
            <Select
              aria-label="User"
              labelId="user"
              id="user"
              value={transferUser}
              onChange={handleChange}
            >
              {validUsers.map((user) => (
                <MenuItem
                  aria-label="User-option"
                  key={user.id}
                  value={user.id}
                >{`${user.last}, ${user.first}`}</MenuItem>
              ))}
            </Select>
            <Button
              disabled={!transferUser.length > 0}
              onClick={handleSubmitChanges}
            >
              Transfer to User
            </Button>
          </FormControl>
        </Box>
      </Box>
    </Modal>
  );
};

export default TransferModal;
