import UserListItem from "./UserListItem";
import { Link } from "react-router-dom";
import userData from "./mockData.json";

const UserList = () => {
  const users = userData.users;
  return (
    <div>
      {users.map((user) => {
        return <UserListItem user={user} />;
      })}
    </div>
  );
};

export default UserList;
