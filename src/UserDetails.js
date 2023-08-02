import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editUser, deleteUser } from "./redux/userData";

const UserDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.userData);
  let user = users.find((x) => x.id === id);
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
      <button onClick={() => dispatch(deleteUser(id))}>Delete User</button>
    </div>
  );
};

export default UserDetails;
