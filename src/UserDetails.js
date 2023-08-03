import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editUser, deleteUser } from "./redux/userData";

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
      <button>
        <Link to={`/users/edit/${user.id}`}>Edit User</Link>
      </button>
      <button onClick={handleDelete}>Delete User</button>
    </div>
  );
};

export default UserDetails;
