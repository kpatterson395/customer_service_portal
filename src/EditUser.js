import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
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
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          required
          id="outlined-required"
          label="first name"
          value={first}
          onChange={(e) => setFirst(e.target.value)}
        />
        <TextField
          required
          id="outlined-required"
          label="last name"
          value={last}
          onChange={(e) => setLast(e.target.value)}
        />
        <TextField
          required
          id="outlined-required"
          label="phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <TextField
          required
          id="outlined-required"
          label="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button>Submit Changes</button>
      </form>
    </div>
  );
};

export default EditUser;
