import UserListItem from "./UserListItem";
import { useSelector } from "react-redux";

const UserList = () => {
  const { users } = useSelector((state) => state.userData);

  return (
    <div>
      {users.map((user) => {
        return <UserListItem user={user} key={user.id} />;
      })}
    </div>
  );
};

export default UserList;
