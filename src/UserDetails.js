import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "./redux/userData";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import DeleteConfirm from "./DeleteConfirm";
import { useState } from "react";
import "./styles/UserDetails.css";

const UserDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users } = useSelector((state) => state.userData);
  let user = users.find((x) => x.id === id);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleDelete = () => {
    dispatch(deleteUser(id));
    navigate("/userlist");
  };

  const handleOpen = () => {
    setDeleteOpen(true);
  };

  const handleClose = () => {
    setDeleteOpen(false);
  };

  return (
    <div>
      <div className="userDiv">
        <h4>Name:</h4>
        {user.last}, {user.first}
        <h4>Email:</h4>
        {user.email}
        <h4>Phone:</h4>
        {user.phone}
        <h4>Account Balance:</h4>
        <span className={user.balance > 0 ? "statusPending" : "statusPaid"}>
          {user.balance}
        </span>
      </div>
      <Stack direction="row" spacing={2}>
        <Button variant="contained" color="success">
          <Link
            style={{ textDecoration: "none", color: "white" }}
            to={`/users/edit/${user.id}`}
          >
            Edit User
          </Link>
        </Button>
        <Button variant="outlined" color="error" onClick={handleOpen}>
          Delete User
        </Button>
      </Stack>
      <DeleteConfirm
        open={deleteOpen}
        onClose={handleClose}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default UserDetails;
