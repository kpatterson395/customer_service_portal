import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "./redux/userData";
import Box from "@mui/material/Box";

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
    let phoneReg = /^\d{3}-\d{3}-\d{4}$/;
    setPhone({ ...phone, error: !phoneReg.test(phone.value) });
    let emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setEmail({ ...email, error: !emailReg.test(email.value) });

    let err =
      last.value.length < 1 ||
      first.value.length < 1 ||
      !phoneReg.test(phone.value) ||
      !emailReg.test(email.value);
    console.log("err", err);
    if (!err) {
      dispatch(
        addUser({
          first: first.value,
          last: last.value,
          phone: phone.value,
          email: email.value,
        })
      );
      navigate(`/users`);
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
