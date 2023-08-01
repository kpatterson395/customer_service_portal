import UserListItem from "./UserListItem";
import { Link } from "react-router-dom";

const UserList = ({ users }) => {
  return (
    <div>
      {users.map((user) => {
        return (
          <Link to={user.id} key={user.id}>
            <UserListItem user={user} />
          </Link>
        );
      })}
    </div>
  );
};

export default UserList;
