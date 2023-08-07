import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { useState } from "react";
import { editUser } from "./redux/userData";
import { validatePhone, validateEmail } from "./helpers";

const EditUser = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users } = useSelector((state) => state.userData);
  let user = users.find((x) => x.id === id);

  const [first, setFirst] = useState({ value: user.first, error: false });
  const [last, setLast] = useState({ value: user.last, error: false });
  const [phone, setPhone] = useState({ value: user.phone, error: false });
  const [email, setEmail] = useState({ value: user.email, error: false });
  const [balance, setBalance] = useState({ value: user.balance, error: false });

  const handleSubmit = (e) => {
    e.preventDefault();

    setLast({ ...last, error: last.value.length < 1 });
    setFirst({ ...first, error: first.value.length < 1 });
    setPhone({ ...phone, error: validatePhone(phone) });
    setEmail({ ...email, error: validateEmail(email) });
    setBalance({ ...balance, error: balance.value.length < 1 });

    let err =
      last.value.length < 1 ||
      first.value.length < 1 ||
      validatePhone(phone) ||
      validateEmail(email) ||
      balance.value.length < 1;
    if (!err) {
      dispatch(
        editUser({
          id,
          first: first.value,
          last: last.value,
          phone: phone.value,
          email: email.value,
          balance: balance.value,
        })
      );
      navigate(`/users/${id}`);
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
      <div>
        <div>
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
          <br />
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
          <TextField
            required
            id="outlined-required"
            label="Balance"
            type="number"
            error={balance.error}
            value={balance.value}
            disabled
            onChange={(e) => setBalance({ ...balance, value: e.target.value })}
            helperText={balance.error && "Must enter an amount"}
          />
        </div>

        <Button type="submit">Save Changes</Button>
      </div>
    </Box>
  );
};

export default EditUser;
