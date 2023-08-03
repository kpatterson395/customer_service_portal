import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "./redux/userData";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const UserDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users } = useSelector((state) => state.userData);
  let user = users.find((x) => x.id === id);

  const handleDelete = () => {
    dispatch(deleteUser(id));
    navigate("/users");
  };

  return (
    <div>
      <h2>User Details:</h2>
      <p>
        {user.last},{user.first}
      </p>
      <p>{user.email}</p>
      <p>{user.phone}</p>
      <Stack direction="row" spacing={2}>
        <Button variant="contained" color="success">
          <Link
            style={{ textDecoration: "none", color: "white" }}
            to={`/users/edit/${user.id}`}
          >
            Edit User
          </Link>
        </Button>
        <Button variant="outlined" color="error" onClick={handleDelete}>
          Delete User
        </Button>
      </Stack>
    </div>
  );
};

export default UserDetails;
