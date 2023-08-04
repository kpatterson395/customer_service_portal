import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "./redux/userData";
import Box from "@mui/material/Box";

const AddUser = () => {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addUser({ first, last, phone, email }));
    navigate(`/users`);
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      autoComplete="off"
    >
      <TextField
        required
        id="outlined-required"
        label="First Name"
        value={first}
        onChange={(e) => setFirst(e.target.value)}
      />
      <TextField
        required
        id="outlined-required"
        label="Last Name"
        value={last}
        onChange={(e) => setLast(e.target.value)}
      />
      <TextField
        required
        id="outlined-required"
        label="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <TextField
        required
        id="outlined-required"
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button onClick={handleSubmit}>Add User</Button>
    </Box>
  );
};

export default AddUser;
