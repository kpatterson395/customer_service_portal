import UserListItem from "./UserListItem";

const UserList = ({ users }) => {
  return (
    <div>
      {users.map((user) => {
        return <UserListItem user={user} key={user.id} />;
      })}
    </div>
  );
};

export default UserList;
