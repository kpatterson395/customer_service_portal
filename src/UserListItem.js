import { Link } from "react-router-dom";

const UserListItem = ({ user }) => {
  return (
    <Link to={user.id} key={user.id}>
      <p>
        {user.last}, {user.first}
      </p>
    </Link>
  );
};

export default UserListItem;
