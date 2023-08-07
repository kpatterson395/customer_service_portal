import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "./redux/userData";
import Box from "@mui/material/Box";

import { validatePhone, validateEmail } from "./helpers";

const AddUser = () => {
  const [first, setFirst] = useState({ value: "", error: false });
  const [last, setLast] = useState({ value: "", error: false });
  const [phone, setPhone] = useState({ value: "", error: false });
  const [email, setEmail] = useState({ value: "", error: false });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLast({ ...last, error: last.value.length < 1 });
    setFirst({ ...first, error: first.value.length < 1 });
    setPhone({ ...phone, error: validatePhone(phone) });
    setEmail({ ...email, error: validateEmail(email) });

    let err =
      last.value.length < 1 ||
      first.value.length < 1 ||
      validatePhone(phone) ||
      validateEmail(email);
    if (!err) {
      dispatch(
        addUser({
          first: first.value,
          last: last.value,
          phone: phone.value,
          email: email.value,
          balance: 0,
        })
      );
      navigate(`/userlist`);
    }
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <TextField
        required
        error={first.error}
        id="outlined-required"
        label="First Name"
        value={first.value}
        onChange={(e) => setFirst({ ...first, value: e.target.value })}
        helperText={first.error && "Must enter a first name."}
      />
      <TextField
        required
        error={last.error}
        id="outlined-required"
        label="Last Name"
        value={last.value}
        onChange={(e) => setLast({ ...last, value: e.target.value })}
        helperText={last.error && "Must enter a last name."}
      />
      <TextField
        required
        id="outlined-required"
        label="Phone Number"
        error={phone.error}
        value={phone.value}
        onChange={(e) => setPhone({ ...phone, value: e.target.value })}
        helperText={phone.error && "Must enter in xxx-xxx-xxxx format"}
      />
      <TextField
        required
        id="outlined-required"
        label="Email"
        error={email.error}
        value={email.value}
        onChange={(e) => setEmail({ ...email, value: e.target.value })}
        helperText={email.error && "Must enter in a valid email"}
      />
      <Button type="submit">Add User</Button>
    </Box>
  );
};

export default AddUser;
