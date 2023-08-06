import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { useState } from "react";
import { editUser } from "./redux/userData";

const EditUser = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users } = useSelector((state) => state.userData);
  let user = users.find((x) => x.id === id);

  const [first, setFirst] = useState(user.first);
  const [last, setLast] = useState(user.last);
  const [phone, setPhone] = useState(user.phone);
  const [email, setEmail] = useState(user.email);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      editUser({
        id,
        first,
        last,
        phone,
        email,
      })
    );
    navigate(`/users/${id}`);
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
        <Button type="submit">Save Changes</Button>
      </div>
    </Box>
  );
};

export default EditUser;
